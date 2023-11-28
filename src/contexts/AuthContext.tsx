'use client'

import {createContext, useContext, useReducer} from "react";


const AuthContext = createContext({})
const AuthContextDispatcher =createContext({})

const initialState = {
    login:false,
    userData:{
        "email":null,
        "phone":null,
        "role":null
    }

}

const reducer = (state , action ):any=>{
    switch (action.type){
        case "SIGNIN" :
            return {login:true , userData:action.value}

        case "LOGOUT":
            return {...state , login:false , userData:initialState.userData}
    }
}

const AuthProvider = ({children})=>{
    const [user , dispatch] = useReducer<any>(reducer,initialState)
    return(
        <AuthContext.Provider value={{user}}>
            <AuthContextDispatcher.Provider value={dispatch}>
                {children}
            </AuthContextDispatcher.Provider>
        </AuthContext.Provider>
    )
}
export default AuthProvider;
export const useAuth :any = ()=> useContext(AuthContext)
export const useAuthActions = ()=> useContext<any>(AuthContextDispatcher)