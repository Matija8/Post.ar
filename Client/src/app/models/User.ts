export class User {

  constructor(
    public name: string,
    public surname: string,
    public email: string
  ) {}
}

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
