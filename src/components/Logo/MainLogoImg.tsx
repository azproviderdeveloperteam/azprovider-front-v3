import React from 'react';
import Image from "next/image";
import LightBtn from "@/components/Buttons/LightBtn";
 const MainLogoImg = ({className , black , theme} : any) => {
    return (
        // <Image  src={black ? '/logo-black.svg' : '/logo-long-light.svg'} alt={'az provider'} width={10} height={10} className={className}  />

     <LightBtn border={false} otherClass={'mr-2'} black={theme === 'white-black' ? false :true}>
         AZprovider
     </LightBtn>
    );
};

export default MainLogoImg;