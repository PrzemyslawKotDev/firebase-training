import { collection, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConnection";

export default function getToDo(name: string) {
    let data = [];
    const querySnapshot = getCollection();
    querySnapshot.then((doc) => {
        doc.forEach(item => {
            console.log(`${item.id} => ${item.data()}`);
        });
    });
}

async function getCollection() {
    return await getDocs(collection(db, "work"))
}


