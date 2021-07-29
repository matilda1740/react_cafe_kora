// Loading, to check whether a user exists or not

import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../components/firebase'

const AuthContext = React.createContext(); 

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    const registerUser = (email, password) => {
        // Return a promise to be handled in the register module
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const loginUser = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logoutUser = () => {
        return auth.signOut()
    }
    // the create user function also calls the set user

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            setLoading(false);

    })
    return unsubscribe;
    }, [])

    const value = { currentUser, registerUser, loginUser, logoutUser }

    return (

        <AuthContext.Provider value={value}>
            { !loading && children}
        </AuthContext.Provider>
    )
}
