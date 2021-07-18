import React, { createContext, useState, useEffect } from "react";

import firebaseAuth from "@libs/firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [profile, setProfile] = useState();

    const value = { authenticated, setAuthenticated, profile, setProfile }

    useEffect(() => {
        let auth = new firebaseAuth();
        auth
            .currentUser()
            .then((user) => {
                let data = user.providerData[0];
                data.id = user.uid;

                setProfile(data);
                setAuthenticated(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
};