//nodeJs, js, html, css, bootstrap, git

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const momentData = require('./moment');

var port = process.env.PORT || 3000;
var app = express();
app.set('vew engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true })); 

//default values
var MB = "MB30";
var fb = getfb(MB);
var coeffK = 1.719;

var layout = {
		title: 'Bending moment',
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

function getPlotlyScript (fb, coeffK) {
	return `<script> Plotly.newPlot('chart', [{ z: ${momentData.moment(fb, coeffK)}, type: 'surface' }], ${JSON.stringify(layout)}); </script>`;
}

function getfb (MB) {
  	let fb;
  	switch (MB){
    	case "MB30":
      	fb = 2.05;
      	break;
   	case "MB35":
      	fb = 2.35;
      	break;
   	case "MB40":
      	fb = 2.55;
      	break;
   	case "MB45":
      	fb = 2.85;
			break;
		case "MB50":
      	fb = 3.0;
			break;
		default:
			fb = 2.05;
	}
	return fb;
}

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('htmlPlotGen', () => {
    return getPlotlyScript(fb, coeffK);
});

hbs.registerHelper('showCoeffK', () => {
	return coeffK;
});

hbs.registerHelper('showMB30', () => {
	if(MB == "MB30"){
		return "selected";
	} else{
		return "";
	}
});

hbs.registerHelper('showMB35', () => {
	if(MB == "MB35"){
		return "selected";
	} else{
		return "";
	}
});

hbs.registerHelper('showMB40', () => {
	if(MB == "MB40"){
		return "selected";
	} else{
		return "";
	}
});

hbs.registerHelper('showMB45', () => {
	if(MB == "MB45"){
		return "selected";
	} else{
		return "";
	}
});

hbs.registerHelper('showMB50', () => {
	if(MB == "MB50"){
		return "selected";
	} else{
		return "";
	}
});

app.get('/ploting', (req, res) => {
		res.render('ploting.hbs');
});

app.post('/ploting', function(req, res) {
	MB = req.body.MB;
	fb = getfb(MB);
	coeffK = parseFloat(req.body.coeffK);
  res.render('ploting.hbs');
  });

app.listen(port, () => {
});