import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [language, setLanguage] = useState("en-US");
    const value = { language, setLanguage }

    useEffect(() => { }, []);

    return (
        <GlobalContext.Provider
            value={value}
        >
            {children}
        </GlobalContext.Provider>
    );
};