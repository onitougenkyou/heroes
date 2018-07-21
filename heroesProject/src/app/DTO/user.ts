export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  confirm: string;

  constructor(theId: string, theName: string, theEmail: string, thePassword: string, theConfirm: string) {
    this.id = theId;
    this.name = theName;
    this.email = theEmail;
    this.password = thePassword;
    this.confirm = theConfirm;
  }
}
