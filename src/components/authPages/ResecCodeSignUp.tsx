'use client'
import React from "react";
import useCountdownTime from "@/hooks/useCountDown";
import BlueBtn from "@/components/Buttons/BlueBtn";

const ResendCodeSignUp = ({resendCode , isPending} : any) => {
    const {seconds , timer , reset} = useCountdownTime(121);

    const resend = () =>{
        resendCode()
        reset(123)
    }
    return (
        <div className='w-full text-pxBrown100 text-center flex flex-row items-center justify-center'>
            {
                seconds === 0 || isPending ?
                    <BlueBtn color={'transparentWithoutBorder'} onClick={resend} loading={isPending}>
                        {'resend'}
                    </BlueBtn>
                    :
                    `${'resend'} (${timer})`
            }

        </div>
    );
};

export default ResendCodeSignUp;