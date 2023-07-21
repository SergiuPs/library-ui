import BaseEntity from "@/model/base-entity";

export default class Address extends BaseEntity {
	recipient = null;
    street;
    zip;
    city = null;
	defaultBillingAddress = false;
	defaultShippingAddress = false;

    constructor(id, version, recipient, street, zip, city, defBill, defShip) {
		super(id, version);
		this.recipient = recipient;
		this.street = street;
		this.zip = zip;
		this.city = city;
		this.defaultBillingAddress = defBill;
		this.defaultShippingAddress = defShip;
    }        
}