var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT;
var gmapsAPIKey =  process.env.GMAPSAPIKEY;
var forecastAPIKey = process.env.FORECASTAPIKEY;

app.use(express.static('./src/client'));
app.use(bodyParser());

app.get('/', function(req, res) {
  res.sendFile('index.html')
})

app.post('/weather', function(req, res) {
  if (req.body.lon && req.body.lat) {
    request.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + req.body.lon + ',' + req.body.lat + '&key=' + gmapsAPIKey)
      .end(function(err, locationData) {
        if (err) {
          console.log(err)
        }
        var location = JSON.parse(locationData.text);

        request.get('https://api.forecast.io/forecast/' + forecastAPIKey + '/' + req.body.lon + ',' + req.body.lat)
          .end(function(err, data) {
            if (err) {
              console.log(err)
            }
            var parsed = JSON.parse(data.text)
            res.json({
              location: location.results[0].address_components[1].long_name,
              current: parsed.currently.summary,
              temp: parsed.currently.temperature,
              icon: parsed.currently.icon
            })
          })
      })

  }
  else if (req.body.location) {
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.location + '&key=' + gmapsAPIKey)
      .end(function(err, locationData) {
        if (err) {
          console.log(err)
        }
        var location = JSON.parse(locationData.text);
        var locationName = location.results[0].formatted_address.substring(0, location.results[0].formatted_address.indexOf(','));

        if (location.status == 'OK') {

          request.get('https://api.forecast.io/forecast/' + forecastAPIKey + '/' + location.results[0].geometry.location.lat + ',' + location.results[0].geometry.location.lng)
            .end(function(err, data) {
              if (err) {
                console.log(err)
              }
              var parsed = JSON.parse(data.text)
              res.json({
                location: locationName,
                current: parsed.currently.summary,
                temp: parsed.currently.temperature,
                icon: parsed.currently.icon
              })
            })
          }
          else {
            res.json()
          }
      })
  }

})

app.listen(port, function() {
  console.log('Server running on', port)
})
