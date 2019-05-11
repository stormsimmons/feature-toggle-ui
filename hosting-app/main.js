const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist', 'feature-toggle-ui')));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'dist', 'feature-toggle-ui', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`listening on ${process.env.PORT || 8080}`);
});
