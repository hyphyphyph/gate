const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

const config = require("../../config");

class FileCacheWriter {
  constructor() {
    this.directory = path.resolve(path.join(config.CACHE_DIRECTORY));
    this.filename = "file-cache.json";
  }

  writeSync(fileCacheModels) {
    mkdirp.sync(this.directory);

    var json = JSON.stringify(fileCacheModels, null, 2);
    fs.writeFileSync(path.join(this.directory, this.filename), json);

    return path.join(this.directory, this.filename);
  }
}

module.exports = FileCacheWriter;
