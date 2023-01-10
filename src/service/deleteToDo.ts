import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConnection";
import { deleteObject } from "firebase/storage";
import getFileRef from "@/service/getFileRef";

export default function deleteToDo(toDo: string, img: string) {
    const imgRef = getFileRef('images', img);
    deleteObject(imgRef);
    deleteDoc(doc(db, "training", toDo));
}