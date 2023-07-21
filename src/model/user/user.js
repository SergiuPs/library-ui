import BaseEntity from "@/model/base-entity";

export default class User extends BaseEntity {
	firstName;
	lastName;
	email;
	userName;
	password;
	addresses = [];
	roles = [];
 
	constructor(other) {
		super(other.id, other.version);
		this.firstName = other.firstName;
		this.lastName = other.lastName;
		this.email = other.email;
		this.userName = other.userName;
		this.password = other.password;
		this.addresses = other.addresses;
		this.roles = other.roles;
	}
}