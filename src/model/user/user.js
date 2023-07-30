import BaseEntity from "@/model/base-entity";

export default class User extends BaseEntity {
	userName;
	email;
	firstName;
	lastName;
	birthDate;
	avatar;
	addresses = [];
	roles = [];
 
	constructor(other) {
		super(other.id, other.version);
		this.userName = other.userName;
		this.email = other.email;
		this.firstName = other.firstName;
		this.lastName = other.lastName;
		this.birthDate = other.birthDate;
		this.avatar = other.avatar;
		this.addresses = other.addresses;
		this.roles = other.roles;
	}
}