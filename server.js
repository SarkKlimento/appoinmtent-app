//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/appointments-app'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname, '/dist/appointments-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

var oauth2 = require('salesforce-oauth2');
app.get('/oauth2/auth', function (req, res) {
  var uri = oauth2.getAuthorizationUrl({
    redirect_uri: 'https://sark-appointment-app.herokuapp.com/',
    client_id: '3MVG91BJr_0ZDQ4ts4wXWZjdsb6SUrhvlOJodd2MCjLiglKDaqpQrnEfOgMb8iluoTu8h8FknH7DB1ME1Hp7g',
    scope: 'api'
  });
  console.log(res.redirect(uri));
  return res.redirect(uri);
})
