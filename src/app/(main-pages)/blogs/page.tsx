'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllBlogs } from '@/services/profileServices';
import FullPageLoading from "@/components/loaders/FullPageLoading";

interface Blog {
    id: number;
    image: string;
    categories: { id: number; title: string }[];
    tags: { id: number; title: string }[];
    title: string;
    short_desc: string;
}

const BlogPage = () => {
    const { data  , isLoading, error } = useQuery({
        queryKey: ["getAllBlogs"],
        queryFn: () => getAllBlogs(),
    });

    if (isLoading) return  <FullPageLoading/>
    if (error) return <div className="text-center p-6 mt-24">Error loading blogs</div>;

    return (
        <div className="container mx-auto p-6 my-12">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary-dark-g">Blogs</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.data?.map((blog : Blog) => (
                    <div
                        key={blog?.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <img src={`https://azprovider.com/${blog?.image}`} alt={blog?.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {blog?.categories?.map((category) => (
                                    <span
                                        key={category?.id}
                                        className="bg-primary-green-lg100 text-primary-dark-g text-xs font-semibold px-2.5 py-0.5 rounded"
                                    >
                                        {category?.title}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-xl font-semibold text-primary-dark-g mb-2">{blog?.title}</h2>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog?.short_desc}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {blog?.tags.map((tag) => (
                                    <span key={tag?.id} className="text-xs text-gray-500">
                                        {tag?.title}
                                      </span>
                                ))}
                            </div>
                            <a
                                href="#"
                                className="text-primary-green-lg400 hover:underline text-sm font-medium"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;