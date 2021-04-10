const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendEmail = functions.firestore
    .document("messages/{messageId}").onCreate((snap, context) => {
      sgMail.setApiKey(functions.config().sgapi.key);
      const data = snap.data();
      const textMsg = `
${data.text}
Dados no cliente:
Nome: ${data.name}
E-mail: ${data.email}
Telefone: ${data.phone}`;
      const msg = {
        to: ["contato@helpconsultorias.com",
          "jonathan@helpconsultorias.com",
          "thiana@helpconsultorias.com"],
        from: "contato@helpconsultorias.com",
        subject: "Mensagem do cliente " + data.name,
        text: textMsg,
      };
      sgMail.send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error.response.body);
          });
      return 1;
    });

