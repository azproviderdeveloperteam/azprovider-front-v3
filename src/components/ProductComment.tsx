'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import MainInput from '@/components/inputs/MainInput';
import RegisterBtn from '@/components/Buttons/RegisterBtn';
import toast from 'react-hot-toast';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProductComments, sendComment} from "@/services/productSevices";

const ProductComment = ({ id  }:{id : string  }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(1);

    const schema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        rating: Yup.number()
            .required('Rating is required'),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        resetField
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            rating: 0,
        },
    });


    const {data : getProductCommentsData, isPending : getProductCommentsPending, error : getProductCommentsError} = useQuery({
        queryKey: [`getProductComments_${id}`],
        queryFn: ()=>getProductComments(id),
        retry:false,
    })

    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : sendComment
    })

    const queryClient = useQueryClient()

    const handleRefetch = () =>{
        queryClient.invalidateQueries({ queryKey: [`getProductComments_${id}`] });
    }
    const onSubmit = async (data  : any) => {
        const payload = {title : data.title , description : data.description , rate : rating};
        if(!user?.login){
            toast.error('Please login to send a comment');
            return;
        }
        try {
            const res = await mutateAsync({payload , id :`${id}` } );
            if(res?.data?.results) {
                toast.success('Comment sent successfully');
                resetField('title')
                resetField('description')
                resetField('rating')
                setRating(1)
                handleRefetch()
            }
        } catch (err) {
            toast.error('Error sending comment');
        }
    };

    return (
        <div className="w-full mt-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-[#F4F4FA] p-5 flex flex-col items-start justify-start gap-4 rounded-t-2xl"
            >

                {
                    user?.login &&
                    <div className='flex flex-row items-center justify-start gap-2'>
                        <img src={user?.userData?.logo} className='w-16 h-16 rounded-l-full rounded-br-full rounded-tr-none'/>
                        <div className='text-[#63637B] font-bold text-[1.1rem]'>
                            {`${user?.userData?.first_name} ${user?.userData?.last_name}`}
                        </div>
                    </div>
                }
                <div className="w-full">

                    <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => {
                                    setRating(star);
                                }}
                                className={`text-2xl ${
                                    star <= rating ? 'text-yellow-800' : 'text-gray-300'
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <input
                        type="hidden"
                        {...register('rating')}
                        value={rating}
                    />
                    {errors.rating && (
                        <p className="text-red-500 text-xs">{errors.rating.message}</p>
                    )}
                </div>

                {/* عنوان */}
                <div className="w-full">

                    <MainInput
                        register={register}
                        label={'Title'}
                        error={errors?.title?.message}
                        name={'title'}
                        type={'text'}
                        placeholder={'title...'}
                        otherClass={'!max-w-[30rem] !bg-white !border-none !rounded-t-xl !rounded-b-none'}
                    />
                </div>

                {/* توضیحات */}
                <div className="w-full">
                    <MainInput
                        register={register}
                        label={'Description'}
                        error={errors?.description?.message}
                        name={'description'}
                        type={'text'}
                        placeholder={'description...'}
                        textarea={true}
                        className="line-clamp-3"
                        otherClass={'!max-w-[60rem] !bg-white !border-none !rounded-t-xl !rounded-b-none'}

                    />
                </div>


                {/* دکمه سابمیت */}
                <RegisterBtn
                    loading={isSubmitting}
                    otherClass="w-full lg:w-[12rem] mt-4"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Submit feedback
                </RegisterBtn>
            </form>


            <div className='mt-8 text-black font-bold text-[1.5rem] border-b-2 border-black/10 pb-4'>
                {`${getProductCommentsData?.data?.count} comments`}
            </div>

            {/* لیست کامنت‌ها */}
            <div className="w-full bg-white p-5 rounded-b-2xl">
                {getProductCommentsPending ? (
                    <div className="text-center text-gray-600">loading</div>
                ) : getProductCommentsError ? (
                    <div className="text-center text-red-500">error...</div>
                ) : getProductCommentsData?.data?.results?.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {getProductCommentsData?.data?.results.map((comment: any) => (
                            <div key={comment?.id} className="flex flex-col gap-2 border-b pb-4 last:border-b-0">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={comment?.user.logo}
                                        alt={`${comment?.user.first_name} ${comment?.user.last_name}`}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="text-[1.1rem] font-bold text-[#63637B]">
                                            {`${comment?.user.first_name} ${comment?.user.last_name}`}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(comment?.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star : number) => (
                                            <span
                                                key={star}
                                                className={`text-xl ${star <= comment?.rate ? 'text-yellow-800' : 'text-gray-300'}`}
                                            >
                                          ★
                                        </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-[1.1rem] font-semibold">{comment?.title}</div>
                                <div className="text-gray-700 line-clamp-3">{comment?.description}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600"></div>
                )}
            </div>
        </div>
    );
};

export default ProductComment;