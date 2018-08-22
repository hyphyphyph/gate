const BaseModel = require("../models/BaseModel");

class FileModel extends BaseModel {
  constructor(data) {
    super(data);

    this.bzB2File = data.bzB2File;

    this.smallThumbnail = data.smallThumbnail || null;
    this.mediumThumbnail = data.mediumThumbnail || null;
    this.largeThumbnail = data.largeThumbnail || null;
  }
}

module.exports = FileModel;
