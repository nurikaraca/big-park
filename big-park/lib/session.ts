type SessionUser = {
    id: string | number;
    username?: string;
    email?: string;
}

export const startSession = (user: SessionUser, jwt: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('jwt', jwt)
}
