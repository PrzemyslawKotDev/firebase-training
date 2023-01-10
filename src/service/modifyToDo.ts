import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebaseConnection";

export default function changeToDoState() {
    setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });
}