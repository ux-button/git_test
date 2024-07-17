const { readFile } = require("fs");

console.log(__filename);

readFile(
  "/Volumes/Crimson/Git/git_test/fs-tasky/one.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(data);
    }
  }
);
