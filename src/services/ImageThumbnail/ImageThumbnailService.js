const B2 = require('backblaze-b2');
const chalk = require("chalk");
const path = require("path");

const FileCacheFactory = require('../../factories/FileCacheFactory');

class ImageThumbnailService {
  constructor(config) {
    console.log(
      chalk.underline(chalk.blue("Started Service: FilesCacheService"))
    );

    this.bzB2AccountId = config.bzB2AccountId;
    this.bzB2ApplicationKey = config.bzB2ApplicationKey;
    this.bucketName = config.bucketName;

    this.b2 = new B2({
      accountId: this.bzB2AccountId,
      applicationKey: this.bzB2ApplicationKey
    });

    this.filesCacheFileName = config.filesCacheFileName;
  }

  generate() {
    return this
      ._loadFilesCache()
      .then(filesCache => {
      });
  }

  _loadFilesCache() {
    return new Promise(resolve => {
      var cache = require(this.filesCacheFileName);
      resolve(new FileCacheFactory(cache));
    });
  }
}

module.exports = ImageThumbnailService;
