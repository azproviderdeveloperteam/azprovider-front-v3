'use client'
import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import CompanyCard from "@/components/Cards/CompanyCard";

const TopCompanyCard = ({data} : {data : any}) => {

    const {user} = useAuth()


    return (
        user?.userData && user?.login ?
        <div className={` w-full overflow-visible pt-4 pb-2 px-1`} >
            <CompanyCard topItem={true} item={user?.userData}/>
        </div>
            :null

    );
};

export default TopCompanyCard;