import json,sys,urllib.request
base="https://finalstaging.marketwavegen.com/wp-json/wp/v2/"
def get(ep,extra=""):
    out=[];p=1
    while True:
        try:
            r=urllib.request.urlopen(urllib.request.Request(f"{base}{ep}?per_page=100&page={p}{extra}",headers={"User-Agent":"Mozilla/5.0"}),timeout=60)
        except Exception as e:
            break
        d=json.load(r); out+=d
        if p>=int(r.headers.get("X-WP-TotalPages","1")): break
        p+=1
    return out
for ep,extra in [("posts","&_embed"),("categories",""),("tags",""),("pages",""),("media","")]:
    d=get(ep,extra); json.dump(d,open(f"{ep}.json","w"),ensure_ascii=False,indent=1); print(ep,len(d))
cats={c["id"]:c["name"] for c in json.load(open("categories.json"))}
from collections import Counter
c=Counter(cats.get(i,i) for p in json.load(open("posts.json")) for i in p["categories"]); print(c)
