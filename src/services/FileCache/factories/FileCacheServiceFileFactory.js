const FileCacheServiceBzB2FileFactory = require("./FileCacheServiceBzB2FileFactory");
const FileFactory = require("../../../factories/FileFactory");

class FileCacheServiceFileFactory extends FileFactory {
  constructor(data) {
    super(data);

    // As this is used in the FileCache service, the input data here is actually raw bzB2File data.
    this._data = {
      bzB2File: data
    };
  }

  makeBzB2FileFactory(data) {
    return new FileCacheServiceBzB2FileFactory(this._data.bzB2File);
  }
}

module.exports = FileCacheServiceFileFactory;
