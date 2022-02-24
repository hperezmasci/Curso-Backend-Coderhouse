import { createTransport } from 'nodemailer'

import conf from '../config.js'

const transporter = conf.notifications ? createTransport(conf.notifications) : null

async function sendMail(mailOptions) {
    if (!transporter)
        return // notifications disabled
    try {
        const info = await transporter.sendMail(mailOptions)
    }
    catch (err) {
        console.log(err)
    }
}

export default sendMail