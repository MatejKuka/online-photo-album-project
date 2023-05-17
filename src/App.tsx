import {Route, Routes} from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import UserHomePage from "./pages/user-pages/UserHomePage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/user-pages/UserProfilePage";
import SingleAlbumPage from "./pages/user-pages/SingleAlbumPage";
import {AuthContextProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/sign-in"
                       element={<SignInPage/>}/>
                <Route path="/sign-up"
                       element={<SignUpPage/>}/>
                <Route path="/user/:userId"
                       element={<ProtectedRoute><UserHomePage/></ProtectedRoute>}/>
                <Route path="/user/:userId/profile"
                       element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>}/>
                <Route path="/user/:userId/albums/:albumId"
                       element={<ProtectedRoute><SingleAlbumPage/></ProtectedRoute>}/>
                <Route path="*"
                       element={<NotFoundPage/>}/>
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
