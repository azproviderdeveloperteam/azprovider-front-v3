'use client'
import React from 'react';
import Image from "next/image";
import {Button} from "@material-tailwind/react";
import {usePathname} from "next/navigation";
import Link from "next/link";

const DashboardSIdeBarItem = ({icon , title , alt , href}  :any) => {

    const pathname = usePathname()

    const active = pathname.toString().split('/')[2] === undefined ? title==='Dashboard'? true : false  :   href?.toString()?.toLowerCase()?.includes((pathname.toString().split('/')[2])?.toString()?.toLowerCase())

     return (
        <Link href={href?.toString()} className={'w-full text-[0.9rem]'}>
            <Button className={`w-full flex flex-row items-center justify-start py-2 bg-transparent hover:scale-[1.1] cursor-pointer transition duration-500 font-roboto capitalize normal-case text-primary-dark-b border-none shadow-none rounded-[1rem] ${active ? 'bg-primary-dark-b text-white' : ''}`}>
                <Image src={icon} alt={alt} width={40} height={40} className={`${active ? 'filter-white' : ''}`}/>
                <div>
                    {title}
                </div>
            </Button>
        </Link>

    );
};

export default DashboardSIdeBarItem;