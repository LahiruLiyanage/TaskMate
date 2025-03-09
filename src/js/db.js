import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "firebase/firestore";
import {db} from "./firebase.config.js";
import {Task} from "./task.js";
import {securityContext} from "./auth.js";

export async function loadDbTasks() {
    const collectionRef = collection(db, "/task");
    const docsSnapshot = await getDocs(query(collectionRef,
        where("user", "==", securityContext.loggedUser),
        orderBy("createdAt")));
    const taskList = [];
    docsSnapshot.forEach(doc => {
        taskList.push(new Task(doc.id,
            doc.data().description,
            doc.data().status));
    });
    return taskList;
}

export async function addDbTask(description, status = false) {
    try {
        const collectionRef = collection(db, "/task");
        const docRef = await addDoc(collectionRef, {
            description,
            status,
            createdAt: serverTimestamp(),
            user: securityContext.loggedUser
        });
        return docRef.id;
    } catch (e) {
        console.log(e);
    }
}
