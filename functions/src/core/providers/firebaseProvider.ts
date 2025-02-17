import * as admin from "firebase-admin";
import { Firestore } from "@google-cloud/firestore";

admin.initializeApp();

const firestore: Firestore = admin.firestore();

export { firestore };
