import { handleNewMailRequest } from '~/server/utils/discord';
import sendMail from '~/server/utils/email';
import { containsErrors, getErrorsForEmail, getErrorsForSubject } from '~/server/utils/tools';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
        });
    }

    const { emailTo, subject, messageContent } = body;
    const errors = { emailTo: '', subject: '', messageContent: '' };

    errors.emailTo = getErrorsForEmail(emailTo);
    errors.subject = getErrorsForSubject(subject);
    errors.messageContent = getErrorsForSubject(messageContent);
    if (containsErrors(errors)) {
        setResponseStatus(event, 400);
        return { information: 'Something bad happened' };
    }

    try {
        const response = await handleNewMailRequest(body);
        await sendMail(body);

        if (response) {
            setResponseStatus(event, 201);
            return { information: 'Le message a bien été envoyé' };
        } else {
            throw new Error('Something went wrong !');
        }
    } catch (err) {
        console.error(err);

        throw createError({ statusCode: 500, statusMessage: 'Something went wrong' });
    }
});
