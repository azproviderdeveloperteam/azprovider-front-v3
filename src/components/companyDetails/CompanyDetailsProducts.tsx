import React from 'react';
import Link from "next/link";
import ProductCard from "@/components/Cards/ProductCard";
import {GrayEditIcon} from "@/components/icons";
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";

const CompanyDetailsProducts = ({data , viewEditMode} : any) => {

    return (
        <div className={'w-full'}>
            {
                data?.product && data?.product?.length > 0 ?
                    <div className='w-full mt-4'>
                        <h3 className='text-[1.3rem] font-bold text-primary-dark-b text-center lg:text-left gap-2 flex flex-row'>
                            {`${data?.business_information?.brand_name ? data?.business_information?.brand_name : 'Company'} Products`}
                            { viewEditMode && <Link href={'/dashboard/products'} target={"_blank"} ><SsrIconBtn><GrayEditIcon /></SsrIconBtn></Link>}
                        </h3>
                        <div className='w-full overflow-x-hidden'>
                            <div
                                className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                                {
                                    data?.product?.map((item: any, index: number) => {
                                        return (
                                            <Link href={`/products/${item?.id}`}
                                                  className={`${index === 0 ? ' ' : ''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`}
                                                  key={index + 1}>
                                                <ProductCard item={item} theme={'light'}/>
                                            </Link>
                                        )
                                    })
                                }
                                <div
                                    className={`   w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`}>
                                    <div
                                        className={`w-full aspect-[0.7334] flex flex-col items-center justify-between rounded-[1.6rem] opacity-0 `}>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    : null
            }

        </div>
    );
};

export default CompanyDetailsProducts;