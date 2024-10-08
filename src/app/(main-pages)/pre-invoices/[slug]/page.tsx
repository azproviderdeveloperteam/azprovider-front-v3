
import React from 'react';
import Image from "next/image";
 import SsrIconBtn from "@/components/Buttons/SsrIconBtn";
import ProductCard from "@/components/Cards/ProductCard";
 import {getPreInvoiceDetails, getProductDetails} from "@/services/productSevices";
import SendRequestProductPage from "@/components/dialog/SendRequestProductPage";

export const dynamicParams = false
export const dynamic = 'force-static'
// export async function generateStaticParams() {
//     return [{slug:'32'},{slug:'33'}]
// }
const  PreInvoiceDetailsPage = async ({ params }: { params: { slug: string } }) => {

            const {data} = await getPreInvoiceDetails(params?.slug)





    const monthNamesFull = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    return (
        <div className='w-full py-28 '>
            <div className='  m-auto w-full  px-[5%]  '>

                <div className='w-full grid grid-cols-12 gap-4'>


                    <div className='col-span-11  lg:col-span-5'>
                        <div className='w-full flex flex-row items-center justify-start'>
                            <Image src={'/dark-medal.svg'} alt={'dark-medal'} width={20} height={20} />
                            <div className={`text-primary-dark-b text-[0.7rem] ml-1 mt-1`}>
                                { data?.granted_organisation?.description  ? data?.granted_organisation?.description : ' - '}
                            </div>
                        </div>
                        <h1 className='text-[1.4rem] text-primary-dark-b font-bold'>
                            {data?.title}
                        </h1>

                        <div className='flex flex-row items-start justify-start'>
                            <div className='bg-[#A1A1A1] px-1 text-[0.7rem] text-white rounded-[0.3rem] flex flex-row items-center justify-start'>
                                <Image src={'/star-light.svg'} alt={'star-light'} width={21} height={21} />
                                <div className='ml-1 text-[0.87rem] '>
                                    { data?.rate  ? data?.rate : ' - '}

                                </div>
                            </div>
                            <h2 className='text-[#A1A1A1] ml-2'>
                                {data?.brand_name ? data?.brand_name: ' '}
                            </h2>
                        </div>

                        <p className={'mt-3 text-justify text-primary-dark-b'}>
                            {data?.short_description}
                        </p>
                        <div className='font-thin text-[0.7rem] mt-4 text-[#8E8E8E]'>
                            {
                                data?.publish_date_from ?
                                    `${new Date(data?.publish_date_from)?.getUTCDate()} ${monthNames[new Date(data?.publish_date_from)?.getUTCMonth()] } ${new Date(data?.publish_date_from)?.getUTCFullYear()} - ${new Date(data?.publish_date_to)?.getUTCDate()} ${monthNames[new Date(data?.publish_date_to)?.getUTCMonth()] } ${new Date(data?.publish_date_to)?.getUTCFullYear()}`
                                    :
                                    ' - '
                            }
                        </div>
                        <div className='flex flex-row items-center justify-start text-[1rem] mt-4'>
                            <div className='w-2/5  text-[#8E8E8E] font-bold'>
                                Certification
                            </div>

                            <div className='w-3/5  text-primary-dark-b'>
                                {data?.certification}
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-start text-[1rem] mt-1'>
                            <div className='w-2/5  text-[#8E8E8E] font-bold'>
                                Quantity
                            </div>

                            <div className='w-3/5  text-primary-dark-b'>
                                {data?.quantity}
                            </div>
                        </div>

                        <div className='flex flex-row items-center justify-start text-[1rem] mt-1'>
                            <div className='w-2/5  text-[#8E8E8E] font-bold'>
                                Quality
                            </div>

                            <div className='w-3/5  text-primary-dark-b'>
                                {data?.quality}
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-start text-[1rem] mt-1'>
                            <div className='w-2/5  text-[#8E8E8E] font-bold'>
                                Size
                            </div>

                            <div className='w-3/5  text-primary-dark-b'>
                                {`${data?.capacity} ${data?.measure_unit?.name}`}
                            </div>
                        </div>

                        <div className='flex flex-row items-center justify-start text-[1rem] mt-5'>
                            <div className='w-2/5  text-[#8E8E8E] font-bold'>
                                <SendRequestProductPage data={data}/>
                            </div>


                        </div>

                    </div>
                    <div className='col-span-11  lg:col-span-6'>
                        <Image src={data?.media_files?.[0]?.image ? 'https://azprovider.com/'+data?.media_files?.[0]?.image :'/no-image.svg'} alt={'bookmark-not-fill.svg'} width={500} height={500} className={'w-full aspect-[1.333] object-cover rounded-[2rem]'}/>
                        {/*<div className='mt-4 grid grid-cols-4 gap-2'>*/}
                        {/*    <Image src={'/no-image.svg'} alt={'bookmark-not-fill.svg'} width={500} height={500} className={'col-span-1  aspect-[1.333] object-cover rounded-[2rem]'}/>*/}
                        {/*    <Image src={'/no-image.svg'} alt={'bookmark-not-fill.svg'} width={500} height={500} className={'col-span-1  aspect-[1.333] object-cover rounded-[2rem]'}/>*/}
                        {/*    <Image src={'/no-image.svg'} alt={'bookmark-not-fill.svg'} width={500} height={500} className={'col-span-1  aspect-[1.333] object-cover rounded-[2rem]'}/>*/}

                        {/*</div>*/}
                    </div>
                    <div className='col-span-1'>

                        <div className={'bg-[#F8F8F8] w-full flex flex-col items-center justify-start p-5 rounded-[1rem]'}>
                            <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                                <Image src={'/bookmark-not-fill.svg'} alt={'bookmark-not-fill.svg'} width={80} height={80} />
                            </SsrIconBtn>
                        </div>
                    </div>
                </div>

                    {
                        data?.products && data?.products?.length > 0 ?
                            <div className='w-full mt-4'>
                                <h3 className='text-[1.3rem] font-bold text-primary-dark-b inline'>
                                    {`${data?.business_information?.brand_name ? data?.business_information?.brand_name: 'Company'} Products`}
                                </h3>
                                <div className='w-full overflow-x-hidden'>
                                    <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                                        {
                                            data?.products?.map((item : any ,index : number)=>{
                                                return(
                                                    <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                                        <ProductCard item={item} theme={'light'}/>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className={`   w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`}  >
                                            <div className={`w-full aspect-[0.7334] flex flex-col items-center justify-between rounded-[1.6rem] opacity-0 `}>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            :null
                    }



            </div>
        </div>
    );
};

export default PreInvoiceDetailsPage;

