# Auto Localize

Automagically translate English terms into as many languages as you want* using the Google Translate API.

## Installation

Use `npm install` to get things setup.

Then update the `localize.js` with your Google API key ([free trial](https://cloud.google.com/translate/)).

```javascript
var googleTranslate = require('google-translate')('XXXXXXXXXXX');
```

Finally configure the languages you want to support.

```javascript
var langs = ['es-MX', 'de-DE', 'fr-FR', 'fi-FI', 'nl-NL'];
```

## Example Use

From the command line enter the following command

```bash
node localize.js localization.xml
```

*The Google Translate API currently supports 91 languages.

af, ar, az, be, bg, bn, bs, ca, ceb, cs, cy, da, de, el, en, eo, es, et, eu, fa, fi, fr, ga, gl, gu, ha, hi, hmn, hr, ht, hu, hy, id, ig, is, it, iw, ja, jw, ka, kk, km, kn, ko, la, lo, lt, lv, mg, mi, mk, ml, mn, mr, ms, mt, my, ne, nl, no, ny, pa, pl, pt, ro, ru, si, sk, sl, so, sq, sr, st, su, sv, sw, ta, te, tg, th, tl, tr, uk, ur, uz, vi, yi, yo, zh, zh-TW, zu
