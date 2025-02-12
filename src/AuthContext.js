import { createContext, useState, useEffect, Children } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    //ตรวจสอบว่า token อยู่ใน LocalStorage หรือไม่
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            setUser({token}); //เก็บ token ลง State
        }
    }, []);
    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({token});
    };
    const logout = (token) => {
        localStorage.removeItem("token");
        setUser(null); //รีเซ็ต user เป็น null
    };
    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}