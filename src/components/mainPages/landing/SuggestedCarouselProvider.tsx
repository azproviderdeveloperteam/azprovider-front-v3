'use client'
import React, {useEffect,useState} from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import SuggestedCarousel from "@/components/mainPages/landing/SuggestedCarousel";
import Pusher from 'pusher-js';
const pusher = new Pusher("527a5a80b22f8ace48f1" ,{apiKey: "527a5a80b22f8ace48f1",cluster: "ap2"} )


const SuggestedCarouselProvider = async () => {
    const theme = {}


    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const channel = pusher.subscribe('notification-1');

        channel.bind('new-notification-1', data => {
            console.log(`Event received: ${data}`);
        });

        return () => {
            pusher.unsubscribe('notification-1');
        };
    }, [notifications]);

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