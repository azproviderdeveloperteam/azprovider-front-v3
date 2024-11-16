import React from 'react';
import { getCompanyDetails} from "@/services/companyServices";
import Image from "next/image";
import noImage from '@/public/no-image.svg'
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";
import ProductCard from "@/components/Cards/ProductCard";
 import AvatarSsr from "@/components/Cards/AvatarSsr";
import Link from "next/link";
import { getCookie } from "cookies-next";
import CompanyDetailsContacts from "@/components/mainPages/CompanyDetailsContacts";
import CompanyDetailsAddresses from "@/components/mainPages/CompanyDetailsAddresses";
import CompanyDatailsSocials from "@/components/mainPages/CompanyDatailsSocials"; // Import for cookie management

export const dynamicParams = false
export const dynamic = 'force-static'
// export async function generateStaticParams() {
//     return [{slug:'32'}]
// }
const CompanyDetailPage = async ({ params }: { params: { slug: string } }) => {
    const token = getCookie('cookieToken') || '';

            const {data} = await getCompanyDetails(params?.slug)



    const monthNamesFull = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    return (
        <div className='w-full py-28 '>
            <div className='max-w-[95rem]   m-auto w-full  px-[5%] lg:px-0'>
                <Image src={data?.logo ? `${data?.logo}` : noImage?.src} alt={data?.business_information?.name} height={200} width={500} className={'w-full h-[17rem] object-cover rounded-[1.3rem]'} />
                <AvatarSsr src={data?.logo ? `${data?.logo}` : noImage?.src} alt={data?.business_information?.name} className={'w-[7rem] h-[7rem] object-cover rounded-[1.3rem] translate-x-[4rem] translate-y-[-4.5rem] shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.24)]'} />

                <div className={'w-full px-[5%] mt-[-3rem]'}>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-between'>
                        <div className={'w-full lg:w-1/2 flex flex-col items-start justify-start'}>
                            <h1 className='text-[1.4rem] font-bold text-primary-dark-b'>
                                {data?.first_name ? data?.first_name + ' ' + data?.last_name : 'No Name Yet'}
                                <span className='ml-1'>
                                    <SsrIconBtn>
                                        <Image src={'/go-to-page-icon.svg'} alt={'go-to-page-icon.svg'} width={30}
                                               height={30}/>
                                    </SsrIconBtn>
                                </span>
                            </h1>
                            <div className='flex flex-row items-start justify-start'>
                                <div
                                    className='bg-[#A1A1A1] px-1 text-[0.7rem] text-white rounded-[0.3rem] flex flex-row items-center justify-start'>
                                    <Image src={'/star-light.svg'} alt={'star-light'} width={21} height={21}/>
                                    <div className='ml-1 text-[0.87rem] '>
                                        {data?.rate ? data?.rate : ' - '}

                                    </div>
                                </div>
                                <h2 className='text-[#A1A1A1] ml-2'>
                                    {data?.business_information?.international_name ? data?.business_information?.international_name : ' '}
                                </h2>
                            </div>

                        </div>
                        <CompanyDetailsContacts slug={params?.slug}/>
                    </div>


                    <p className='mt-2 text-justify'>
                        {/*{data?.short_description + 'Lorem ipsum dolor sit amet consectetur. Non non lorem tellus feugiat dui gravida fermentum facilisi feugiat. Diam dignissim lectus lacinia aliquam sollicitudin sagittis auctor tellus. Dui amet arcu adipiscing rhoncus. Adipiscing augue tempus pellentesque venenatis tempus laoreet. Egestas mauris eget enim id sed interdum. Eget tortor quam viverra adipiscing hac. Velit nunc nunc suspendisse nunc vestibulum vitae. Ullamcorper nibh metus elit non vel dictum volutpat venenatis ipsum. Aliquam leo penatibus interdum magna erat nec. Non augue urna phasellus lectus pellentesque. Vitae amet nibh ultrices sed lectus pretium nulla eleifend.'}*/}
                    </p>

                    <div className={`flex flex-row items-center justify-start text-primary-dark-b  `}>

                        <CompanyDatailsSocials slug={params?.slug}/>


                        <div className='font-thin text-[#8E8E8E] text-[0.7rem] ml-1'>
                            {
                                data?.created_at ?
                                    `Created Profile ${new Date(data?.created_at)?.getUTCDate()} ${monthNames[new Date(data?.created_at)?.getUTCMonth()]} ${new Date(data?.created_at)?.getUTCFullYear()} `
                                    :
                                    ' - '
                            }
                        </div>
                    </div>
                    <Image src={'/gray-location.svg'} alt={`location of ${data?.business_information?.name}`} width={20}
                           height={20}/>

                    <CompanyDetailsAddresses slug={params?.slug}/>

                    <h3 className='mt-5 font-bold text-[1.1rem] text-primary-dark-b'>
                        Employees
                    </h3>
                    { data?.employees?.map((item: any) => (
                        <div
                            key={item.id}
                            className="w-full my-2 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow  "
                        >
                            <p className="text-lg font-semibold">
                                Name: <span className="font-normal">{item.first_name} {item.last_name}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Position: <span className="font-normal">{item.position}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Department: <span className="font-normal">{item.department}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Email: <span className="font-normal">{item.email}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Mobile: <span className="font-normal">{item.mobile}</span>
                            </p>
                            <p className="text-lg font-semibold">
                                Description: <span className="font-normal">{item.description}</span>
                            </p>
                        </div>
                    ))}
                    <h3 className='mt-5 font-bold text-[1.1rem] text-primary-dark-b'>
                        Certificates
                    </h3>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                        {
                            data?.certificates?.map((item: any, index: number) => {
                                return (
                                    <div key={index + 1} className='flex flex-row items-center justify-start'>
                                        <Image src={item?.file ? `${process.env.MEDIA_URL}${item?.file}` : noImage?.src}
                                               alt={item?.title} height={80} width={80}
                                               className={'object-cover rounded-[0.6rem'}/>
                                        <div className='flex flex-col items-start justify-start ml-2'>
                                            <h4>
                                                {item?.title}
                                            </h4>
                                            <p>
                                                {item?.grade}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>


                    <h3 className='mt-5 font-bold text-[1.1rem] text-primary-dark-b'>
                        Membership
                    </h3>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>


                        <div className='flex flex-row items-center justify-start'>
                            <Image
                                src={data?.membership?.file ? `${process.env.MEDIA_URL}${data?.membership?.file}` : noImage?.src}
                                alt={data?.membership?.title} height={80} width={80}
                                className={'object-cover rounded-[0.6rem'}/>
                            <div className='flex flex-col items-start justify-start ml-2'>
                                <h4>
                                    {data?.membership?.serial_number}
                                </h4>
                                <p>
                                    {data?.membership?.description}
                                </p>
                            </div>
                        </div>


                    </div>

                    {
                        data?.product && data?.product?.length > 0 ?
                            <div className='w-full mt-4'>
                                <h3 className='text-[1.3rem] font-bold text-primary-dark-b inline'>
                                    {`${data?.business_information?.brand_name ? data?.business_information?.brand_name : 'Company'} Products`}
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


                    {
                        data?.service && data?.service?.length > 0 ?
                            <div className='w-full mt-4'>
                                <h3 className='text-[1.3rem] font-bold text-primary-dark-b inline'>
                                    {`${data?.business_information?.brand_name ? data?.business_information?.brand_name : 'Company'} Services`}
                                </h3>
                                <div className='w-full overflow-x-hidden'>
                                    <div
                                        className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                                        {
                                            data?.service?.map((item: any, index: number) => {
                                                return (
                                                    <Link href={`/services/${item?.id}`}
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

            </div>
        </div>
    );
};

export default CompanyDetailPage;

