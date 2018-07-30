//nodeJs, js, html, css, bootstrap, git

const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');
const momentData = require('./moment');

var port = process.env.PORT || 3000;
var app = express();
app.set('vew engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 

//default values
var moment = momentData.moment(2.05, 1.719);

var layout = {
    xaxis: {
      title: 'Section width [cm]',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
    yaxis: {
      title: 'Section height [cm]',
      titlefont: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    }
  };

var plotlyScript = `<script> Plotly.newPlot('chart', [{ z: ${moment}, type: 'surface' }], ${JSON.stringify(layout)}); </script>`;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('htmlPlotGen', () => {
    return plotlyScript;
});

app.get('/ploting', (req, res) => {
    res.render('ploting.hbs');
});

app.post('/ploting', function(req, res) {
    //let MB = res.body.MB;
    //let coeffK = res.body.coeffK;
    var moment = momentData.moment(3, 2.5);
    res.render('ploting.hbs');
  });

app.listen(port, () => {
});