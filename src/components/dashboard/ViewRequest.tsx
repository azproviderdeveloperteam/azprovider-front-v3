import React from 'react';

const ViewRequest = ({req} : any) => {
    return (
        <div className='m-auto w-11/12 my-2 mx-1 bg-secondary-yellow p-2 rounded-[1rem]'>
            <table className='w-full m-2'>
                <thead>
                <tr className='w-full'>
                    <td  className='w-1/2'>
                        <span className='font-bold'>
                        Requested form
                        </span>
                    </td>
                    <td  className='w-1/2'></td>
                </tr>

                </thead>
                <tbody  className='w-full'>
                <tr  className='w-full'>
                    <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                User :
                            </span>
                    </td>
                    <td  className='w-1/2 pt-6'>{req?.creator_user?.email + " , " + req?.creator_user?.mobile}</td>
                </tr>

                    <tr  className='w-full'>
                        <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                Quantity :
                            </span>
                        </td>
                        <td  className='w-1/2 pt-6'>{req?.quantity}</td>
                    </tr>

                    <tr  className='w-full'>
                        <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                Location :
                            </span>
                        </td>
                        <td  className='w-1/2 pt-6'>{req?.location}</td>
                    </tr>


                    <tr  className='w-full'>
                        <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                Price :
                            </span>
                        </td>
                        <td  className='w-1/2 pt-6'>{req?.price}</td>
                    </tr>

                    <tr  className='w-full'>
                        <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                Payment :
                            </span>
                        </td>
                        <td  className='w-1/2 pt-6'>{req?.payment}</td>
                    </tr>


                    <tr  className='w-full'>
                        <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                From Date :
                            </span>
                        </td>
                        <td  className='w-1/2 pt-6'>{req?.date_from}</td>
                    </tr>


                    <tr  className='w-full'>
                        <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                To Date :
                            </span>
                        </td>
                        <td  className='w-1/2 pt-6'>{req?.date_to}</td>
                    </tr>

                    <tr  className='w-full'>
                        <td  className='w-1/2 pt-6'>
                            <span className='text-[#727272]'>
                                Description :
                            </span>
                        </td>
                        <td  className='w-1/2 pt-6'>{req?.description}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewRequest;