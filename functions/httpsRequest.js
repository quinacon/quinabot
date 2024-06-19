const https = require('https');

module.exports = function(options, postData) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({ statusCode: res.statusCode, data });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        // Only write postData if it exists
        if (postData) {
            req.write(postData);
        }

        req.end();
    });
}
