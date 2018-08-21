const config = require("../config");
const FilesCacheService = require("./services/FilesCache/FilesCacheService");

const filesCacheService = new FilesCacheService({
  bzb2AccountId: config.BACKBLAZE_B2_ACCOUNT_ID,
  bzb2ApplicationKey: config.BACKBLAZE_B2_APPLICATION_KEY,
  bucketName: config.BUCKET_NAME
});

filesCacheService
  .fetchAllFiles()
  .then(files => {})
  .catch(err => {});
