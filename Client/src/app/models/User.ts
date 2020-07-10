export interface User {
  name: string;
  surname: string;
  email: string;
  theme: string;
}

// For the first/last name of a person.
export const validNameRegex = /^[a-zA-Z][a-zA-Z']*$/;

const usernameRegexStr = `[a-zA-Z][a-zA-Z0-9._-]*?`;
export const validUsernameRegex = new RegExp(`^${usernameRegexStr}$`);
export const validEmailRegex = new RegExp(`^${usernameRegexStr}@post.ar$`);
export const validUsernameOrEmailRegex = new RegExp(`^${usernameRegexStr}(@post.ar)?$`);

export const MAX_NAME_LEN = 30;
export const MAX_USERNAME_LEN = 32;
export const MAX_EMAIL_LEN = MAX_USERNAME_LEN + '@post.ar'.length;
export const MIN_PASSWD_LEN = 8;
export const MAX_PASSWD_LEN = 32;

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
