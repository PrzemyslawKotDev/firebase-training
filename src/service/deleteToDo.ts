import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConnection";

export default function deleteToDo(toDo: string) {
    deleteDoc(doc(db, "training", toDo));
}