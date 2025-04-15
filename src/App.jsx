import './App.css'
import {Auth} from "./components/auth.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home/Home.jsx";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "./store/currentUserSlice.js";


function App() {
    const user = useSelector(selectCurrentUser)
    // currentUser is the uid

    return (
        <>
            {user.currentUser ?
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'}>
                            <Route index element={<Home/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                :
                <Auth/>
            }
        </>
    )
}

export default App
