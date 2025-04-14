const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// In-memory K/BAN store
let kbanStore = [];

// Generate a K/BAN
router.post('/generate', (req, res) => {
    const { accountId } = req.body;

    if (!accountId) {
        return res.status(400).json({ error: 'accountId is required' });
    }

    const kban = 'KB-' + Math.random().toString(36).substring(2, 18).toUpperCase();
    const record = { accountId, kban, createdAt: new Date().toISOString() };
    kbanStore.push(record);

    res.json({ success: true, kban });
});

// Validate a K/BAN
router.post('/validate', (req, res) => {
    const { kban } = req.body;

    if (!kban) {
        return res.status(400).json({ error: 'kban is required' });
    }

    const exists = kbanStore.some(entry => entry.kban === kban);
    res.json({ valid: exists });
});

// Export current config
router.get('/export', (req, res) => {
    const exportData = {
        exportedAt: new Date().toISOString(),
        data: kbanStore
    };
    res.json(exportData);
});

module.exports = router;