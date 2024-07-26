import React from 'react';
import {Dialog} from "@material-tailwind/react";
import { ThemeProvider } from "@material-tailwind/react";

const AzDialog = ({children , open , handler , size} : any) => {


    const theme = {
        dialog: {
            defaultProps: {
                size: size ? size : 'md',
                dismiss: {},
                animate: {
                    unmount: {},
                    mount: {},
                },
                className: "",
            },
            valid: {
                sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
            },
            styles: {
                base: {
                    backdrop: {
                        display: "grid",
                        placeItems: "place-items-center",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "w-screen",
                        height: "h-screen",
                        backgroundColor: "bg-[#2C838B80]",
                        backgroundOpacity: "bg-opacity-50",
                        backdropFilter: "backdrop-blur-sm",
                    },
                    container: {
                        position: "relative",
                        bg: "bg-white",
                        m: "m-4",
                        borderRadius: "rounded-lg",
                        boxShadow: "shadow-2xl",
                        color: "text-blue-gray-500",
                        fontSmoothing: "antialiased",
                        fontFamily: "font-sans",
                        fontSize: "text-base",
                        fontWeight: "font-light",
                        lineHeight: "leading-relaxed",
                    },
                },
                sizes: {
                    xs: {
                        width: "w-full md:w-3/5 lg:w-2/5 2xl:w-1/4",
                        minWidth: "min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%]",
                        maxWidth: "max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]",
                    },
                    sm: {
                        width: "w-full md:w-2/3 lg:w-2/4 2xl:w-1/3",
                        minWidth: "min-w-[80%] md:min-w-[66.666667%] lg:min-w-[50%] 2xl:min-w-[33.333333%]",
                        maxWidth: "max-w-[80%] md:max-w-[66.666667%] lg:max-w-[50%] 2xl:max-w-[33.333333%]",
                    },
                    md: {
                        width: "w-full md:w-3/4 lg:w-3/5 2xl:w-2/5",
                        minWidth: "min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%]",
                        maxWidth: "max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]",
                    },
                    lg: {
                        width: "w-full md:w-5/6 lg:w-3/4 2xl:w-3/5",
                        minWidth: "min-w-[90%] md:min-w-[83.333333%] lg:min-w-[75%] 2xl:min-w-[60%]",
                        maxWidth: "max-w-[90%] md:max-w-[83.333333%] lg:max-w-[75%] 2xl:max-w-[60%]",
                    },
                    xl: {
                        width: "w-full md:w-5/6 2xl:w-3/4",
                        minWidth: "min-w-[95%] md:min-w-[83.333333%] 2xl:min-w-[75%]",
                        maxWidth: "max-w-[95%] md:max-w-[83.333333%] 2xl:max-w-[75%]",
                    },
                    xxl: {
                        display: "flex",
                        flexDirection: "flex-col",
                        width: "w-screen",
                        minWidth: "min-w-[100vw]",
                        maxWidth: "max-w-[100vw]",
                        height: "h-screen",
                        minHeight: "min-h-[100vh]",
                        maxHeight: "max-h-[100vh]",
                        m: "m-0",
                        borderRadius: "rounded-none",
                    },
                },
            },
        },
    };


    return (
        <ThemeProvider value={theme}>
        <Dialog
            open={open} handler={()=>handler(false)}
            className='bg-white text-white flex flex-col items-center justify-start py-3 px-6 md:rounded-3xl font-roboto
                    md:w-auto
                    absolute
                    md:relative
                    rounded-t-3xl rounded-b-[0px]
                    !w-[100vw]

                    max-w-[100%]
                    !bottom-0
                    !left-0
                    !right-0
                    m-0
                '
            size={size ? size : 'md'}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 1, y: 100 },
            }}
        >

                {children}

        </Dialog>
        </ThemeProvider>
    );
};

export default AzDialog;