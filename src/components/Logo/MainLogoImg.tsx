import React from 'react';
import Image from "next/image";
 const MainLogoImg = ({className , black} : any) => {
    return (
        <Image  src={black ? '/logo-black.svg' : '/logo-long-light.svg'} alt={'az provider'} width={10} height={10} className={className}  />
    );
};

export default MainLogoImg;