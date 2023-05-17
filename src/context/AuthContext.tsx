import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    User,
    updateProfile,
    signOut,
    UserCredential,
    signInWithEmailAndPassword
} from "firebase/auth"
import {auth} from "../firebase"

interface ContextProps {
    children: ReactNode;
}

interface Types {
    signUpUser: (email: string, password: string) => Promise<UserCredential>,
    signInUser: (email: string, password: string) => Promise<UserCredential>,
    user: User | null | undefined,
    logOutUser: () => Promise<void>,
    updateUserDisplayName: (displayName: string) => void,
}

const UserContext = createContext({} as Types);

export const AuthContextProvider = ({children}: ContextProps) => {
    const [user, setUser] = useState<User | null>();

    const signUpUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserDisplayName = (displayName: string) => {
        updateProfile(auth.currentUser!, {displayName})
    }

    const logOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, [])

    return (
        <UserContext.Provider value={{signUpUser, signInUser, user, logOutUser, updateUserDisplayName}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}