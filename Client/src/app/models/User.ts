export class User {

  constructor(
    public name: string,
    public surname: string,
    public email: string
  ) {}
}

// For the first/last name of a person.
export const validNameRegex = /^[a-zA-Z][a-zA-Z']*$/;

const usernameRegexStr = `[a-zA-Z][a-zA-Z._-]*?`;
export const validUsernameRegex = new RegExp(`^${usernameRegexStr}$`);
export const validEmailRegex = new RegExp(`^${usernameRegexStr}@post.ar$`);


export interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
  keepMeLoggedIn: boolean;
}
