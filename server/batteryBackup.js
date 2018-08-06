const sql = require('seriate');

var config = {
    "name": "default",
    "user": "sfdcServer",
    "password": "sfdcServer",
    "host": "RICH-RUSTB\\SQLEXPRESS",
    "database": "ShopFloorDataCollection",
    "port": "53316"
};

sql.setDefaultConfig(config);

var getIdFromSerialNumber = (serial) => {
    var ex = sql.execute({
        procedure: "GetIDFromSerialNumber",
        params: {
            serial: {
                type: sql.VARCHAR,
                val: serial
            }
        }
    });
    return ex;
};

var writeVoltagesToDatabase = (_voltages) => {
    return sql.execute({
    procedure: "INSERT_INTO_HRD_Voltages",
        voltages: {
            _voltages, asTable: {
                id: sql.INT,
                voltage: sql.DECIMAL
            }
        }
    });
};

module.exports = {
    getIdFromSerialNumber: getIdFromSerialNumber,
    writeVoltagesToDatabase: writeVoltagesToDatabase
};