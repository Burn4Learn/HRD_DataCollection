const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const battery = require("./battery");
const util = require('util');
const rootDir = path.join(__dirname, '../public');

app.use(express.static(rootDir));

var urlencodedParser = bodyParser.urlencoded({extended: true});
app.set('port', 3000);
app.set('views', path.join(rootDir, 'views'));
app.set('view engine', 'pug');

app.get('/chooseCells', (req, res) => res.render('chooseCells.pug', {
    appTitle: 'Hrd Voltage Logger'
}));

app.get('/getSerialId', (req, res) => {
    res.render('getSerialId.pug', {
        numberOfCells: {
            value: req.query.numCells
        }
    });
});

app.post('/getSerialId', urlencodedParser, (req, res) => {
    (async () => {
        try{
          var id = await battery.getIdFromSerialNumber(req.body.serialNumber);
          res.redirect(`/takeReadings/?serialNumber=${req.body.serialNumber}&numberOfCells=${req.body.numberOfCells}&serialId=${id}`);
        }catch(e){
          console.log(e)
        }
    })();    
});

app.get('/takeReadings', (req, res) => {
    res.render('takeReadings.pug', {
        numberOfCells: req.query.numberOfCells,
        serialNumber: req.query.serialNumber,
        serialId: {
            value: req.query.serialId
        }
    });
});

app.post('/takeReadings', urlencodedParser, (req, res) => {
    var vReadings = getReadingsArray(req.body.cellReading, req.body.serialId);
    console.log(vReadings);
    battery.writeVoltagesToDatabase(vReadings);
    res.redirect('/chooseCells');
});

var getReadingsArray = (readings, _id) => {
    var arr = [];
    for(var i = 0; i < readings.length; ++i){
        var row = [Number(_id),readings[i]];
        arr.push(row);
    }
    return arr;
};

app.listen(app.get('port'), function() { 
    console.log(`HRD Data Collection Server listening on port ${app.get('port')}...\n`);
});

app.post('/enter-voltages', (req, res) => 
    res.render('')
);