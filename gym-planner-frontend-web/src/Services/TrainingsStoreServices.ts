import { FireDataBase } from '../Utils/FirebaseUtils.js'
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore/lite';

const db = getFirestore(FireDataBase)
const userCollectionRef = (collumn) => collection(db, collumn)

export const getTrainings = async () => {

  const data = await getDocs(userCollectionRef('trainings'))
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const getMachineTraining = async (training:string) => {
  if (!training) return

  const data = await getDocs(userCollectionRef('machine'))
  const arrList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  let filtered = arrList.filter((x:any) => x.training == training)
  return filtered

}

export const createTraining = async (name: string) => {
  const training = await addDoc(userCollectionRef('trainings'), {name})
  console.log(training);
}

export const deleteTraining = async (id) => {
  const training = doc(db,'trainings', id )
  await deleteDoc(training)
  // console.log(training);
  
}