const express = require('express');
<<<<<<< HEAD
const bodyParser = require('body-parser');
const passRoutes = require('./routes/passes');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use('/passes', express.static('passes'));
app.use('/wallet-ui', express.static(path.join(__dirname, 'public/wallet-ui')));
app.use('/', passRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Reapware API running on port ${PORT}`));
=======
const path = require('path');

const app = express();

// Serve the Wallet UI from public/wallet-ui
app.use('/wallet', express.static(path.join(__dirname, 'public/wallet-ui')));

// (Optional) Root route response
app.get('/', (req, res) => {
  res.send('✅ Apple Pay Reapware API is running');
});

// Routes
const passes = require('./routes/passes');
app.use('/api/passes', passes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
>>>>>>> c95b53b (Initial deploy-ready-commit)
