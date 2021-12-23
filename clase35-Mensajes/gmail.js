import parseArgs from 'minimist'
import { createTransport } from 'nodemailer'


// Cuenta de ethereal.email creada (aleatoria)
const TEST_MAIL = process.env.MAIL
const TEST_PASSWORD = process.env.PASSWD

if (!TEST_MAIL || !TEST_PASSWORD) {
    console.error('cargar MAIL y PASSWORD como variables de ambiente')
    process.exit()
}

// esquivamos los parámetros 0 y 1 porque son el comando node y el archivo fuente
const options = { default: { sub: 'Test subject', msg: 'Test message'}}
const args = parseArgs(process.argv.slice(2), options)

if (!args.to) throw new Error('Parametro "to" (--to <destino>) obligatorio')

const transporter = createTransport({
    service: 'gmail',
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
    html: args.msg,
    attachments: [], // arreglo de objetos { path: 'path_al_adjunto' }
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


