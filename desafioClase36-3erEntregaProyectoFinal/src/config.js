import dotenv from 'dotenv'
dotenv.config()

const atlasUser = process.env.ATLAS_USER || 'MISSING_ATLAS_USER'
const atlasPass = process.env.ATLAS_PASSWORD || 'MISSING_ATLAS_PASS'

const etherealUser = process.env.ETHEREAL_USER || 'MISSING_EHTEREAL_USER'
const etherealPass = process.env.ETHEREAL_PASSWORD || 'MISSING_ETHEREAL_PASS'

const adminMail = process.env.ADMIN_MAIL || 'MISSING_ADMIN_MAIL'
const adminPhone = process.env.ADMIN_PHONE || 'MISSING_ADMIN_PHONE'

const twilioSID = process.env.TWILIO_SID || 'MISSING_TWILIO_SID'
const twilioToken = process.env.TWILIO_TOKEN || 'MISSING_TWILIO_TOKEN'
const twilioFrom = process.env.TWILIO_FROM || 'MISSING_TWILIO_FROM'
const twilioMessagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID || 'MISSING_TWILIO_MESSAGING_SERVICE_SID'

const config = {
    'mongodb': {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    'atlas': {
        cnxStr: `mongodb+srv://${atlasUser}:${atlasPass}@cluster0.mev0b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    'nodemailer': {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: etherealUser,
            pass: etherealPass
        }
    },
    'twilio': {
        SID: twilioSID,
        Token: twilioToken,
        fromPhone: twilioFrom,
        messagingServiceSid: twilioMessagingServiceSid
    },
    'adminMail': adminMail,
    'adminPhone': adminPhone,
    'loadBalance': true,
}

export default config