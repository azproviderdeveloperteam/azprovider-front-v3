import React, {useRef} from 'react';
import {useDraggable} from "react-use-draggable-scroll";

const EmployeesList = ({employees} : any) => {

    const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

    const { events } = useDraggable(ref);

    return (
        <div className='w-full'>
            <h3 className='mt-5 font-bold text-[1.1rem] text-primary-dark-b'>
                Employees
            </h3>
            <div {...events} ref={ref}
                 className='w-full flex flex-row items-start justify-start overflow-x-auto no-scrollbar gap-3'>
                {employees?.map((item: any) => (
                    <div
                        key={item.id}
                        className="w-9/12 flex flex-col items-center justify-start  aspect-[0.93]  bg-gray-100 rounded-lg p-4 shadow-md "
                    >
                        <p className="text-lg font-bold">
                            <span className="font-normal">{item.first_name} {item.last_name}</span>
                        </p>
                        <p className="text-lg font-semibold">
                            <span className="font-normal opacity-50">({item.position})</span>
                        </p>
                        <div className="w-full flex flex-row items-start justify-between gap-2">
                            <div className={'w-1/3 text-[0.7rem]  '}>
                                Department:
                            </div>
                            <div className="w-2/3 text-[0.7rem] break-words">{item.department}</div>
                        </div>

                        <div className="w-full flex flex-row items-start justify-between gap-2">
                            <div className={'w-1/3 text-[0.7rem]  '}>
                                Email:
                            </div>
                            <div className="w-2/3 text-[0.7rem] break-words">{item.email}</div>
                        </div>


                        <div className="w-full flex flex-row items-start justify-between gap-2">
                            <div className={'w-1/3 text-[0.7rem] '}>
                                Mobile:
                            </div>
                            <div className="w-2/3 text-[0.7rem] break-words">{item.mobile}</div>
                        </div>

                        <p className="text-[0.9rem] w-full text-left mt-2">
                            <span className="font-normal">{item.description}</span>
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default EmployeesList;