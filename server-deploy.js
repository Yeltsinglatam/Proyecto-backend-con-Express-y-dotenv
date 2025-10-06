// server-deploy.js
require('dotenv').config();

// Importa tu app Express desde myApp.js
// IMPORTANT: myApp.js debe terminar con: `module.exports = app;`
const app = require('./myApp');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on ' + port);
});
