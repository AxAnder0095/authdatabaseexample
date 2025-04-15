import {signOut} from "firebase/auth";
import {auth, db} from "../config/firebase-config.js";
import {collection, doc, getDocs, deleteDoc} from "firebase/firestore";
import {useEffect, useState} from "react";

import SetFirebaseDoc from "../components/SetFirebaseDoc.jsx";

function Home(){
    const [foodData, setFoodData] = useState([]);

    // get collection from nested document.
    // users/docID/foods/food
    const getUserFavFood = async () => {
        try {
            const document = auth?.currentUser?.uid;
            const userRef = doc(db, 'users', document);
            const collectionRef = collection(userRef, 'foods');
            const querySnapshot = await getDocs(collectionRef);
            const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setFoodData(data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserFavFood();

    }, [foodData]);

    // delete a doc
    const deleteFood = async (id) => {
        const foodDoc = doc(db, 'users', auth?.currentUser?.uid, 'foods', id);
        await deleteDoc(foodDoc);
    }


    // logout
    const logOut = async () => {
        try {
            await signOut(auth);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/*nested collection inside specific doc*/}
            <h2>Specific users collection of foods</h2>
            {foodData.map((foods) => (
                <div key={foods.id}>
                    <p>food: {foods.food}</p>
                    <button onClick={() => deleteFood(foods.id)}>Delete Food</button>
                </div>
            ))}

            <br/>
            <br/>
            <SetFirebaseDoc/>
            <br/>

            <button onClick={logOut}>Log Out</button>
        </>
    )
}

export default Home;