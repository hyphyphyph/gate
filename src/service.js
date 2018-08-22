const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const minimist = require("minimist");

const FileCacheService = require("./services/FileCache/FileCacheService");
const FileCacheWriter = require("./domain/FileCacheWriter");
const ImageThumbnailService = require("./services/ImageThumbnail/ImageThumbnailService");
const config = require("../config");

var args = minimist(process.argv.slice(2));

if (args.name === "FileCacheService") {
  const fileCacheService = new FileCacheService({
    bzB2AccountId: config.BACKBLAZE_B2_ACCOUNT_ID,
    bzB2ApplicationKey: config.BACKBLAZE_B2_APPLICATION_KEY,
    bucketName: config.BUCKET_NAME
  });

  fileCacheService
    .fetchAllFiles()
    .then(fileCacheModels => {
      console.log(new FileCacheWriter().writeSync(fileCacheModels));
      console.log(chalk.underline(chalk.cyan("Writing files cache... DONE")));

      return fileCacheModels;
    })
    .catch(err => {
      throw err;
    });
} else if (args.name === "ImageThumbnailService") {
  const imageThumbnailService = new ImageThumbnailService({
    bzB2AccountId: config.BACKBLAZE_B2_ACCOUNT_ID,
    bzB2ApplicationKey: config.BACKBLAZE_B2_APPLICATION_KEY,

    filesCacheFileName: path.resolve(
      path.join(config.TEMP_DIRECTORY, "files-cache.json")
    )
  });

  imageThumbnailService.generate();
} else {
  console.log("Available services:");
  console.log(chalk.cyan("  FileCacheService"));
}
