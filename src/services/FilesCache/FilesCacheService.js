const B2 = require("backblaze-b2");
const chalk = require("chalk");

class FilesCacheService {
  constructor(config) {
    console.log(
      chalk.underline(chalk.blue("Started Service: FilesCacheService"))
    );

    this.bzb2AccountId = config.bzb2AccountId;
    this.bzb2ApplicationKey = config.bzb2ApplicationKey;
    this.bucketName = config.bucketName;

    this.b2 = new B2({
      accountId: this.bzb2AccountId,
      applicationKey: this.bzb2ApplicationKey
    });
  }

  fetchAllFiles() {
    return this._authorize().then(() => this._getBucket(this.bucketName));
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
        console.log(chalk.green(`Found bucket: ${chalk.underline(bucketName)}`));
        return foundBuckets[0];
      } else {
        console.log(chalk.red(`Could not find bucket: ${chalk.underline(bucketName)}`));
        throw new Error(`Could not find bucket: ${bucketName}`);
      }
    });
  }
}

module.exports = FilesCacheService;
