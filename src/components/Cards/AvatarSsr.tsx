'use client'
import React from 'react';
import {Avatar} from "@material-tailwind/react";

type ssrAvatarType = {
    src : string ,
    alt : string ,
    className : string
}
const AvatarSsr = ({src , alt , className} : ssrAvatarType) => {
    return (
        <Avatar src={src} alt={alt} className={className} />
    );
};

export default AvatarSsr;