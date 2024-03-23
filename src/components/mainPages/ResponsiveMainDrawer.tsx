'use client'
import React from 'react';
import {useMegaMenu, useMegaMenuAction} from "../../contexts/MegaMenuContext";
import {
    Drawer ,
    ThemeProvider ,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";

type ResponsiveMainDrawerProps = {
    text : object
}
const ResponsiveMainDrawer = ({text}  :ResponsiveMainDrawerProps) => {

    const theme = {
        drawer: {
            defaultProps: {
                overlay: true,
                placement: "left",
                overlayProps: undefined,
                className: "",
                dismiss: undefined,
                onClose: undefined,
                transition: {
                    type: "tween",
                    duration: 0.3,
                },
            },
            styles: {
                base: {
                    drawer: {
                        position: "fixed",
                        zIndex: "z-[9999]",
                        pointerEvents: "pointer-events-auto",
                        backgroundColor: "bg-white",
                        boxSizing: "box-border",
                        // width: "w-[75vw]",
                        // maxWidth: "w-[75vw]",
                        boxShadow: "shadow-2xl shadow-blue-gray-900/10",
                    },
                    overlay: {
                        position: "fixed",
                        inset: "inset-0",
                        width: "w-full",
                        height: "h-screen",
                        // pointerEvents: "pointer-events-auto",
                        zIndex: "z-[9999]",
                        backgroundColor: "bg-[#2C838B80]",
                        backgroundOpacity: "bg-opacity-50",
                        backdropBlur: "backdrop-blur-sm",
                    },
                },
            },
        },
    };

    const {menu} = useMegaMenu()
    const dispatch = useMegaMenuAction()


    const closeDrawer = () =>{
        dispatch({type:"CLOSE_MAIN_DRAWER"})
    }

    return (
        <ThemeProvider value={theme}>
            <Drawer open={menu.responsiveMainDrawer} onClose={closeDrawer} className="  p-4 !rounded-r-[3vw]">
                <div className="w-full flex items-center justify-between px-4 pb-2">
                    <Typography variant="h5" color="blue-gray">
                        AZ Provider
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>

                <div className={'flex flex-col items-start justify-start '} onClick={closeDrawer}>

                    <Link href={'/services'}>
                        <LightBtn border={false} otherClass={'mt-2 '} black={false}>
                            {text.services}
                        </LightBtn>
                    </Link>

                    <Link href={'/products?sort=date'}>
                        <LightBtn border={false} otherClass={'mt-2'} black={false}>
                            {text.products}
                        </LightBtn>
                    </Link>

                    <Link href={'/companies'}>
                        <LightBtn border={false} otherClass={'mt-2'} black={false}>
                            {text.companies}
                        </LightBtn>
                    </Link>

                </div>
            </Drawer>
        </ThemeProvider>
    );
};

export default ResponsiveMainDrawer;