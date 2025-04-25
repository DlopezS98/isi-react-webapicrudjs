export default class UserModel {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static fromJson(json) {
    const id = Number(json['id']) || 0;
    const firstName = String(json['firstName'] || '');
    const lastName = String(json['lastName'] || '');
    const email = String(json['email'] || '');
    return new UserModel(id, firstName, lastName, email);
  }
}
