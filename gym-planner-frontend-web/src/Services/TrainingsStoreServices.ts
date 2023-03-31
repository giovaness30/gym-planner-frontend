import { FireDataBase } from '../Utils/FirebaseUtils.js'
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUidAuth } from './AuthStoreServices.js';

const db = getFirestore(FireDataBase)
const userCollectionRef = (collumn) => collection(db, collumn)

export const getTrainings = async () => {
  
  let auth:any = getUidAuth()

  let data:any = await getDocs(userCollectionRef('trainings'))
  console.log(data)
  
  data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  data.filter((x)=> x.uid == auth)
  let itensResponse = {
    items: data,
    empty: data.length > 0 ? false : true

  }
  
  return(itensResponse)
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
  const docTraining = {name, uid:auth}

  return await addDoc(userCollectionRef('trainings'), docTraining)
  .then(resp => {
    if(resp.id)
    return Object.assign(docTraining, {id: resp.id, machines:[]})
  })
  .catch(error=> console.log(`Verificar backend! :${error}`))

}

export const createMachineTraining = async (name: string, training:string, key:number) => {
  let auth:any = getUidAuth()

  let objDoc = {name, uid:auth, training, serie:4, repet:10, weight:8, key}

  return await addDoc(userCollectionRef('machine'), objDoc )
  .then((resp)=>{
    if(resp.id)
    return Object.assign(objDoc, {id:resp.id}) 
  }).catch((error)=>{
    console.log(`Verificar backend! : ${error}`)
    
  })

  
}

export const deleteTraining = async (id:string) => {
  const training = doc(db,'trainings', id )
  await deleteDoc(training)
  
}
export const deleteMachineTraining = async (id:string) => {
  const machine = doc(db,'machine', id )
  await deleteDoc(machine)
  
}

export const updateMachine = async (id:string, serie?:any, repet?:any, weight?:number, key?:number) => {
  
  const machineRef:any = doc(db, 'machine', id);

  let bodyUpdate:any= {}

  if(serie)
    bodyUpdate.serie = serie
  if(repet)
    bodyUpdate.repet = repet
  if(weight)
    bodyUpdate.weight = weight
  if(key)
    bodyUpdate.key = key


  await updateDoc(machineRef, bodyUpdate)
  
}