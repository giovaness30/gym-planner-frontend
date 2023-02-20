import { FireDataBase } from '../../src/Utils/FirebaseUtils.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(FireDataBase)
const userCollectionRef = (collumn) => collection(db, collumn)

export const getTrainings = async () => {

  const data = await getDocs(userCollectionRef('trainings'))
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const getMachineTraining = async (training) => {
  if (!training) return

  const data = await getDocs(userCollectionRef('machine'))
  const arrList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  let filtered = arrList.filter((x) => x.training == training)
  return filtered

}