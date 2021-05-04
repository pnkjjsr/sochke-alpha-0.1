import React, { createContext, useState, useEffect } from "react";
import Firebase from "@libs/firebase";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [language, setLanguage] = useState("en-US");
    const [authenticated, setAuthenticated] = useState(false);
    const value = { language, setLanguage, authenticated, setAuthenticated }

    useEffect(() => {
        let firebaseLibs = new Firebase();
        firebaseLibs
            .init()
            .then((firebase) => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        setAuthenticated(true);
                    } else {
                        console.log("Guest User");
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={value}
        >
            {children}
        </GlobalContext.Provider>
    );
};