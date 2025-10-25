import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    const logIn = async ({ email, password }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });   

            if (error){
                console.error("Error", error);
                return { success: false, error: error };
            }
            else {
                console.log("Logged In successfully",data);
                return { success: true, data }
            }

        } catch (error) {
            console.error(error);
        }
    }

    const logOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            
            if (error){
                console.error("Error",error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, logIn, logOut }}>
            {children}
        </AuthContext.Provider> 
    )
}; 

export const UserAuth = () => {
    return useContext(AuthContext);
}