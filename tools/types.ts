export interface Project {
    id: string,
    name: string,
    urlToGo: string,
    mainPhotoUrl: string,
    client: string,
    usedTechnologies: string[],
}

export interface InfoMail {
    emailTo: string,
    subject: string,
    messageContent: string,
}
