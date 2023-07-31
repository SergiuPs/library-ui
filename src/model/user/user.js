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

		const birthDate = new Date(other.birthDate);
		const birthDateWithoutHours = new Date(birthDate.setHours(0,0,0,0))
		this.birthDate = birthDateWithoutHours;
		
		this.avatar = other.avatar;
		this.addresses = other.addresses;
		this.roles = other.roles;
	}
}