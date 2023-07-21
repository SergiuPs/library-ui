export default class BaseEntity {
	id;
	version;

	constructor(id, version) {
		this.id = id;
		this.version = version;
	}
}