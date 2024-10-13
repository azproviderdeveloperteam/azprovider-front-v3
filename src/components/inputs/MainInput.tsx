'use client';

import React from 'react';

const MainInput = ({ textarea, label, type, placeholder, onBlur, name, value, onChange, icon, error, register, borderNone, disabled, otherClass, endContent }: any) => {
    return (
        <div className='w-full flex flex-col items-start justify-start'>
            <div className="w-full flex items-center">
                {
                    textarea ?
                        <textarea
                            rows="4"
                            {...register(name)}
                            className={`${borderNone ? '' : 'border border-1 border-slate-700'} w-full resize-none flex px-3 py-2 flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1] ${otherClass ? otherClass : ''}`}
                            placeholder={placeholder}
                        />
                        :
                        <input
                            type={type}
                            {...register(name)}
                            className={`${borderNone ? '' : 'border border-1 border-slate-700'} w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1] ${otherClass ? otherClass : ''}`}
                            placeholder={placeholder}
                        />
                }

                {/* Add end content here */}
                {endContent && <div className="ml-2">{endContent}</div>}
            </div>

            {
                error &&
                <div className='w-full text-[0.8rem] text-secondary-red px-4 mt-2'>
                    {error}
                </div>
            }
        </div>
    );
};

export default MainInput;
