'use client'
import React from 'react';
import {Accordion, AccordionBody, AccordionHeader} from "@material-tailwind/react";

type faqItemType = {
    title:string ,
    index? : number,
    desc : string
}


const FaqItem = ({title , index , desc} : faqItemType) => {

    const [open, setOpen] = React.useState<boolean>(false);


    return (
        <Accordion open={open} className={`bg-transparent ${!open ?"!border-b-none !border-b-[0px] !border-b-none`" : "!border-b !border-b-[1px] !border-b-black/20"}`} icon={<div className={`text-[1.4rem] transition-all duration-300 ${open ? 'text-[#EF5858]' : 'text-[#53DBB1]'}`}>{open ? '-' : '+'} </div>}>
            <AccordionHeader onClick={() => setOpen(!open)}  className={`${open ?"!border-b-none !border-b-[0px] !border-b-none`" : "!border-b !border-b-[1px] !border-b-white/10"}`} >
                <span className='  font-bold text-[1.1rem] '>
                    {title}
                </span>
            </AccordionHeader>
            <AccordionBody>
                   <span className='text-primary-hsYellow5   text-[1.1rem] '>
                    {desc}
                </span>
            </AccordionBody>
        </Accordion>
    );
};

export default FaqItem;