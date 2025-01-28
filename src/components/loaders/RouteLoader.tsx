'use client'
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import {FloatingWhatsApp} from "react-floating-whatsapp";
import LandingHelpVideoModal from "@/components/HelpModals/LandingHelpVideoModal";

const RouteLoader = () => {
    return (

       <>
           <ProgressBar
               height="4px"
               color="#000000"
               options={{ showSpinner: false }}
               shallowRouting
           />

           <FloatingWhatsApp
               phoneNumber={'989121873696'}
               accountName={'AZ Support'}
               chatMessage={'Hello, I am the support of AZ provider i, how can I help you?'}
           />
           <LandingHelpVideoModal />

        </>
    );
};

export default RouteLoader;