export default class BaseEntity {
    
    id;
    version;
    createdBy;
    updatedBy;
    createdAt = null;
    updatedAt = null;

    constructor(id, version, createdBy, updatedBy, createdAt, updatedAt) {
      this.id = id;
      this.version = version;
      this.createdBy = createdBy;
      this.updatedBy = updatedBy;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}