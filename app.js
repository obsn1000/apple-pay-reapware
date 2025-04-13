const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static frontend UI from /wallet
app.use('/wallet', express.static(path.join(__dirname, 'public/wallet-ui')));

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('✅ Reapware API is live');
});

// ✅ API route for Wallet Passes
const passes = require('./routes/passes');
app.use('/api/passes', passes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
