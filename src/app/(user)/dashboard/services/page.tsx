'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getDashboardServices } from "@/services/dashboardProductsServices";
import { getAllMeasure, getGrantedOrganisationList } from "@/services/measurementServices";
import AddServiceForm from "@/components/dashboard/services/AddServiceForm";
import ServiceListDashboard from "@/components/dashboard/services/ServiceListDashboard";
import AddServiceCard from "@/components/dashboard/services/AddServiceCard";
import { useDraggable } from "react-use-draggable-scroll";

const ServicesPage = () => {
    const [viewAddProductForm, setViewAddProductForm] = useState<any>(undefined)
    const [submit, setSubmit] = useState(0)

    // استیت برای اطمینان از بالا آمدن کامل کامپوننت در مرورگر
    const [isMounted, setIsMounted] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const { events } = useDraggable(ref as React.MutableRefObject<HTMLDivElement>);

    // این افکت فقط در مرورگر اجرا می‌شود
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { data: servicesData, isPending: servicesPending, error: servicesError } = useQuery({
        queryKey: ['get-dashboard-services', submit],
        queryFn: getDashboardServices,
        retry: false,
        enabled: isMounted, // تا زمانی که در مرورگر لود نشده، کوئری اجرا نشود
    })

    const { data: allMeasureData, isPending: allMeasurePending, error: allMeasureError } = useQuery({
        queryKey: ['get-all-measure', submit],
        queryFn: getAllMeasure,
        retry: false,
        enabled: isMounted, // تا زمانی که در مرورگر لود نشده، کوئری اجرا نشود
    })

    const { data: getGrantedOrganisationListData, isPending: getGrantedOrganisationListPending, error: getGrantedOrganisationListError } = useQuery({
        queryKey: ['get-getGrantedOrganisationList', submit],
        queryFn: getGrantedOrganisationList,
        retry: false,
        enabled: isMounted, // تا زمانی که در مرورگر لود نشده، کوئری اجرا نشود
    })

    useEffect(() => {
        if (servicesData?.data) {
            if (servicesData?.data?.length > 0) {
                setViewAddProductForm(undefined)
            } else {
                setViewAddProductForm(null)
            }
        } else {
            setViewAddProductForm(null)
        }
    }, [servicesData])

    // اگر هنوز در مرورگر ماونت نشده بود، برای جلوگیری از خطای سرور چیزی رندر نکنیم
    if (!isMounted) {
        return null; // یا یک Loading ساده قرار دهید
    }

    return (
        <>
            {
                viewAddProductForm !== undefined &&
                <AddServiceForm
                    viewAddProductForm={viewAddProductForm}
                    allGrantedList={getGrantedOrganisationListData}
                    allMeasureData={allMeasureData}
                    exitKey={!!servicesData?.data?.length}
                    onClose={() => {
                        setViewAddProductForm(undefined)
                        setSubmit(submit + 1)
                    }}
                />
            }

            <div className={`w-full overflow-x-hidden ${viewAddProductForm !== undefined ? 'hidden' : ""}`}>
                <div
                    {...events}
                    ref={ref}
                    className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-x-auto no-scrollbar'>
                    <ServiceListDashboard
                        setViewForm={(e: any) => setViewAddProductForm(e)}
                        productsData={servicesData?.data}
                        setSubmit={setSubmit}
                        submit={submit}
                    />
                </div>
                <div className={'max-w-[95rem] lg:w-[95rem] m-auto w-full py-8 px-5'}>
                    <AddServiceCard setViewForm={() => setViewAddProductForm(null)} />
                </div>
            </div>
        </>
    );
};

export default ServicesPage;