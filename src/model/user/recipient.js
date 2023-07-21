import BaseEntity from "@/model/base-entity";

export default class Recipient extends BaseEntity {
	title = null;
    firstName;
    lastName;

    constructor(id, version, title, firstName, lastName) {
        super(id, version);
		this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
    }        
}