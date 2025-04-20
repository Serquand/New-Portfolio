import type { SendMailOptions, Transporter } from 'nodemailer';
import type { InfoMail } from '../../tools/types';
import nodemailer from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
    service: process.env.SERVICE_MAIL as string,
    auth: {
        user: process.env.USER_MAIL as string,
        pass: process.env.PASS_MAIL as string,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

function generateContactHtml(info: InfoMail) {
    return `<p>
        Bonjour, <br /><br />
        Merci de nous avoir contactés via notre site Web. Nous avons bien reçu votre message et le traiterons dans les plus brefs délais.<br /><br />
        Voici les <b>détails de votre message</b>: <br />
        - <b>Adresse email</b> : ${info.emailTo}<br />
        - <b>Sujet</b> : ${info.subject}<br />
        - <b>Contenu </b> :<br />${info.messageContent}<br /><br />
        Nous restons à votre disposition pour toute question ou information complémentaire.<br /><br />
        Cordialement,<br /><br />
        Esteban VINCENT,<br />
        <a href="mailto:e.vincent@serquand.com">e.vincent@serquand.com</a><br />
        <a href="https://serquand.com">https://serquand.com</a>
    </p>`;
}

export default async function sendMail(info: InfoMail, hasAlreadyThePerfectContent: boolean = false) {
    const mailOptions: SendMailOptions = {
        from: process.env.USER_MAIL as string,
        to: info.emailTo,
        subject: hasAlreadyThePerfectContent ? info.subject : `Votre message - ${info.subject}`,
        html: hasAlreadyThePerfectContent ? info.messageContent : generateContactHtml(info),
        bcc: process.env.ADMIN_MAIL as string,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch {
        return false;
    }
}
