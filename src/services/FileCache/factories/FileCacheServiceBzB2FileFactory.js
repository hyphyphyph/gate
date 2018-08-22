const BzB2FileFactory = require("../../../factories/BzB2FileFactory");
const BzB2FileInfoModel = require("../../../models/BzB2FileInfoModel");

class FileCacheServiceBzB2FileFactory extends BzB2FileFactory {
  makeBzB2FileInfoModel(data) {
    let modelData = {
      srcLastModifiedMilliseconds: data.src_last_modified_millis
    };

    return new BzB2FileInfoModel(modelData);
  }
}

module.exports = FileCacheServiceBzB2FileFactory;
