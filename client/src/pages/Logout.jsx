import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
    const { logoutUser } = useAuth();        

    useEffect(() => {
        const logout = async () => {
            await logoutUser();
        };
        logout();
    }, [logoutUser]);

    return  <Navigate to="/Login"/>;
};
