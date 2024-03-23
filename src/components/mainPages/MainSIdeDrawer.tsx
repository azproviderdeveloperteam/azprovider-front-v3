'use client'
import React ,{useState} from 'react';
import Image from "next/image";
import {Drawer} from "@material-tailwind/react";
import {ThemeProvider} from "@emotion/react";
import {useMegaMenu, useMegaMenuAction} from "../../contexts/MegaMenuContext";

type MainSIdeDrawerProps={
    black : boolean,
    className? : string
}
const MainSIdeDrawer = ({black , className}:MainSIdeDrawerProps) => {
    const [open, setOpen] = useState(false);


    const {menu} = useMegaMenu()
    const dispatch = useMegaMenuAction()

    const openDrawer = () =>{
        dispatch({type:"OPEN_MAIN_DRAWER"})
    };



    return (
        <>
            <Image src={black ? '/humburgermenu-black.svg' : '/humburgermenu.svg'} alt={'az-provider-menu'} width={32} height={32} className={`${className} lg:hidden`} onClick={openDrawer}/>



        </>
    );
};

export default MainSIdeDrawer;