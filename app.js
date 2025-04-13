const express = require('express');
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
