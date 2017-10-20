import { Meteor } from 'meteor/meteor';

let bunyan = require('bunyan');


let _Logger = null;


export function createLogger(options?) {
    let opts;

    if (_Logger) {
        return _Logger;
    }

    let stream:any = {};
    let conf = { name: "Dangerous Room Server" };

    if(Meteor.isServer) {
        if (!!Meteor.settings['logFile'] && Meteor.settings['logFile'].length > 0)
            stream.path = Meteor.settings['logFile'];
        else if (Meteor.isProduction)
            stream.path = './dangerous-room.log';
        else
            stream.stream = process.stdout;
        conf = _.extend(conf, {
            src: Meteor.settings["logLevel"] == 'debug',
            streams: [stream],
            level: Meteor.settings["logLevel"]
        });
    } else {
        conf = _.extend(conf, {
            src: true,
            level: 'debug'
        });
    }

    _Logger = bunyan.createLogger(_.defaults(options||{}, conf));
    return _Logger;
}

export const Log:{info:any, debug:any} = createLogger();
