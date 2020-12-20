import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";

export const AuthContext = React.createContext({currentUser: null});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <>Loading...</>
    }
    else {
        return (
            <AuthContext.Provider value={{currentUser: currentUser}}>
                {children}
            </AuthContext.Provider>
        );
    }
};