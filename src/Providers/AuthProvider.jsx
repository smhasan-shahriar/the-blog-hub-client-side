import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../Config/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();

    const socialLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    } 

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        }); 
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            console.log(loggedUser)
            setUser(currentUser);
            setLoading(false);
            if(!loggedUser.email){
                axios.post('http://localhost:5000/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        }
        )
        return () => unsubscribe();
    },[user?.email])
    const myRef = {user, loading, setLoading, createUser, logIn, socialLogIn, logOut, updateUserProfile}

    return (
        <div>
            <AuthContext.Provider value={myRef}>
                {children}
            </AuthContext.Provider>
            
        </div>
    );
};


export default AuthProvider;