#!/usr/bin/env python3
"""Import the real blogs, case studies and white paper from cms-backup/ into a fresh WordPress.

Usage (from the repo root):
  python3 -I scripts/import_to_new_wp.py --dry-run
  python3 -I scripts/import_to_new_wp.py --limit 5
  python3 -I scripts/import_to_new_wp.py            # everything

Credentials come from .env.local (git-ignored): WP_URL, WP_USER, WP_APP_PASSWORD.
Skips: 2013/2015 theme demo posts, pages, spam categories/tags, unused media.
Safe to re-run: posts are matched by slug and skipped if they already exist.
"""
import base64, json, mimetypes, os, re, sys, time, urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BK = os.path.join(ROOT, "cms-backup")
OLD_HOST = "https://finalstaging.marketwavegen.com"
SKIP_CATEGORIES = {"Stratus", "Uncategorized"}
SKIP_YEARS = {"2013", "2015"}  # old theme demo content

dry = "--dry-run" in sys.argv
limit = int(sys.argv[sys.argv.index("--limit") + 1]) if "--limit" in sys.argv else None


def load_env():
    env = {}
    p = os.path.join(ROOT, ".env.local")
    if os.path.exists(p):
        for line in open(p):
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.rstrip("\n").split("=", 1)
                env[k.strip()] = v.strip().strip('"')
    return env


env = load_env()
WP_URL = env.get("WP_URL", "").rstrip("/")
if not dry and not (WP_URL and env.get("WP_USER") and env.get("WP_APP_PASSWORD")):
    sys.exit("Missing WP_URL / WP_USER / WP_APP_PASSWORD in .env.local")
AUTH = "Basic " + base64.b64encode(f"{env.get('WP_USER','')}:{env.get('WP_APP_PASSWORD','')}".encode()).decode()


def api(method, path, body=None, raw=None, headers=None, retries=3):
    url = f"{WP_URL}/wp-json/wp/v2/{path}"
    h = {"Authorization": AUTH, "User-Agent": "Mozilla/5.0"}
    data = None
    if body is not None:
        data = json.dumps(body).encode(); h["Content-Type"] = "application/json"
    if raw is not None:
        data = raw
    if headers:
        h.update(headers)
    for i in range(retries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, data=data, headers=h, method=method), timeout=120) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            msg = e.read()[:300]
            if e.code in (429, 500, 502, 503) and i < retries - 1:
                time.sleep(3 * (i + 1)); continue
            raise RuntimeError(f"{method} {path} -> {e.code} {msg!r}")
        except Exception as e:
            if i < retries - 1:
                time.sleep(3); continue
            raise


posts = json.load(open(os.path.join(BK, "posts.json")))
cats = {c["id"]: c for c in json.load(open(os.path.join(BK, "categories.json")))}
media = {m["id"]: m for m in json.load(open(os.path.join(BK, "media.json")))}

keep = []
for p in sorted(posts, key=lambda p: p["date"]):
    names = {cats[c]["name"] for c in p["categories"] if c in cats}
    if p["date"][:4] in SKIP_YEARS or names & SKIP_CATEGORIES:
        continue
    keep.append(p)
print(f"{len(posts)} posts in backup -> {len(keep)} to import (skipped {len(posts) - len(keep)} demo posts)")
if limit:
    keep = keep[:limit]

used_cats = {}
for p in keep:
    for c in p["categories"]:
        if c in cats and cats[c]["name"] not in SKIP_CATEGORIES:
            used_cats[c] = cats[c]
print("categories:", ", ".join(sorted(c["name"] for c in used_cats.values())))

# ---- images ----------------------------------------------------------------
def to_original(url):
    """Map a sized/scaled WordPress upload URL to the original upload path (YYYY/MM/name.ext)."""
    m = re.search(r"/wp-content/uploads/(.+)$", url.split("?")[0])
    if not m:
        return None
    rel = m.group(1)
    base, ext = os.path.splitext(rel)
    cand = [rel, re.sub(r"-\d+x\d+$", "", base) + ext, re.sub(r"-scaled$", "", re.sub(r"-\d+x\d+$", "", base)) + ext]
    for c in cand:
        if os.path.exists(os.path.join(BK, "images", c)):
            return c
    return None


