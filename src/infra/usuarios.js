
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs , setDoc} from "firebase/firestore";
import { db } from "./firebase";

export async function inserirUsuario(novoUsuario) {
    const docRef = await addDoc(collection(db, "users"), novoUsuario);
    return docRef.id;
}

export async function listarUsuarios() {
    let retorno;
    await getDocs(collection(db, "users"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function obterUsuario(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function excluirUsuario(id) {
    await deleteDoc(doc(db, "users", id));
}

export async function alterarUsuario(usuario) {
  await setDoc(doc(db,"users",usuario.id), usuario);
}