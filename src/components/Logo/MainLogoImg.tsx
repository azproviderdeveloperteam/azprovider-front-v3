import React from 'react';
import Image from "next/image";
import LightBtn from "@/components/Buttons/LightBtn";
 const MainLogoImg = ({className , black , theme} : any) => {
    return (
        <Image  src={black ? '/new-logo.png' : '/new-logo.png'} alt={'az provider'} width={500} height={500} className={className}  />

     // <LightBtn border={false} otherClass={'mr-2'} black={theme === 'white-black' ? false :true}>
     //     AZprovider
     // </LightBtn>
    );
};

export default MainLogoImg;