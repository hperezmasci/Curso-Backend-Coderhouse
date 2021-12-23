import parseArgs from 'minimist'
import { createTransport } from 'nodemailer'


// Cuenta de ethereal.email creada (aleatoria)
const TEST_MAIL = 'davin.friesen14@ethereal.email'
const TEST_PASSWORD = 'GDzeD4HsEbHaxkyzzv'

// esquivamos los parámetros 0 y 1 porque son el comando node y el archivo fuente
const options = { default: { sub: 'Test subject', msg: 'Test message' } }
const args = parseArgs(process.argv.slice(2), options)

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: TEST_PASSWORD
    }
})

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: args.sub,
    html: args.msg
}

const sendEmail = async () => {
    try {
        const info = await transporter.sendMail(mailOptions)
    }
    catch (error) {
        console.error(error)
    }
    finally {
        console.log(`Mail sent. To: ${TEST_MAIL}, subject: "${args.sub}", message: "${args.msg}"`)
    }
}

sendEmail()


