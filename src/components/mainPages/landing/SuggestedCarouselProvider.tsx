'use client'
import React from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import SuggestedCarousel from "@/components/mainPages/landing/SuggestedCarousel";

const SuggestedCarouselProvider = () => {
    const theme = {}
    return (
        <ThemeProvider value={theme}>
            <SuggestedCarousel/>
        </ThemeProvider>
    );
};

export default SuggestedCarouselProvider;