const admin = require('firebase-admin');

// Configuración de Firebase Admin SDK
const serviceAccount = require('./uja-database-firebase-adminsdk-5irti-81b8ca89ac.json');
// import serviceAccountJSON from serviceAccount;
// const serviceAccountJSON = require(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // También puedes agregar más configuraciones de Firebase aquí si es necesario
});

const firestoreDB = admin.firestore();


const BD = { admin, firestoreDB};
module.exports = {BD};
