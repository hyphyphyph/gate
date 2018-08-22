const BzB2FileInfoModel = require("./BzB2FileInfoModel");

class BzB2FileModel {
  constructor(data) {
    this.action = data.action;
    this.contentLength = data.contentLength;
    this.contentSha1 = data.contentSha1;
    this.contentType = data.contentType;
    this.fileId = data.fileId;
    this.fileInfo = data.fileInfo;
    this.fileName = data.fileName;
    this.size = data.size;
    this.uploadTimestamp = data.uploadTimestamp;
  }
}

module.exports = BzB2FileModel;
