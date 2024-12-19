import { useState, createContext } from "react";
import { useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const AuthProvider = ({children}) =>{
    const [userId,setUserId] = useState(sessionStorage.getItem('userId')||null);
    const [token,setToken] = useState(sessionStorage.getItem('token')||"");
    const logoutAction = ()=>{
        setUserId(null);
        setToken("");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        return true;
    }
    const loginAction =async (data)=>{
        try {
            const response = await axios.post(
              "http://localhost:8080/atm/user/login",
              data
            );
            console.log('login response',response);
            if (response?.data?.token) {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("userId", response.data.userId);
                setToken(response.data.token);
                setUserId(response.data.userId);
                return true;
            }
            return false;
          } catch (error) {
            return false;
          }
    }
    return <AuthContext.Provider value={{loginAction,logoutAction,userId,token}}>{children}</AuthContext.Provider>
}
export default AuthProvider;
export const useAuth = ()=>{
    return useContext(AuthContext);
}

