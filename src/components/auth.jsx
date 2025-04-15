import './authStyles.sass'
import {auth, googleProvider, db} from '../config/firebase-config.js'
import {useState} from "react";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
// import {collection, addDoc} from 'firebase/firestore'
import {doc, setDoc} from 'firebase/firestore'
import {useDispatch} from "react-redux";
import {setCurrentUser} from '../store/currentUserSlice.js'


export const Auth = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');


    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setCurrentUser(user.uid));
        }
        else{
            dispatch(setCurrentUser(null))
        }
    })

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', auth?.currentUser?.uid), {
                userID: auth?.currentUser?.uid,
                userEmail: email,
                userName: name,
                userAge: age,
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            console.log(error);
        }
    };

    const signInWIthGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={'login-container'}>
            <div className={'sign-in'}>
                <button onClick={signIn}>Sign In</button>
                <button onClick={signInWIthGoogle}>Sign in With Google</button>
                <input
                    placeholder={'Email...'}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder={'Password...'}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={'sign-up'}>
                <button onClick={signUp}>Sign Up</button>
                <input
                    placeholder={'Email...'}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder={'Password...'}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    placeholder={'Name...'}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder={'Age...'}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
        </div>
    )
}