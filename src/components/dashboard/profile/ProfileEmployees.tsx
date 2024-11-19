'use client'
import React from 'react';
import AddEditEmployeeForm from "@/components/dashboard/profile/AddEditEmployeeForm";

const ProfileEmployees = ({employeesData} : any) => {

    return (
        <div className='w-full bg-[#F8F8F8] p-3 rounded-[1rem] p-8 mt-5'>

            <div className="container w-full ">
                <h1 className="text-2xl font-bold mb-6 w-full ">Employees</h1>
                <div className="space-y-4">
                    {employeesData?.data?.map((item: any) => (
                        <div
                            key={item.id}
                            className="w-full  border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow  "
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
                </div>
            </div>
            <h1 className="text-2xl font-bold mt-6">Add Employee</h1>

            <AddEditEmployeeForm modal={false}/>
        </div>
    );
};

export default ProfileEmployees;