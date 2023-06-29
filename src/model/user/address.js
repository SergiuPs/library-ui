export default class Address {
	recipient = null;
    street = "";
    zip = "";
    city = null;
	defaultBillingAddress = false;
	defaultShippingAddress = false;

    constructor(recipient, street, zip, city, defBill, defShip) {
		this.recipient = recipient;
		this.street = street;
		this.zip = zip;
		this.city = city;
		this.defaultBillingAddress = defBill;
		this.defaultShippingAddress = defShip;
    }        
}