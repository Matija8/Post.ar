export class User {

  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string
  ) {}
}

export interface LoginData {
  email: string;
  password: string;
}
