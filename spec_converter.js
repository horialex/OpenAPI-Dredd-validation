const Converter = require('api-spec-converter');
const fs = require('fs');

Converter.convert({
    from: 'openapi_3',
    to: 'swagger_2',
    source: './openapi.yml',
}, function (err, converted) {
    if (err) {
        console.error('Error during conversion:', err);
        return;
    }

    const options = { syntax: 'yaml' };
    fs.writeFileSync('swagger2.yml', converted.stringify(options));
});