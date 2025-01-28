'use client'
import React, { useState , useRef } from "react";
import { PlayIcon } from "@/components/icons";
const VideoPlayer = ({ url, coverImage = '/cover-test.png'}: { url: string; coverImage?: string }) => {


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="  w-full h-0 w-full rounded-pxLg overflow-hidden "> {/* For 16:9 aspect ratio */}
            {/*{!isPlaying && (*/}
            {/*    <div*/}
            {/*        className="absolute inset-0 flex items-center justify-center bg-black/0 !cursor-pointer"*/}
            {/*        onClick={handlePlay}*/}
            {/*    >*/}
            {/*        /!*<img src={coverImage} alt={url} className="w-full h-full object-cover" />*!/*/}
            {/*        <span className="absolute ">*/}
            {/*            <PlayIcon />*/}
            {/*        </span>*/}
            {/*    </div>*/}
            {/*)}*/}

            <video
                ref={videoRef}
                src={url}
                className={`absolute inset-0 w-full h-full '}`}
                controls
            />
        </div>
    );
};


export default VideoPlayer;