import { storage } from '@/service/firebaseConnection';
import { ref } from "firebase/storage";

export default function getFileRef(folder: string, filename: string) {
    return ref(storage, `${folder}/${filename}`);

}