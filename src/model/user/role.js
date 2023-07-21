import BaseEntity from "@/model/base-entity";

export default class Role extends BaseEntity {
    name = '';
    level = null;

    constructor(id, version, name, level) {
        super(id, version);
        this.name = name;
        this.level = level;
    }
}