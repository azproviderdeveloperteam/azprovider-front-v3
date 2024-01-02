'use client'

import {ReactNode, useEffect} from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Cookies from "js-cookie";
import {useAuthActions} from "../contexts/AuthContext";

const queryClient = new QueryClient()

type Props = {
    children: ReactNode
}

const ReactQueryProvider = ({ children }: Props) => {
    const dispatch = useAuthActions()

    useEffect(()=>{
        const cookieToken = Cookies.get('cookieToken');
        dispatch({type:"SET_TOKEN" , value:cookieToken})

    },[])
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}


export default ReactQueryProvider;

