import { FETCH_USERS } from './types'
import { db } from '../components/firebase'

const customersRef = db.collection('user')
    const users = [];
    const team = [];

export const registerUser = (newToDo) => async dispatch => {
//   todosRef.push().set(newToDo);
};

export const deleteUser = (deleteId) => async dispatch => {
//   todosRef.child(completeToDoId).remove();
};

export const displayUser = async () => {
    console.log("DISPLAY")
    const snapshot = 
    await customersRef
        .onSnapshot((snapshot) => {
            snapshot.docs.forEach( user => {
                // ChECK IF USER EXISTS IN STATE
                const userExists = users.find( person => person.userID === user.data().userID)  
                const adminExists = team.find( person => person.userID === user.data().userID)                           
                if(!userExists && !adminExists){
                    user.data().type === 'customer' ?
                        users.push(user.data())
                        :
                        user.data().type === 'admin' &&
                        team.push(user.data())                }
            })
            
        }, error =>{
            console.log(error)
        })
    return {
        type: FETCH_USERS,
        payload: snapshot
    }
};