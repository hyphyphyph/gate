const FileCacheFactory = require("../../../factories/FileCacheFactory");
const FileCacheServiceFileFactory = require("./FileCacheServiceFileFactory");

class FileCacheServiceFileCacheFactory extends FileCacheFactory {
  constructor(data) {
    super(data);

    // As this is used in the FileCache service, the input data here is actually raw bzB2File data.
    this._data = {
      file: data
    };
  }

  makeFileFactory(data) {
    return new FileCacheServiceFileFactory(data.file);
  }
}

module.exports = FileCacheServiceFileCacheFactory;
