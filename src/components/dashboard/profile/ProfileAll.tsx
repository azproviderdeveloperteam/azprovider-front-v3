'use client'
import React from 'react';

const ProfileAll = ({data}:any) => {


    return (
        <div className=' '>
            <div className='w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory pt-5'>
                {
                    [...Array(5)].map((item ,index)=>{
                        return(
                            <div key={index+1} className='w-[40.5%] min-w-[40rem] snap-start '>
                                {index * 123213}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProfileAll;