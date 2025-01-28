'use client'

import {createContext, useContext, useEffect, useLayoutEffect, useReducer, useState} from "react";
import Cookies from "js-cookie";
import {app} from "@/services/instance";
import { useRouter } from 'next/navigation'


const AuthContext = createContext({})
const AuthContextDispatcher =createContext({})

const initialState = {
    login:false,
    userData:{
        "email":null,
        "phone":null,
        "role":null,
    },
    "token":null


}

const reducer = (state :any, action:any ):any=>{
    switch (action.type){
        case "SIGNIN" :
            return {...state ,login:true , userData:action.value}
        case "SET_TOKEN" :
            return {...state, token:action.value}
        case "LOGOUT":
            return {...state , login:false , userData:initialState.userData}
    }
}

const AuthProvider = ({children}:any)=>{
    const [user , dispatch] = useReducer<any>(reducer,initialState)
    const router = useRouter()
    const [loading ,setLoading] = useState(true)

    useLayoutEffect(()=>{
        setLoading(true)
        const cookieToken = Cookies.get('cookieToken');
        const refreshJwt = Cookies.get('refreshJwt');
        if(cookieToken){
            app.defaults.headers.Authorization = `Bearer ${cookieToken}`;

            setLoading(false)

        }else {
            delete app.defaults.headers.Authorization
            setLoading(false)
            if(window?.location?.pathname?.includes('/dashboard')){
                router.push('/login')
            }

        }
    },[])
    return(
        <AuthContext.Provider value={{user}}>
            <AuthContextDispatcher.Provider value={dispatch}>
                {loading ? null :  children}
            </AuthContextDispatcher.Provider>
        </AuthContext.Provider>
    )
}
export default AuthProvider;
export const useAuth :any = ()=> useContext(AuthContext)
export const useAuthActions = ()=> useContext<any>(AuthContextDispatcher)