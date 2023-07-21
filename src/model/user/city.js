import BaseEntity from "@/model/base-entity";

export default class City extends BaseEntity {
	name;
	region = null;

	constructor(id, version, name, region) {
		super(id, version);
		this.name = name;
		this.region = region;
	}         
}