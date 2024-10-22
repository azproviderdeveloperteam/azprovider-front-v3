'use client'
import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from "next/link";

type ImageLink = {
    img: string;
    link: string;
    alt:string
};

interface Props {
    images: ImageLink[];
}

const AboutAzImages: React.FC<Props> = ({ images }) => {
    const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const track = trackRef?.current;

        if (track) {
            let position = 0;
            const speed = 1;
            const moveSlider = () => {
                position -= speed;
                if (Math.abs(position) >= track.scrollWidth / 2) {
                    position = 0;
                }
                track.style.transform = `translateX(${position}px)`;
                requestAnimationFrame(moveSlider);
            };
            moveSlider();
        }
    }, []);

    return (
        <div className="slider-container">
            <div className="slider-track" ref={trackRef}>
                {images.map((image, index) => (
                    <Link href={image.link} key={index} target="_blank" rel="noopener noreferrer" className="slider-item">
                        <Image
                            src={image.img}
                            alt={image.alt}
                            width={150}
                            height={150}
                            className="slider-image"
                        />
                    </Link>
                ))}
                {images.map((image, index) => (
                    // تکرار تصاویر برای اسکرول بدون وقفه
                    <Link href={image.link} key={index + images.length} target="_blank" rel="noopener noreferrer" className="slider-item">
                        <Image
                            src={image.img}
                            alt={image.alt}
                            width={150}
                            height={150}
                            className="slider-image"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AboutAzImages;