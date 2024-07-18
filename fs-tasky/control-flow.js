const initiator = (someText) => {
  middle(someText, (result) => {
    console.log(result);
  });
};

const middle = (someText, callback) => {
  final(someText + " the normal sentence ", callback);
};

const final = (someText, callback) => {
  callback(someText + "in English");
};

initiator("There is");
