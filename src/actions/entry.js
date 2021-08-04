import { db } from '../components/firebase'
const customersRef = db.collection('user')


export const registerUser = (newToDo) => async dispatch => {
//   todosRef.push().set(newToDo);
};

export const deleteUser = (deleteId) => async dispatch => {
//   todosRef.child(completeToDoId).remove();
};

export const displayUser = () => async dispatch => {
//   todosRef.on("value", snapshot => {
//     dispatch({
//       type: FETCH_TODOS,
//       payload: snapshot.val()
//     });
//   });
};