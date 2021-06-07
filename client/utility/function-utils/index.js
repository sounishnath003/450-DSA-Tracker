var co = require('co');
var mongoose = require('mongoose');

let conn = null;


// const { MONGODB_URI } = require("./mongoURI.json");
// const m = require("mongoose");
//
// async function connectToDatabase() {
//   m.connect(
//     MONGODB_URI,
//     { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true },
//     (err) =>
//       err
//         ? console.error({ err })
//         : console.log(`MongoDB Connection established!!`)
//   );
// }
//
// // connectToDatabase();
//
// const AllTopicQuestionsSchema = new m.Schema({
//   topicName: { type: m.Schema.Types.String },
//   position: { type: m.Schema.Types.Number },
//   started: { type: m.Schema.Types.Boolean },
//   doneQuestions: { type: m.Schema.Types.Number },
//   questions: { type: m.Schema.Types.Array },
//   user: { type: m.Schema.Types.ObjectId },
// });
//
// const AllTopicQuestions =
//   m.model < IAllTopicQuestion > ("alltopicquestions", AllTopicQuestionsSchema);
//
// module.exports = {
//   connectToDatabase,
//   AllTopicQuestions,
// };
