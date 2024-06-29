import React from 'react';
import FaqItem from "@/components/FaqItem";

const FaqPage = () => {
    const items =[
        {
            title:"1. What is an HS Code?" ,
            desc: 'HS Code (Harmonized System Code) is an internationally standardized system of names and numbers used to classify traded products. It helps in identifying and categorizing goods for customs and trade purposes.'
        },
        {
            title:"2. How do I register and log in?" ,
            desc: 'To register, click on the "Register" button on our homepage and fill in the required information. After registration, you can log in using your email and password or you can enter the one-time code you wish to log in that way. Registration is free and provides full access to all our platform\'s features.'
        },
        {
            title:"3. How do I add a Pre-Invoice, On Sale, or Hot Deal item?" ,
            desc: 'To add a Pre-Invoice, On Sale, or Hot Deal item, log in to your account and navigate to the respective section in your dashboard. Follow the prompts to list your product, ensuring you provide all necessary details such as HS Codes, pricing, and descriptions.\n' +
                'If there are tabs you do not think are necessary leave them or just write "N". '
        },
        {
            title:"4. How can a company or provider add a product or service?" ,
            desc: 'Companies or providers can add products or services by logging into their account, navigating to the "Add Product/Service" section, and following the instructions to upload product details, images, and HS Codes. Ensure all information is accurate to attract potential buyers.'
        },
        {
            title:"5. How can a person make a complaint or report a bad quality product/service?" ,
            desc: 'If you encounter a bad quality product or service, first, contact the provider and if they avoid a decent explanation, you can file a complaint through our "Report Issue" feature in your account dashboard. Provide detailed information about the issue, and our team will investigate and take appropriate action to resolve the matter.\n' +
                'You can also go to the "Contact Us" part and get in touch directly.\n'
        },
        {
            title:"6. What if I can't find my question here?" ,
            desc: 'If your question isn\'t covered in the FAQs, please contact our customer support team through the "Contact Us" page on our website. We\'re here to help!'
        },


    ]
    return (
        <div className='w-full py-28 '>
            <div className='relative w-full   m-auto h-auto pb-[10rem]  bg-center bg-no-repeat bg-cover py-10 px-[3%]' >

                <h1 className='text-center font-bold text-[2rem]'>
                    Az Provider FAQs
                </h1>
                <div className='w-full m-auto max-w-[52.5rem]'>
                    <div className='w-full  flex flex-col items-center justify-center mt-10'>
                        {
                            items.map((item : {title:string , desc : string} , index:number)=>{
                                return(
                                    <FaqItem key={index+1} title={item.title} desc={item.desc} index={index} />
                                )
                            })
                        }
                    </div>
                </div>


            </div>
        </div>
    );
};

export default FaqPage;