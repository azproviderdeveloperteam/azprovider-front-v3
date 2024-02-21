'use client'
import React, {useState} from 'react';
import Image from "next/image";
import {Drawer} from "@material-tailwind/react";
import {useMegaMenu, useMegaMenuAction} from "../../contexts/MegaMenuContext";

const MegaMenu = ({className , black} : any) => {

     const {menu} = useMegaMenu()

    const dispatch = useMegaMenuAction()


    const openMenu = ()=>{
        dispatch({type:"OPEN_MEGA_MENU"})
    }
    return (
        <>
            <Image src={black ? '/humburgermenu-black.svg' : '/humburgermenu.svg'} alt={'az-provider-menu'} width={12} height={12} className={className} onClick={openMenu}/>


        </>
    );
};

export default MegaMenu;