import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConnection";
import { deleteObject } from "firebase/storage";
import getFileRef from "@/service/getFileRef";

export default function deleteToDo(category: string, toDo: string, img: string | boolean) {
    let imgRef;
    if (typeof img === 'string') {
        imgRef = getFileRef('images', img);
    }
    let error = false;
    try {
        if (imgRef) {
            deleteObject(imgRef);
        }
        deleteDoc(doc(db, "list", category, "list", toDo))
    } catch (er) {
        alert('ERROR WHILE DELETING!');
        error = true
    }
    if (error) {
        return false
    } else {
        return true
    }
}