import React from 'react';
import FaqItem from "@/components/FaqItem";

const FaqPage = () => {
    const items =[
        {
            title:"1. Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset " ,
            desc: 'Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset necessitatibus ad. Maiorum placerat mei at, ne dicant gloriatur vim. Id vel illud debitis accusata, sea ei odio ullamcorper. Id illum tempor legimus his. Modus postulant pri id, eu minim equidem ius. Nam quem legimus nominati ne.'
        },
        {
            title:"2. Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset " ,
            desc: 'Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset necessitatibus ad. Maiorum placerat mei at, ne dicant gloriatur vim. Id vel illud debitis accusata, sea ei odio ullamcorper. Id illum tempor legimus his. Modus postulant pri id, eu minim equidem ius. Nam quem legimus nominati ne.'
        },
        {
            title:"3. Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset " ,
            desc: 'Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset necessitatibus ad. Maiorum placerat mei at, ne dicant gloriatur vim. Id vel illud debitis accusata, sea ei odio ullamcorper. Id illum tempor legimus his. Modus postulant pri id, eu minim equidem ius. Nam quem legimus nominati ne.'
        },
        {
            title:"4. Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset " ,
            desc: 'Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset necessitatibus ad. Maiorum placerat mei at, ne dicant gloriatur vim. Id vel illud debitis accusata, sea ei odio ullamcorper. Id illum tempor legimus his. Modus postulant pri id, eu minim equidem ius. Nam quem legimus nominati ne.'
        },
        {
            title:"5. Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset " ,
            desc: 'Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset necessitatibus ad. Maiorum placerat mei at, ne dicant gloriatur vim. Id vel illud debitis accusata, sea ei odio ullamcorper. Id illum tempor legimus his. Modus postulant pri id, eu minim equidem ius. Nam quem legimus nominati ne.'
        },
        {
            title:"6. Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset " ,
            desc: 'Lorem ipsum dolor sit amet, ea sea reque expetenda dissentiet, sit dicat maluisset necessitatibus ad. Maiorum placerat mei at, ne dicant gloriatur vim. Id vel illud debitis accusata, sea ei odio ullamcorper. Id illum tempor legimus his. Modus postulant pri id, eu minim equidem ius. Nam quem legimus nominati ne.'
        },
    ]
    return (
        <div className='w-full py-28 '>
            <div className='relative w-full   m-auto h-auto pb-[10rem]  bg-center bg-no-repeat bg-cover py-10 px-[3%]' >

                <h1 className='text-center font-bold text-[2rem]'>
                    Az Provider FAQs
                </h1>
                <div className='w-full m-auto max-w-[52.5rem]'>
                    <div className='w-full  flex flex-col items-center justify-center mt-10'>
                        {
                            items.map((item : {title:string , desc : string} , index:number)=>{
                                return(
                                    <FaqItem key={index+1} title={item.title} desc={item.desc} index={index} />
                                )
                            })
                        }
                    </div>
                </div>


            </div>
        </div>
    );
};

export default FaqPage;