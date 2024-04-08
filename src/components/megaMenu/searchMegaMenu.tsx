import React, {useState} from 'react';
import MainLogoImg from "@/components/Logo/MainLogoImg";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {IconButton} from "@material-tailwind/react";

type SearchMegaMenuPropTypes = {
    searchHscode : (e:string)=>{}
}
const SearchMegaMenu = ({searchHscode} :any) => {
    const [search , setSearch] = useState<string>('')
    const changeInput = (e : string )=>{
            setSearch(e)
    }

    return (


                 <div className='lg:w-2/3 md:w-[85%] w-1/2 max-w-[53rem] border-[1px] border-secondary-yellow h-16  rounded-[1.1rem] flex flex-row items-center justify-between px-1 py-1 '>
                    <input
                        value={search}
                        onChange={(e)=>changeInput(e.target.value)}
                        className={'grow !h-full border-none outline-0 !outline-transparent !outline-none text-primary-dark-b focus:!outline-none focus:border-none'}
                        placeholder={'Search By HS Code Or Title'}
                    />
                    <RegisterBtn otherClass={'!min-h-full !rounded-[1.1rem] !w-[33%] !p-0'} onClick={()=>searchHscode(search)}>
                        {'Search'}
                    </RegisterBtn>
                </div>

    );
};

export default SearchMegaMenu;