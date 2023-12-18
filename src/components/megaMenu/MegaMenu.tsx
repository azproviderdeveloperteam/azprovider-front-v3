import React from 'react';
import Image from "next/image";

const MegaMenu = ({className , black} : any) => {
    return (
        <>
            <Image src={black ? '/humburgermenu-black.svg' : '/humburgermenu.svg'} alt={'az-provider-menu'} width={12} height={12} className={className}/>
        </>
    );
};

export default MegaMenu;