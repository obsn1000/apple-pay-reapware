const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/wallet', express.static(path.join(__dirname, 'public/wallet-ui')));

app.get('/', (req, res) => {
  res.send('✅ Reapware API is live');
});

const passes = require('./routes/passes');
app.use('/api/passes', passes);

const kban = require('./routes/kban');
app.use('/api/kban', kban);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});