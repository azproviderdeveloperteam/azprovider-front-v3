'use client'
import React from 'react';
import {useMegaMenu, useMegaMenuAction} from "../../contexts/MegaMenuContext";
import LightBtn from "@/components/Buttons/LightBtn";
import {texts} from "@/utils/texts";
import {Drawer, IconButton, ThemeProvider, Typography} from "@material-tailwind/react";
import Link from "next/link";
import DashboardSIdeBarItem from "@/components/dashboard/DashboardSIdeBarItem";

const ResponsiveDashboardDrawer = () => {


    const text = texts
    const myTexts = texts.eng.dashboard.main.sidebar

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
        dispatch({type:"CLOSE_DASHBOARD_DRAWER"})
    }

    return (
        <ThemeProvider value={theme}>
            <Drawer open={menu.responsiveDashboardDrawer} onClose={closeDrawer} className="  p-4 !rounded-r-[3vw]">
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

                <div className='w-full h-[95%] flex flex-col items-start justify-between px-[1%]' onClick={closeDrawer}>
                    <div className='w-full flex flex-col items-start justify-between pt-4'>
                        {
                            myTexts.items.slice(0,7).map((item , index)=>{
                                return(
                                    <DashboardSIdeBarItem href={item.href} title={item.title} alt={item.alt} icon={item.icon} key={index+1} />
                                )
                            })
                        }
                    </div>

                    <div className='w-full flex flex-col items-start justify-between pb-4'>
                        {
                            myTexts.items.slice(8).map((item , index)=>{
                                return(
                                    <DashboardSIdeBarItem href={item.href} title={item.title} alt={item.alt} icon={item.icon} key={index+1} />

                                )
                            })
                        }
                    </div>
                </div>
            </Drawer>
        </ThemeProvider>
    );
};


export default ResponsiveDashboardDrawer;