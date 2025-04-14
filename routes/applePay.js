const express = require('express');
const router = express.Router();
const https = require('https');
const fs = require('fs');
const path = require('path');

const merchantId = 'merchant.applepayreapware';
const merchantCert = fs.readFileSync(path.join(__dirname, '../certs/Certificate.pem'));
const merchantKey = fs.readFileSync(path.join(__dirname, '../certs/key.pem'));
const merchantCa = fs.readFileSync(path.join(__dirname, '../certs/wwdr.pem')); // optional but good

// Merchant validation route
router.post('/validate-merchant', (req, res) => {
    const validationURL = req.body.validationURL;

    const options = {
        method: 'POST',
        cert: merchantCert,
        key: merchantKey,
        ca: merchantCa,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const validationReq = https.request(validationURL, options, (response) => {
        let data = '';
        response.on('data', (chunk) => data += chunk);
        response.on('end', () => {
            try {
                res.json(JSON.parse(data));
            } catch (err) {
                res.status(500).send('Failed to parse merchant session');
            }
        });
    });

    validationReq.on('error', (error) => {
        console.error('Merchant validation error:', error);
        res.status(500).send('Merchant validation failed');
    });

    validationReq.write(JSON.stringify({
        merchantIdentifier: merchantId,
        displayName: "Reapware",
        initiative: "web",
        initiativeContext: "reapwareapi.cc"
    }));

    validationReq.end();
});

module.exports = router;
