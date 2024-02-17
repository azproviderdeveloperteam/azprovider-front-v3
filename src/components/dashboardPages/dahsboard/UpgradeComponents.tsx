import React from 'react';
import Image from "next/image";

const UpgradeComponents = ({setViewUpgradeFalse} : any) => {
    return (
        <div className='w-full flex flex-row cursor-pointer pr-[1%]' onClick={setViewUpgradeFalse}>
            <Image src={'/upgrade-dashboard.svg'} alt={'s'} width={1000} height={100} className={'w-full'}/>
        </div>
    );
};

export default UpgradeComponents;