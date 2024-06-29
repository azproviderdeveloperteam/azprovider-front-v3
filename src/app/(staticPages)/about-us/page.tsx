import React from 'react';
import Image from "next/image";
import bg from '@/public/about-usImage-logo.png'
const AboutUsPage = () => {
    return (
        <div className='w-full ' >
            <div className='relative w-full    m-auto h-autopt-[2rem] bg-center bg-no-repeat bg-cover '  style={{backgroundImage:`url(${bg.src})`}}>
                <div className=' bg-[#051926] bg-opacity-80 flex flex-col lg:flex-row items-center justify-center w-full  !py-[6rem]  px-[3%] text-white'>
                    <div className='w-full max-w-[66rem] m-auto bg-primary-hsDark11 lg:aspect-[3.152] rounded-[2rem] flex flex-row items-center justify-between'>
                        <div className='py-8 pl-8 w-full'>
                            <h1 className='text-[1.5rem] font-bold'>
                                About Us
                            </h1>
                            <p className='w-full mt-3 text-[0.9rem] '>
                                Founded in 2010, <span className='font-bold mx-1 '> AzProvider</span>  has evolved from a supply chain company to a comprehensive digital platform, offering a diverse selection of products and exclusive services from reliable global suppliers. Our platform simplifies sourcing raw materials and finished goods, ensuring high standards for quality, reliability, and affordability. We provide small businesses and large corporations with seamless, efficient supply chain solutions, allowing them to focus on growth. Discover how AZ Provider can support your business today.
                            </p>
                        </div>
                    </div>
                </div>
            </div>




            <div className='  w-full   m-auto h-auto   bg-center bg-no-repeat bg-cover  px-[3%] bg-gradient-to-b from-zinc-100 to-slate-50'  >
                <div className=' w-full 2xl:w-[96rem] m-auto h-auto flex flex-col items-center justify-start py-10'>
                    <div className={'max-w-full min-w-[20rem] flex flex-col items-center justify-start'}>
                        <div id={'one'} className='w-full opacity-40' >
                            <div className='w-full'   >
                                <div className='w-full'  >
                                    <h1 className=' py-3 px-5 w-full text-center text-[100%] opacity-0'  >
                                        What Sets Us Apart
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <h1 className='absolute py-3 px-5 w-full text-center text-[100%] '  >
                            What Sets Us Apart
                        </h1>

                    </div>
                    <div className='max-w-full w-[20rem] flex flex-row items-center justify-center '>
                        <div  className={`h-[2px] w-full  rounded-full`} style={{background:'linear-gradient(90deg, #D48F09 0%, #278BD4 100%)'}}>
                            <div   className={`h-[2px] w-full  rounded-full`} style={{background:'linear-gradient(90deg, #0A0C10 0%, rgba(10, 12, 16, 0) 50%, #0A0C10 100%)'}}>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' w-full 2xl:w-[96rem] m-auto flex flex-col lg:flex-row items-start justify-between px-[3%]'>
                    <div className='w-full lg:w-1/3 flex  flex-col items-center justify-start m-3'>
                        <div className='relative w-[5rem] aspect-square rounded-r-[2rem] rounded-bl-[2rem] overflow-visible !bg-primary-green-tb/20'  >
                            <div className='flex flex-row items-center justify-center absolute left-[0.3rem] top-[-0.3rem] w-[5rem] aspect-square rounded-t-[2rem] rounded-bl-[2rem] bg-black/10 backdrop-blur-[2px]	 border-[1px] border-white/20' >
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8V13.77C1 15.89 1 15.89 3 17.24L8.5 20.42C9.33 20.9 10.68 20.9 11.5 20.42L17 17.24C19 15.89 19 15.89 19 13.78V8C19 5.89 19 5.89 17 4.54L11.5 1.36C10.68 0.88 9.33 0.88 8.5 1.36L3 4.54C1 5.89 1 5.89 1 8Z" stroke="#051926" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10 13.8899C11.6569 13.8899 13 12.5467 13 10.8899C13 9.23304 11.6569 7.88989 10 7.88989C8.34315 7.88989 7 9.23304 7 10.8899C7 12.5467 8.34315 13.8899 10 13.8899Z" stroke="#051926" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </div>
                        </div>
                        <h3 className={'ml-2 md:mt-2'}>
                            Unmatched Accessibility
                        </h3>
                        <p className='text-center mt-4 text-[0.8rem]  px-5'>
                            Experience full access to all features and detailed product information immediately after free registration. Our platform ensures you have everything you need at your fingertips to make informed decisions.
                        </p>
                    </div>

                    <div className='w-full lg:w-1/3 flex  flex-col items-center justify-start m-3'>
                        <div className='relative w-[5rem] aspect-square rounded-r-[2rem] rounded-bl-[2rem] overflow-visible !bg-primary-green-tb/20'  >
                            <div className='flex flex-row items-center justify-center absolute left-[0.3rem] top-[-0.3rem] w-[5rem] aspect-square rounded-t-[2rem] rounded-bl-[2rem] bg-black/10 backdrop-blur-[2px]	 border-[1px] border-white/20' >
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8V13.77C1 15.89 1 15.89 3 17.24L8.5 20.42C9.33 20.9 10.68 20.9 11.5 20.42L17 17.24C19 15.89 19 15.89 19 13.78V8C19 5.89 19 5.89 17 4.54L11.5 1.36C10.68 0.88 9.33 0.88 8.5 1.36L3 4.54C1 5.89 1 5.89 1 8Z" stroke="#051926" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10 13.8899C11.6569 13.8899 13 12.5467 13 10.8899C13 9.23304 11.6569 7.88989 10 7.88989C8.34315 7.88989 7 9.23304 7 10.8899C7 12.5467 8.34315 13.8899 10 13.8899Z" stroke="#051926" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </div>
                        </div>
                        <h3 className={'ml-2 md:mt-2'}>
                            Exclusive Savings

                        </h3>
                        <p className='text-center mt-4 text-[0.8rem]  px-5'>
                            ake advantage of exclusive discounts and hot deals updated in real-time based on HS Codes. Our "On Sale" and "Hot Deal" sections offer unbeatable prices, helping you maximize your budget.
                        </p>
                    </div>

                    <div className='w-full lg:w-1/3 flex flex-col items-center justify-start m-3'>
                        <div className='relative w-[5rem] aspect-square rounded-r-[2rem] rounded-bl-[2rem] overflow-visible !bg-primary-green-tb/20'  >
                            <div className='flex flex-row items-center justify-center absolute left-[0.3rem] top-[-0.3rem] w-[5rem] aspect-square rounded-t-[2rem] rounded-bl-[2rem] bg-black/10 backdrop-blur-[2px]	 border-[1px] border-white/20' >
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8V13.77C1 15.89 1 15.89 3 17.24L8.5 20.42C9.33 20.9 10.68 20.9 11.5 20.42L17 17.24C19 15.89 19 15.89 19 13.78V8C19 5.89 19 5.89 17 4.54L11.5 1.36C10.68 0.88 9.33 0.88 8.5 1.36L3 4.54C1 5.89 1 5.89 1 8Z" stroke="#051926" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10 13.8899C11.6569 13.8899 13 12.5467 13 10.8899C13 9.23304 11.6569 7.88989 10 7.88989C8.34315 7.88989 7 9.23304 7 10.8899C7 12.5467 8.34315 13.8899 10 13.8899Z" stroke="#051926" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </div>
                        </div>
                        <h3 className={'ml-2 md:mt-2'}>
                            Secure and Efficient Transactions

                        </h3>
                        <p className='text-center mt-4 text-[0.8rem]  px-5'>
                            Connect with suppliers securely and enjoy minimal fees of just 0.1% (1$/1000$) per transaction. Our streamlined process ensures a seamless and stress-free experience from start to finish.
                        </p>
                    </div>
                </div>
                <div className='relative w-full 2xl:w-[96rem] m-auto h-auto py-32  ' >
                    <div className='w-full relative !z-1 h-full flex flex-col lg:flex-row items-center justify-between  px-[3%]'>
                        <div className='w-full lg:w-1/2 h-full   flex flex-row items-center justify-center mt-8  lg:mt-0 lg:hidden'>
                            <Image src={'/a.png'} alt={'our-history-az-provider'} width={1000} height={1000} className={'w-full rounded-xl shadow'} />
                        </div>
                        <div className='w-full lg:w-1/2 h-full flex flex-row items-center lg:justify-center mt-2 lg:mt-0 lg:px-10'>
                            <div className='w-full flex flex-col items-center lg:items-start justify-start'>

                                <h1 className='  font-bold text-[0.9rem] lg:text-[1.1rem] text-primary-hsYellow1' >
                                    Az provider
                                </h1>
                                <h2 className='  font-bold text-[1.3rem] lg:text-[2rem]  ' >
                                    Our Story
                                </h2>
                                <h3 className=' mt-4'>
                                    14 Years of Excellence
                                </h3>
                                <p className={' text-[0.9rem] mt-2'}>
                                    In 2010, we embarked on our journey with a mission to revolutionize marketing through traditional methods. Over the years, we've grown and adapted to the changing landscape of business, culminating in the launch of our website last year. This digital transformation has enabled us to expand our reach and better serve our clients. We are dedicated to continuously improving our platform and services, ensuring that we meet the evolving needs of businesses worldwide. Our commitment to innovation and excellence drives us to provide seamless and efficient supply chain solutions for our valued clients.                                </p>
                                
                                {/*<h3 className=' mt-4'>*/}
                                {/*    Evolution and Growth*/}
                                {/*</h3>*/}
                                {/*<p className={' text-[0.9rem] mt-2'}>*/}
                                {/*    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,*/}
                                {/*</p>*/}

                            </div>
                        </div>
                        <div className='w-full lg:w-1/2 h-full  hidden lg:flex flex-row items-center justify-center mt-8  lg:mt-0 '>
                            <Image src={'/a.png'} alt={'az-rpovider-why-image'} width={1000} height={1000} className={'w-full rounded-xl shadow'}/>
                        </div>

                    </div>

                </div>

                <div className='relative w-full 2xl:w-[96rem] m-auto h-auto  mb-10' >
                    <div className='w-full relative !z-1 h-full flex flex-col lg:flex-row items-center justify-between  px-[3%]'>
                        <div className='w-full lg:w-1/2 h-full   flex flex-row items-center justify-center mt-8  lg:mt-0 lg:hidden'>
                            <Image src={'/a.png'} alt={'meet-our-team-az-rpovider-co'} width={1000} height={1000} className={'w-full rounded-xl shadow'} />

                        </div>
                        <div className='w-full lg:w-1/2 h-full flex flex-row items-center lg:justify-center mt-2 lg:mt-0 lg:px-10'>
                            <div className='w-full flex flex-col items-center lg:items-start justify-start'>

                                <h1 className='  font-bold text-[0.9rem] lg:text-[1.1rem] text-primary-hsYellow1' >
                                    Team
                                </h1>
                                <h2 className='  font-bold text-[1.3rem] lg:text-[2rem]  ' >
                                    Meet Our Team
                                </h2>
                           
                                <p className={' text-[0.9rem] mt-2'}>
                                    At AZ Provider, our small but dedicated team is committed to providing exceptional service and support. Each team member brings a wealth of industry knowledge and a passion for helping your business succeed. We work closely together to ensure a seamless and efficient experience for all our clients. Get to know the friendly faces behind AZ Provider and see how we can assist you in reaching your business goals.
                                </p>
 
                            </div>
                        </div>
                        <div className='w-full lg:w-1/2 h-full  hidden lg:flex flex-row items-center justify-center mt-8  lg:mt-0 '>
                            <Image src={'/a.png'} alt={'az-rpovider-why-image'} width={1000} height={1000} className={'w-full rounded-xl shadow'} />
                        </div>
                    </div>

                </div>

            </div>






        </div>
    );
};

export default AboutUsPage;