import twilio from 'twilio'
import conf from '../config.js'

const client = twilio(conf.twilio.SID, conf.twilio.Token)

async function sendMsg(toPhone, msg, type) {
    try {
        const opt = {body: msg}
        switch (type) {
            case 'whatsapp':
                opt['from'] = 'whatsapp:' + conf.twilio.fromPhone
                opt['to'] = 'whatsapp:' + toPhone
                break
            case 'sms':
                opt['messagingServiceSid'] = conf.twilio.messagingServiceSid
                opt['to'] = toPhone
                break
            default:
                throw new Error(`messaging.message.sendMsg: unknown type ${type}`)
        }
        const message = await client.messages.create(opt)
    }
    catch (error) {
        console.log(error)
    }
}

export default sendMsg
