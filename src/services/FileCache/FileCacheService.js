const B2 = require("backblaze-b2");
const chalk = require("chalk");
const path = require("path");

const FileCacheServiceFileCacheFactory = require("./factories/FileCacheServiceFileCacheFactory");

class FileCacheService {
  constructor(config) {
    console.log(
      chalk.underline(chalk.blue("Started Service: FileCacheService"))
    );

    this.bzB2AccountId = config.bzB2AccountId;
    this.bzB2ApplicationKey = config.bzB2ApplicationKey;
    this.bucketName = config.bucketName;

    this.b2 = new B2({
      accountId: this.bzB2AccountId,
      applicationKey: this.bzB2ApplicationKey
    });

    this.files = [];
  }

  fetchAllFiles() {
    this.files = [];
    return this._authorize().then(() => {
      return this._getBucket(this.bucketName)
        .then(bucket => {
          this.bucket = bucket;
          return this._getAllFiles();
        })
        .then(files => {
          var fileCacheModels = files.map(file =>
            new FileCacheServiceFileCacheFactory(file).getModel()
          );
          return fileCacheModels;
        })
        .catch(err => {
          throw err;
        });
    });
  }

  _authorize() {
    return this.b2
      .authorize()
      .then(() => {
        console.log(chalk.green("Authorized Backblaze B2 connection."));
        return [];
      })
      .catch(response => {
        console.log(chalk.red("Couldn't authorize Backblaze B2 connection."));
        console.log(chalk.red(JSON.stringify(response.response.data, null, 2)));
        throw err;
      });
  }

  _getBucket(bucketName) {
    return this.b2.listBuckets().then(response => {
      let foundBuckets = response.data.buckets.filter(
        bucket => bucket.bucketName === bucketName
      );

      if (foundBuckets.length) {
        console.log(
          chalk.green(`Found bucket: ${chalk.underline(bucketName)}`)
        );
        return foundBuckets[0];
      } else {
        console.log(
          chalk.red(`Could not find bucket: ${chalk.underline(bucketName)}`)
        );
        throw new Error(`Could not find bucket: ${bucketName}`);
      }
    });
  }

  _getAllFiles(nextFileName, resolve) {
    if (!resolve) {
      return new Promise(resolve => {
        this._getAllFiles(null, resolve);
      });
    } else {
      this.b2
        .listFileNames({
          bucketId: this.bucket.bucketId,
          startFileName: nextFileName,
          maxFileCount: 1000
        })
        .then(response => {
          response.data.files.forEach(file => {
            this.files.push(file);
          });

          this._statusCallback();

          if (!response.data.nextFileName) {
            this.files = this._filterEmpty(this.files);
            resolve(this.files);
          } else {
            this._getAllFiles(response.data.nextFileName, resolve);
          }
        });
    }
  }

  _filterEmpty(files) {
    return files.filter(file => {
      return path.basename(file.fileName) !== ".bzEmpty";
    });
  }

  _statusCallback() {
    console.log(chalk.grey(`Discovered ${this.files.length}...`));
  }
}

module.exports = FileCacheService;
