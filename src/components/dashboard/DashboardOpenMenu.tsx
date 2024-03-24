import React from 'react';
import {useMegaMenuAction} from "../../contexts/MegaMenuContext";
import Image from "next/image";

const DashboardOpenMenu = ({black , className} : any) => {


    const dispatch = useMegaMenuAction()


    const openMenu = ()=>{
        dispatch({type:"OPEN_DASHBOARD_DRAWER"})
    }
    return (
        <>
            <Image src={black ? '/humburgermenu-black.svg' : '/humburgermenu.svg'} alt={'az-provider-menu'} width={12} height={12} className={className} onClick={openMenu}/>


        </>
    );
};
export default DashboardOpenMenu;