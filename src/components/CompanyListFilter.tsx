"use client";

import React from "react";
import Link from "next/link";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

const CompanyListFilter = ({ companies, sort_by, sort_type }: any) => {
    const pathname = companies ? "/companies" : "/products";

    const fields = [
        { label: "Joined Date", value: "joined_date" },
        { label: "Updated Date", value: "updated_date" },
        { label: "Product Date", value: "product_date" },
        { label: "Product Count", value: "product_count" },
        { label: "Service Date", value: "service_date" },
        { label: "Service Count", value: "service_count" },
        { label: "On Sale Date", value: "on_sale_date" },
        { label: "On Sale Count", value: "on_sale_count" },
        { label: "Hot Deal Date", value: "hot_deal_date" },
        { label: "Hot Deal Count", value: "hot_deal_count" },
    ];

    const sortTypeOptions = [
        { label: "Ascending (ASC ↑)", value: "asc" },
        { label: "Descending (DESC ↓)", value: "desc" },
    ];

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-start px-2 mb-6 gap-4">

            {/* SORT BY DROPDOWN */}
            <div className="flex flex-row items-center gap-3">
                <span className="text-gray-500 text-sm">Sort By:</span>

                <Menu placement="bottom-start">
                    <MenuHandler>
                        <Button
                            variant="outlined"
                            className="normal-case border-gray-300 text-gray-700"
                            size="sm"
                        >
                            {fields.find((f) => f.value === sort_by)?.label || "Choose"}
                        </Button>
                    </MenuHandler>
                    <MenuList className="max-h-80 overflow-auto">
                        {fields.map((item, index) => (
                            <Link
                                key={index}
                                href={{
                                    pathname,
                                    query: {
                                        sort_by: item.value,
                                        sort_type,
                                    },
                                }}
                            >
                                <MenuItem
                                    className={`${
                                        sort_by === item.value
                                            ? "bg-blue-50 text-blue-600"
                                            : ""
                                    }`}
                                >
                                    {item.label}
                                </MenuItem>
                            </Link>
                        ))}
                    </MenuList>
                </Menu>
            </div>

            {/* SORT TYPE DROPDOWN */}
            <div className="flex flex-row items-center gap-3">
                <span className="text-gray-500 text-sm">Order:</span>

                <Menu placement="bottom-start">
                    <MenuHandler>
                        <Button
                            variant="outlined"
                            className="normal-case border-gray-300 text-gray-700"
                            size="sm"
                        >
                            {sortTypeOptions.find((o) => o.value === sort_type)?.label ||
                                "Select"}
                        </Button>
                    </MenuHandler>
                    <MenuList>
                        {sortTypeOptions.map((item, index) => (
                            <Link
                                key={index}
                                href={{
                                    pathname,
                                    query: {
                                        sort_by,
                                        sort_type: item.value,
                                    },
                                }}
                            >
                                <MenuItem
                                    className={`${
                                        sort_type === item.value
                                            ? "bg-blue-50 text-blue-600"
                                            : ""
                                    }`}
                                >
                                    {item.label}
                                </MenuItem>
                            </Link>
                        ))}
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default CompanyListFilter;