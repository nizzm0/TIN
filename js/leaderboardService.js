import { db } from './firebase.js';
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    doc,
    getDoc,
    setDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

export const leaderboardService = {
    async fetchTopScores(limitVal = 5) {
        const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(limitVal));
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data());
        });
        return results;
    },

    async saveScore(username, wave, score) {
        const docId = username.toLowerCase();
        const leaderboardDocRef = doc(db, 'leaderboard', docId);

        const docSnap = await getDoc(leaderboardDocRef);
        let shouldSave = true;

        if (docSnap.exists()) {
            const existingEntry = docSnap.data();
            if (score <= existingEntry.score) {
                shouldSave = false;
            }
        }

        if (shouldSave) {
            const entry = {
                username,
                wave,
                score,
                date: Date.now()
            };
            await setDoc(leaderboardDocRef, entry);
            return { saved: true, entry };
        }
        return { saved: false };
    },

    async clearAllScores() {
        const querySnapshot = await getDocs(collection(db, 'leaderboard'));
        const deletePromises = [];
        querySnapshot.forEach((docSnap) => {
            deletePromises.push(deleteDoc(doc(db, 'leaderboard', docSnap.id)));
        });
        await Promise.all(deletePromises);
    },

    async getAllScores() {
        const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach(docSnap => {
            list.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });
        return list;
    },

    async updateScore(docId, wave, score) {
        const leaderboardDocRef = doc(db, 'leaderboard', docId);
        const docSnap = await getDoc(leaderboardDocRef);
        if (!docSnap.exists()) {
            throw new Error("Dokument nie istnieje!");
        }
        const data = docSnap.data();
        await setDoc(leaderboardDocRef, {
            ...data,
            wave: wave,
            score: score,
            date: Date.now()
        });
    },

    async deleteScore(docId) {
        const leaderboardDocRef = doc(db, 'leaderboard', docId);
        await deleteDoc(leaderboardDocRef);
    }
};
