const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PKPass = require('passkit-generator');

const certsDir = path.join(__dirname, '../certs');
const wwdrCert = fs.readFileSync(path.join(certsDir, 'wwdr.pem'));
const signerCert = fs.readFileSync(path.join(certsDir, 'certificate.pem'));
const signerKey = fs.readFileSync(path.join(certsDir, 'key.pem'));
const signerKeyPassphrase = ''; // Add passphrase if needed

router.post('/validate-kban', (req, res) => {
    const { kban } = req.body;
    if (kban && typeof kban === 'string' && kban.startsWith('KBAN')) {
        res.json({ valid: true });
    } else {
        res.status(400).json({ valid: false, error: 'Invalid K/BAN format' });
    }
});

router.post('/generate-pass', async (req, res) => {
    const { kban } = req.body;
    if (!kban || !kban.startsWith('KBAN')) {
        return res.status(400).json({ error: 'Invalid or missing K/BAN' });
    }

    const id = uuidv4();

    try {
        const pass = await PKPass.from({
            model: path.join(__dirname, '../passModel'),
            certificates: {
                wwdr: wwdrCert,
                signerCert: signerCert,
                signerKey: signerKey,
                signerKeyPassphrase: signerKeyPassphrase,
            },
            overrides: {
                serialNumber: id,
                description: "Reapware Wallet Pass",
                organizationName: "Reapware",
                primaryFields: [
                    {
                        key: "kban",
                        label: "K/BAN Number",
                        value: kban
                    }
                ]
            }
        });

        const filePath = path.join(__dirname, `../passes/${id}.pkpass`);
        const stream = fs.createWriteStream(filePath);
        pass.pipe(stream);
        pass.end();

        stream.on('finish', () => {
            res.json({
                message: "Pass created",
                passId: id,
                url: `https://apple-pay-reapware.vercel.app/passes/${id}.pkpass`
<<<<<<< HEAD
});
=======

            });
>>>>>>> 7507486 (Set correct pass download URL)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate pass' });
    }
});

module.exports = router;
