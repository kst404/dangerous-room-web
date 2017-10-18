import { Meteor } from 'meteor/meteor';

let bunyan = require('bunyan');

let stream:any = {};

let _Logger = null;

export function createLogger(options?) {
    let opts;

    if (_Logger) {
        return _Logger;
    }

    if(!!Meteor.settings['logFile'] && Meteor.settings['logFile'].length>0)
        stream.path = Meteor.settings['logFile'];
    else if(Meteor.isProduction)
        stream.path = './dangerous-room.log';
    else
        stream.stream = process.stdout;

    opts = _.defaults(options||{}, {
        name: "SciDAP UI Server",
        src: Meteor.settings["logLevel"] == 'debug',
        streams: [ stream ],
        level: Meteor.settings["logLevel"]
    });

    _Logger = bunyan.createLogger(opts);

    return _Logger;
}

export const Log = createLogger();