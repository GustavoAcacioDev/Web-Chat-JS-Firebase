import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { authConstants } from "./constants";

const auth = () => {
    return (
        firebase.auth()
    )
}
const firestore = () => {
    return (
        firebase.firestore()
    )
}

export const signup = (user) => {

    return async (dispatch) => {



        const db = firestore();
        dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });

        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                console.log(data);
                const currentUser = auth().currentUser;
                const name = `${user.firstName} ${user.lastName}`
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        //Update funcional
                        db.collection('users')
                            .doc(data.user.uid)
                            .set({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                uid: data.user.uid,
                                createdAt: new Date(),
                                isOnline: true
                            })
                            .then(() => {
                                //sucesso
                                const loggedInUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    uid: data.user.uid,
                                    email: user.email
                                }

                                localStorage.setItem('user', JSON.stringify(loggedInUser));
                                console.log("User logged in succesfully...!!!");
                                dispatch({
                                    type: `${authConstants.USER_LOGIN}_SUCCESS`,
                                    payload: { user: loggedInUser }
                                })
                            })
                            .catch(error => {
                                console.log(error);
                                dispatch({
                                    type: `${authConstants.USER_LOGIN}_FAILURE`,
                                    payload: { error }
                                }
                                );
                            })
                    })
            })
            .catch(error => {
                console.log(error);
            })

    }
}

export const signin = (user) => {
    return async dispatch => {

        dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
        auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                console.log(data)

                const db = firestore();
                db.collection('users')
                    .doc(data.user.uid)
                    .update({
                        isOnline: true
                    })
                    .then(() => {
                        const name = data.user.displayName.split(" ");
                        const firstName = name[0];
                        const lastName = name[1];

                        const loggedInUser = {
                            firstName,
                            lastName,
                            uid: data.user.uid,
                            email: data.user.email
                        }

                        localStorage.setItem('user', JSON.stringify(loggedInUser));

                        dispatch({
                            type: `${authConstants.USER_LOGIN}_SUCCESS`,
                            payload: { user: loggedInUser }
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })


            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: `${authConstants.USER_LOGIN}_FAILURE`,
                    payload: { error }
                })
            })
    }
}


export const isLoggedInUser = () => {
    return async dispatch => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


        if (user) {
            dispatch({
                type: `${authConstants.USER_LOGIN}_SUCCESS`,
                payload: { user }
            })
        } else {
            dispatch({
                type: `${authConstants.USER_LOGIN}_FAILURE`,
                payload: { error: 'Fa??a o login novamente' }
            })
        }

    }
}


export const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });

        const db = firestore();
        db.collection('users')
            .doc(uid)
            .update({
                isOnline: false
            })
            .then(() => {

                auth()
                    .signOut()
                    .then(() => {
                        localStorage.clear();
                        dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch({
                            type: `${authConstants.USER_LOGOUT}_FAILURE`,
                            payload: { error }
                        })
                    })


            })
            .catch(error => {
                console.log(error)
            })


    }
}