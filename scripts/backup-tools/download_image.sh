#!/bin/bash
u="$1"; p="${u#*/wp-content/uploads/}"; [ "$p" = "$u" ] && p="other/$(basename "$u")"
f="images/$p"; mkdir -p "$(dirname "$f")"
[ -s "$f" ] || curl -sS -f -m 120 --retry 2 -A "Mozilla/5.0" -o "$f" "$u" || echo "FAIL $u" >> /tmp/dl_fail.txt
