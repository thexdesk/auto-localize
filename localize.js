var googleTranslate = require('google-translate')('AIzaSyDdqV0ptgYR6Je7v04g_uWI4yOnvR-bUOQ');

if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

var filename = process.argv[2];
var langs = ['es-MX', 'de-DE', 'fr-FR', 'fi-FI', 'nl-NL'];
var fs = require('fs');
var xml2js = require('xml2js');
var Enumerable = require('linq');
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();
var Sync = require('sync');

// read the file to auto-localize
fs.readFile(filename, 'utf8', function (err, data) {

    // check for errors
    if (err) {
        return console.log(err);
    }

    // parse the XML into a JSON object
    parser.parseString(data, function(err, json) {

        Sync(function(){

            // select the current english language terms to localize
            // could use a query here but we'll just use the convention that the first one is English
            var terms = Enumerable.from(json.terms.items[0].item).select('$._').toArray();

            // throw away any existing translations
            json.terms.items.splice(1, json.terms.items.length);

            // loop through all the supported languages
            langs.map(function(lang, index) {
                var translations;

                // translate all the terms at once into the language
                console.log('Translating', terms.length, 'terms into', lang);

                // The result will be passed to a Sync callback
                var result = googleTranslate.translate.sync(null, terms, 'en', lang.substr(0, 2));

                if (result.length > 0) {
                    // flatten down the Google translate response to just what we need
                    translations = Enumerable.from(result).select('$.translatedText').toArray();
                } else {
                    translations = [result.translatedText];
                }

                // create a deep copy of the English terms that were localized
                var items = JSON.parse(JSON.stringify(json.terms.items[0]));

                // set the language for these terms
                items.$.culture = langs[index];

                // loop through the results and update the JSON
                translations.map(function(translation, index) {

                    // use the results to update the English terms to the localized terms
                    items.item[index]._ = translation;
                });

                // add the localized items
                json.terms.items.push(items);
            });

            // convert the updated JSON back into XML
            var xml = builder.buildObject(json);

            // write the XML updates to disk
            fs.writeFile('Localization.xml', xml, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('Localization.xml terms updated');
            });
        });
    });
});