uploaded = {}  # relative path -> new url


def upload(rel):
    if rel in uploaded:
        return uploaded[rel]
    path = os.path.join(BK, "images", rel)
    if dry:
        uploaded[rel] = f"{WP_URL}/wp-content/uploads/{rel}"; return uploaded[rel]
    name = os.path.basename(rel)
    ctype = mimetypes.guess_type(name)[0] or "application/octet-stream"
    res = api("POST", "media", raw=open(path, "rb").read(),
              headers={"Content-Type": ctype, "Content-Disposition": f'attachment; filename="{name}"'})
    uploaded[rel] = res["source_url"]
    return uploaded[rel]


def rewrite_content(html):
    missing = []
    def repl(m):
        url = m.group(0)
        rel = to_original(url)
        if rel:
            return upload(rel)
        missing.append(url)
        return url
    html = re.sub(re.escape(OLD_HOST) + r"/wp-content/uploads/[^\s\"'<>)]+", repl, html)
    # srcset values keep size variants; drop srcset so the single mapped URL is used
    html = re.sub(r'\s(srcset|sizes)="[^"]*"', "", html)
    # other internal links to the old host -> relative site paths are handled by the Next.js site
    return html, missing


# ---- categories ------------------------------------------------------------
new_cat = {}
if dry:
    new_cat = {c: c for c in used_cats}
else:
    existing = {c["slug"]: c["id"] for c in api("GET", "categories?per_page=100")}
    for oid, c in used_cats.items():
        if c["slug"] in existing:
            new_cat[oid] = existing[c["slug"]]
        else:
            new_cat[oid] = api("POST", "categories", {"name": c["name"], "slug": c["slug"], "description": c.get("description", "")})["id"]
    print("categories ready:", len(new_cat))

# ---- posts -----------------------------------------------------------------
done = skipped = failed = 0
all_missing = []
for i, p in enumerate(keep, 1):
    slug = p["slug"]
    try:
        if not dry and api("GET", f"posts?slug={urllib.parse.quote(slug)}&status=any&_fields=id"):
            skipped += 1; print(f"[{i}/{len(keep)}] exists, skipped: {slug[:60]}"); continue
        html, missing = rewrite_content(p["content"]["rendered"])
        all_missing += [(slug, u) for u in missing]
        feat = None
        fm = media.get(p.get("featured_media"))
        if fm:
            rel = to_original(fm["source_url"])
            if rel:
                if dry: upload(rel)
                else:
                    url = upload(rel)
                    feat = next((m["id"] for m in api("GET", f"media?search={urllib.parse.quote(os.path.splitext(os.path.basename(rel))[0])}&per_page=20&_fields=id,source_url") if m["source_url"] == url), None)
        body = {
            "title": p["title"]["rendered"], "slug": slug, "status": "publish",
            "date": p["date"], "content": html,
            "excerpt": p["excerpt"]["rendered"],
            "categories": [new_cat[c] for c in p["categories"] if c in new_cat],
        }
        if feat:
            body["featured_media"] = feat
        if dry:
            print(f"[{i}/{len(keep)}] would import: {p['date'][:10]} {slug[:55]} | cats={[cats[c]['name'] for c in p['categories'] if c in cats]} | featured={'yes' if fm else 'no'} | unmapped imgs={len(missing)}")
        else:
            api("POST", "posts", body)
            print(f"[{i}/{len(keep)}] imported: {slug[:60]}")
        done += 1
    except Exception as e:
        failed += 1; print(f"[{i}/{len(keep)}] FAILED {slug[:50]}: {e}")

print(f"\nDone: {done} imported{' (dry run)' if dry else ''}, {skipped} already there, {failed} failed; images uploaded: {len(uploaded)}")
if all_missing:
    print(f"{len(all_missing)} image URLs had no local file (left pointing at the old server):")
    for s, u in all_missing[:15]:
        print("  ", s[:40], u[-70:])
