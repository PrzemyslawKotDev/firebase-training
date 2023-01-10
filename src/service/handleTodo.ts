import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConnection";

export default function handleToDo(todoName: string, todo: string, isDone: boolean, imageName: string) {
    setDoc(doc(db, "training", todoName), {
        todo: todo,
        isDone: isDone,
        imageName: imageName
    });
}
