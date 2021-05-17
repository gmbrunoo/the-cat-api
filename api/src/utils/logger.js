const {createLogger, format, transports} = require('winston');

module.exports = createLogger({
    format: format.combine( 
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/thecatapi.log`,
            format: format.json()
        })
    ]
})
