import BaseEntity from "./base-entity";

export default class User extends BaseEntity {

    firstName = "";
    lastName = "";
    email = "";
    userName = "";
    password = "";
    addresses = [];
    roles = [];
 
    constructor(other) {
      super(other.id, other.version, other.createdBy, other.updatedBy, other.createdAt, other.updatedAt);
      this.firstName = other.firstName;
      this.lastName = other.lastName;
      this.email = other.email;
      this.userName = other.userName;
      this.password = other.email;
      this.addresses = other.addresses;
      this.roles = other.roles;
    }
   
    getFirstName(){
      return this.firstName;
    }

    getLastName(){
      return this.lastName;
    }        
}