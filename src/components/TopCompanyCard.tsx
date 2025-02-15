'use client'
import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import CompanyCard from "@/components/Cards/CompanyCard";

const TopCompanyCard = ({data} : {data : any}) => {

    const {user} = useAuth()
   const item =  data?.find((x:any) => x.id === user?.userData?.id) || undefined


    return (
        item ?
        <div className={` w-full overflow-visible pt-4 pb-2 px-1`} >
            <CompanyCard topItem={true} item={item}/>
        </div>
            : null
    );
};

export default TopCompanyCard;