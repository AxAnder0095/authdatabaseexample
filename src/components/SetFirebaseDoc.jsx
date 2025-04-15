import {auth, db} from "../config/firebase-config.js";
import {addDoc, collection} from "firebase/firestore";
import {useState} from "react";


function SetFirebaseDoc() {
    const [foodChoice, setFoodChoice] = useState('');

    const setFBFood = async () => {
        try {
            const document = auth?.currentUser?.uid;

            // Two ways to get nested collection

            // First way
            // const userDoc = doc(db, 'users', document);
            // const nestedDoc = collection(userDoc, 'foods');
            //
            // await addDoc(nestedDoc, {
            //     food: foodChoice
            // })

            // Second way  collection(database, main-collection, specific-doc, nested-collection-in-specific-doc)
            // await addDoc(collection(db, 'users', document, 'foods'), {
            //     food: foodChoice
            // })

            await addDoc(collection(db, 'users', document, 'foods'), {
                food: foodChoice
            })
            console.log(document);

        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <input
                placeholder={'Enter food'}
                onChange={(e) => setFoodChoice(e.target.value)}
            />

            <button onClick={setFBFood}>click to add food to database</button>
        </>
    )
}

export default SetFirebaseDoc;