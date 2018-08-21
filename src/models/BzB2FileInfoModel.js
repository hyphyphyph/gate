class BzB2FileInfoModel {
  constructor(data) {
    if (Object.keys(data).length > 1) {
      console.log(data);
      console.log("FOUND MORE INFO");
    } else if (Object.keys(data).length && Object.keys(data)[0] !== "src_last_modified_millis") {
      console.log("FOUND NEW INFO");
    }

    this.srcLastModifiedMilliseconds = data.src_last_modified_millis;
  }
}

module.exports = BzB2FileInfoModel;