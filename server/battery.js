/*jshint -W030*/
var sql = require('mssql');

var config = {
    user: "sfdcServer",
    password: "sfdcServer",
    server: "localhost",
    database: "ShopFloorDataCollection",
    options: {encrypt: false}
};

function getIdFromSerialNumber(serial) {
    return new Promise(function(resolve, reject) {
        sql.connect(config).then(pool =>{
            return pool.request()
            .input('serial', sql.VarChar(20), serial)
            .output('id', sql.Int)
            .execute('GetIDFromSerialNumber')
            .then(result => {
                console.dir(result.output.id);
                sql.close();
                resolve(result.output.id);
            }).catch(err => {
                console.log('err! : ' + err);
                return -1;
            });
        });    
    });
  }

var writeVoltagesToDatabase = (tableRows) => {
    const voltagesTable = getSqlTableType(tableRows);
    sql.connect(config).then(pool =>{
        return pool.request()
        .input('voltages', voltagesTable)
        .execute('INSERT_INTO_HRD_Voltages')
        .then(result => {
            console.log('result' + result.output.id);
        }).catch(err => {
            console.log('err! : ' + err);
        });
    });  
};

var getSqlTableType = (voltages) => {
    var t = new sql.Table();
    t.columns.add('id', sql.Int);
    t.columns.add('voltage', sql.VarChar(10));
    for (var i = 0; i < voltages.length; ++i){
        t.rows.add(voltages[i][0], voltages[i][1]);
    }
    return t;
};

module.exports = {
    getIdFromSerialNumber: getIdFromSerialNumber,
    writeVoltagesToDatabase: writeVoltagesToDatabase
};