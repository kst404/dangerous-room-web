import { Log } from '../../../modules';

const twilio = require('twilio');

class twilioNodeWrapper {

    twilioClient;

    constructor() {
        let accountSid =  Meteor.settings['twilio']['accountSid'];
        let authToken = Meteor.settings['twilio']['authToken'];

        this.twilioClient = twilio(accountSid, authToken);
    }

    sendSMS (message, callbackFn?) {

        this.twilioClient.messages.create({
            body: message,
            to: '',  // Text this number
            from: Meteor.settings['twilio']['phone'] // From a valid Twilio number
        } , function(err, result) {
            if(_.isFunction(callbackFn)) {
                try {
                    callbackFn(err, result)
                } catch(error) {
                    console.log("error in calbackFn",error);
                }
            }
            Log.debug('Created message using callback');
            if(err)
                Log.debug('error',err);
            if(result)
                Log.debug(result.sid);
        })
    }

}

export const Twilio = new twilioNodeWrapper();