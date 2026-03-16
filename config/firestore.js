const admin = require("firebase-admin");
const path = require("path");

let db = null;

function getFirestore() {
	if (!db) {
		if (admin.apps.length === 0) {
			const serviceAccountPath =
				process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
				path.join(__dirname, "..", "firebase-service-account.json");
			try {
				const serviceAccount = require(serviceAccountPath);
				admin.initializeApp({
					credential: admin.credential.cert(serviceAccount),
				});
			} catch {
				admin.initializeApp({
					credential: admin.credential.cert({
						projectId: process.env.FIREBASE_PROJECT_ID,
						clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
						privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
							/\\n/g,
							"\n"
						),
					}),
				});
			}
		}
		db = admin.firestore();
	}
	return db;
}

module.exports = { getFirestore, admin };
