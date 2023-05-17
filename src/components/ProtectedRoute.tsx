import {ReactNode} from 'react';
import {UserAuth} from "../context/AuthContext";
import {Navigate} from "react-router-dom"

interface IProtectedRouteProps {
    children: ReactNode | ReactNode[]
}

function ProtectedRoute({children}: IProtectedRouteProps) {
    const {user} = UserAuth();

    if (!user) {
        return <Navigate to={"/sign-in"}/>
    }

    return (
        <>{children}</>
    );
}

export default ProtectedRoute;