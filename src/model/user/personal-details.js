export default class PersonalDetailsInfo {
	id;
	username;
	email;
	firstName;
	lastName;
	birthDate;
	avatar;

	constructor(other) {
		this.id = other.id
		this.username = other.username;
		this.email = other.email;
		this.firstName = other.firstName;
		this.lastName = other.lastName;

		if (other.birthDate) {
			const birthDate = new Date(other.birthDate);
			const birthDateWithoutHours = new Date(birthDate.setHours(0,0,0,0))
			this.birthDate = birthDateWithoutHours;
		}

		this.avatar = other.avatar;
	}
}