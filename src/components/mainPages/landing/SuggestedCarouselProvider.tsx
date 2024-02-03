'use client'
import React from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import SuggestedCarousel from "@/components/mainPages/landing/SuggestedCarousel";


const SuggestedCarouselProvider = async () => {
    const theme = {}



    // const channel = pusher.subscribe('chats-userId');
    //! create new chat
    // channel.bind('new-chat-userId', data => {
    //     console.log(`Event received: ${data}`);
    // });

    //! create new message
    //? data :{type:'chat | request'}
    //! if type == chat ?

    //! channel: chat-messages
    //! event : new-chat-messages
    // return () => {
    //     pusher.unsubscribe('notification-1');
    // };

    return (
        <ThemeProvider value={theme}>
            <SuggestedCarousel/>
        </ThemeProvider>
    );
};

export default SuggestedCarouselProvider;