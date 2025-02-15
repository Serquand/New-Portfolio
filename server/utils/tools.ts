export function checkValidEmail(email: string): boolean {
    const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(email);
}

export function getErrorsForEmail(email: string) {
    if (!email) {
        return 'Required field';
    } else if (!checkValidEmail(email)) {
        return 'Email invalide';
    } else {
        return '';
    }
}

export function getErrorsForSubject(subject: string) {
    if (!subject) {
        return 'Required field';
    } else {
        return '';
    }
}

export function getErrorsForMessageContent(messageContent: string) {
    if (!messageContent) {
        return 'Required field';
    } else {
        return '';
    }
}

export function triggerErrors(errors: Record<string, string>) {
    const allKeys = Object.keys(errors);
    for (const key of allKeys) {
        if (errors[key] !== '') {
            throw createError({
                statusCode: 400,
                statusMessage: JSON.stringify(errors),
            });
        }
    }
}
