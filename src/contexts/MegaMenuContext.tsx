'use client'

import {createContext, useContext, useReducer} from "react";

const MegaMenuContext = createContext({})
const MegaMenuDispatcher =createContext({})


const initialState = {
    menu:false,
    responsiveMainDrawer : false
}

const reducer = (state :any, action:any ):any=>{
    switch (action.type){
        case "OPEN_MEGA_MENU" :
            return {...state, menu:true}
        case "CLOSE_MEGA_MENU" :
            return {...state, menu:false}
        case "DEFAULT":
            return {...state , menu : false}


        case "OPEN_MAIN_DRAWER" :
            return {...state, responsiveMainDrawer:true}
        case "CLOSE_MAIN_DRAWER" :
            return {...state, responsiveMainDrawer:false}


    }
}


const MegaMenuProvider = ({children}:any)=>{
    const [menu , dispatch] = useReducer<any>(reducer,initialState)


    return(
        <MegaMenuContext.Provider value={{menu}}>
            <MegaMenuDispatcher.Provider value={dispatch}>
                { children}
            </MegaMenuDispatcher.Provider>
        </MegaMenuContext.Provider>
    )
}
export default MegaMenuProvider;
export const useMegaMenu :any = ()=> useContext(MegaMenuContext)
export const useMegaMenuAction = ()=> useContext<any>(MegaMenuDispatcher)