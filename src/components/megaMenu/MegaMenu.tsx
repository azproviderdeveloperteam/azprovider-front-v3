import React from 'react';
import Image from "next/image";

const MegaMenu = ({className} : any) => {
    return (
        <>
            <Image src={'/humburgermenu.svg'} alt={'az-provider-menu'} width={12} height={12} className={className}/>
        </>
    );
};

export default MegaMenu;