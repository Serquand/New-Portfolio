export function checkValidEmail(email: string): boolean {
    if (email.length > 320) {
        return false;
    }

    const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(email);
}

export function getErrorsForEmail(email: string) {
    if (!email) {
        return 'The email is a required field!';
    } else if (!checkValidEmail(email)) {
        return 'The email must be a valid email!';
    } else {
        return '';
    }
}

export function getErrorsForSubject(subject: string) {
    if (!subject) {
        return 'The subject is a required field!';
    } else {
        return '';
    }
}

export function getErrorsForMessageContent(messageContent: string) {
    if (!messageContent) {
        return 'The content of the message is a required field!';
    } else {
        return '';
    }
}

export function containsErrors(errors: Record<string, string>) {
    const allKeys = Object.keys(errors);
    for (const key of allKeys) {
        if (errors[key] !== '') {
            return true;
        }
    }
    return false;
}
