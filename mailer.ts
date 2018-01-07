const nodemailer = require('nodemailer');

interface ISend {
    to: string
    subject: string

    html: string
}
async function send(param: ISend) {
    let message = {
        // Comma separated list of recipients
        //to: 'Andris Reinman <andris.reinman@gmail.com>',
        to: param.to,

        // Subject of the message
        //subject: 'Userly Confirm link ✔',
        subject: param.subject,


        // HTML body
        html: param.html
    };

    let transporter = nodemailer.createTransport(
        {
            service: "Gmail",
            auth: {
                user: "farcek@gmail.com",
                pass: "mhaxvmsifbiewwma"
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: 'Userly <no-reply@userly.mn>',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        }
    );

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (error:any, info:any) => {
            if (error) {
                return reject(error);
            }
            transporter.close();
            resolve()
        });

    });

}


export interface IConfirm {
    to: string
    code: string

    username: string
}
export async function confirm(param: IConfirm) {

    return await send({
        to: param.to,
        subject: 'Userly confirm link',
        html: `
        Сайн байна уу. ${param.username}
        <hr>
        Хаягаа баталгаажуулах <a href="http://userly.mn/confirm-email/${param.code}">Энд</a> дарна уу
        `
    })

}


// confirm({
//     to: 'farcek@yahoo.com',
//     code: '123',
//     username: 'farcek'
// })