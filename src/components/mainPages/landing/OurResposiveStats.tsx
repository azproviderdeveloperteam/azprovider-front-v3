'use client'
import React from 'react';
import OurResponsiveAnalyticComponent from "@/components/mainPages/landing/OurResponsiveAnalyticComponent";
import {useQuery} from "@tanstack/react-query";
import { getSiteStatistics} from "@/services/profileServices";

const OurResposiveStats = () => {

    const { data  , isLoading, error } = useQuery({
        queryKey: ["getAllBlogs"],
        queryFn: () => getSiteStatistics(),
    });


    const analytics = [
        {title:"Companies" , count :data?.data?.users?.total || '-'},
        {title:"Products" , count :data?.data?.products?.total || '-'},
        {title:"Services" , count :data?.data?.services?.total || '-'}
    ]
    return (
        <div className='w-full flex flex-row item-center justify-between flex-wrap'>
            {
                analytics.map((item ,index)=>{
                    return(
                        <OurResponsiveAnalyticComponent item={item?.title} key={index+1} index={item?.count} />
                    )
                })
            }
        </div>
    );
};

export default OurResposiveStats;