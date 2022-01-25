import twilio from 'twilio'
import parseArgs from 'minimist'
import config from './config-wp.js'

const options = { default: { to: config.toPhone, msg: 'Hola soy un WSP desde Node.js!'}}
// esquivamos los parámetros 0 y 1 porque son el comando node y el archivo fuente
const args = parseArgs(process.argv.slice(2), options)

const client = twilio(config.accountSid, config.authToken)

const twilioOptions = {
    body: args.msg,
    mediaUrl: [ 'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg' ],
    from: 'whatsapp:' + config.fromPhone,
    to: 'whatsapp:' + args.to
}

const twOptions = {
   body: 'Hola soy un WSP desde Node.js!',
   mediaUrl: [ 'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg' ],
   from: 'whatsapp:+14155238886',
   to: 'whatsapp:+5491155949311'
}


console.log(twilioOptions)

try {
   const message = await client.messages.create(twilioOptions)
   console.log(message)
}
catch (error) {
   console.log(error)
}
