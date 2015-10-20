# Auto Localize

Automagically translate English terms into as many languages as you want using the Google Translate API.

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
