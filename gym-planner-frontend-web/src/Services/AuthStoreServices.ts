import { FireDataBase } from '../Utils/FirebaseUtils.js'
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


export const authLogout = () => {

  const auth = getAuth()
  auth.signOut()
  localStorage.removeItem('token')
}