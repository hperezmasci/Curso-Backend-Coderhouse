import { createTransport } from 'nodemailer'

import conf from '../config.js'

const transporter = createTransport(conf.nodemailer)

async function sendMail(mailOptions) {
    try {
        const info = await transporter.sendMail(mailOptions)
    }
    catch (err) {
        console.log(err)
    }
}

export default sendMail