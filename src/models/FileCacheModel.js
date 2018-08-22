const BaseModel = require("./BaseModel");

class FileCacheModel extends BaseModel {
  constructor(data) {
    super(data);

    this.file = data.file;
    this.lastUpdated = data.lastUpdated || null;
  }
}

module.exports = FileCacheModel;
