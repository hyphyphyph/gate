const chalk = require('chalk');
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const config = require("../config");
const FilesCacheService = require("./services/FilesCache/FilesCacheService");

const filesCacheService = new FilesCacheService({
  bzb2AccountId: config.BACKBLAZE_B2_ACCOUNT_ID,
  bzb2ApplicationKey: config.BACKBLAZE_B2_APPLICATION_KEY,
  bucketName: config.BUCKET_NAME
});

filesCacheService
  .fetchAllFiles()
  .then(fileModels => {
    mkdirp.sync(config.TEMP_DIRECTORY);
    fs.writeFileSync(
      path.join(config.TEMP_DIRECTORY, "files-cache.json"),
      JSON.stringify(fileModels, null, 2)
    );
    console.log(chalk.underline(chalk.cyan('Writing files cache... DONE')));
  })
  .catch(err => {
    throw err;
  });
