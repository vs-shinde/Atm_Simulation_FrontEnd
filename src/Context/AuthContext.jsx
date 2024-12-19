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
        const responseData = {
          status: false,
          message: ''
        };
        try {
            const responseValidPin = await axios.post(
              "http://localhost:8080/atm/user/check-pin",
              data
            );
            console.log('valid pin response',responseValidPin);
            if(responseValidPin.data === 'PIN is correct. Login successful!'){
                  const response = await axios.post(
                    "http://localhost:8080/atm/user/login",
                    data
                  );
                  if (response?.data?.token) {
                      sessionStorage.setItem("token", response.data.token);
                      sessionStorage.setItem("userId", response.data.userId);
                      setToken(response.data.token);
                      setUserId(response.data.userId);
                      responseData.status = false;
                      responseData.message = responseValidPin.data;
                      return responseData;
                  }else{
                      responseData.status = false;
                      responseData.message = 'Something went wrong. Please try latter.';
                      return responseData;
                  }
            }else{
              responseData.status = false;
              responseData.message = responseValidPin.data;
              return responseData;
            }
          } catch (error) {
            responseData.status = false;
            responseData.message = 'Something went wrong. Please try latter.';
            return responseData;
          }
    }
    return <AuthContext.Provider value={{loginAction,logoutAction,userId,token}}>{children}</AuthContext.Provider>
}
export default AuthProvider;
export const useAuth = ()=>{
    return useContext(AuthContext);
}

