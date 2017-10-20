import { Log } from '../../../modules';

const twilio = require('twilio');

class twilioNodeWrapper {

    private twilioClient;

    constructor() {
        let accountSid =  Meteor.settings['twilio']['accountSid'];
        let authToken = Meteor.settings['twilio']['authToken'];

        if(accountSid && authToken && authToken.length>0 && accountSid.length>0)
            this.twilioClient = twilio(accountSid, authToken);
    }

    sendSMS (message, callbackFn?) {

        if(this.twilioClient)
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