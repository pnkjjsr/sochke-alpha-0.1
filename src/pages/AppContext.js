import { createContext } from "react";

const GlobalContext = createContext({
    language: "en-US",
    setLanguage: () => { }
});

export default GlobalContext;
