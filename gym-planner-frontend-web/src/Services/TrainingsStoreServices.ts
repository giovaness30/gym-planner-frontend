import { FireDataBase } from '../Utils/FirebaseUtils.js'
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUidAuth } from './AuthStoreServices.js';

const db = getFirestore(FireDataBase)
const userCollectionRef = (collumn) => collection(db, collumn)

export const getTrainings = async () => {
  
  let auth:any = getUidAuth()

  let data:any = await getDocs(userCollectionRef('trainings'))
  data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return(data.filter((x)=> x.uid == auth))
}

export const getMachineTraining = async (training:string) => {
  if (!training) return
  let auth:any = getUidAuth()

  const data = await getDocs(userCollectionRef('machine'))
  const arrList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  let filtered = arrList.filter((x:any) => x.training == training)
  return filtered.filter((x:any)=>x.uid == auth)

}

export const createTraining = async (name: string) => {
  let auth:any = getUidAuth()

  await addDoc(userCollectionRef('trainings'), {name, uid:auth})
}
export const createMachineTraining = async (name: string, training:string) => {
  let auth:any = getUidAuth()

  await addDoc(userCollectionRef('machine'), {name, uid:auth, training, repet:10, weight:8})
}

export const deleteTraining = async (id:string) => {
  const training = doc(db,'trainings', id )
  await deleteDoc(training)
  
}
export const deleteMachineTraining = async (id:string) => {
  const machine = doc(db,'machine', id )
  await deleteDoc(machine)
  
}

export const updateMachine = async (id:string, repet:number, weight:number) => {
  const machineRef:any = doc(db, 'machine', id);
  await updateDoc(machineRef, { repet: repet, weight: weight });
}