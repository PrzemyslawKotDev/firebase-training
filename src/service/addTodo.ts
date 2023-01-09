
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConnection";
import getUniqueId from "@/utilities/getUniqueId";

export default function addToDo(todoName: string, todo: string, isDone: boolean) {
    setDoc(doc(db, "training", todoName), {
        id: getUniqueId(),
        todo: todo,
        isDone: isDone,
    });
}
