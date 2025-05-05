'use client';
import React from 'react';
import { Button, IconButton } from "@material-tailwind/react";
import { useRouter, useSearchParams } from 'next/navigation';

// تعریف نوع برای props
interface AzPaginationProps {
    count: number;
    limit: number;
    offset: number;
}

const AzPagination: React.FC<AzPaginationProps> = ({ count, limit, offset }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages: number = Math.ceil(count / limit);
    const currentPage: number = Math.floor(offset / limit) + 1;

    // نوع‌بندی برای props دکمه‌ها
    const getItemProps = (index: number) => ({
        variant: currentPage === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            const newOffset = (index - 1) * limit;
            // تبدیل searchParams به URLSearchParams
            const params = new URLSearchParams(Array.from(searchParams.entries()));
            params.set('offset', newOffset.toString());
            router.push(`?${params.toString()}`);
        },
    } as const);

    const next = (): void => {
        if (currentPage === totalPages) return;
        const newOffset = offset + limit;
        // تبدیل searchParams به URLSearchParams
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set('offset', newOffset.toString());
        router.push(`?${params.toString()}`);
    };

    const prev = (): void => {
        if (currentPage === 1) return;
        const newOffset = offset - limit;
        // تبدیل searchParams به URLSearchParams
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set('offset', newOffset.toString());
        router.push(`?${params.toString()}`);
    };

    // تولید دکمه‌های صفحه به‌صورت پویا
    const renderPageButtons = (): JSX.Element[] => {
        const buttons: JSX.Element[] = [];
        const maxButtons: number = 5; // حداکثر تعداد دکمه‌های نمایش‌داده‌شده
        let startPage: number = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage: number = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <IconButton key={i} {...getItemProps(i)}>
                    {i}
                </IconButton>
            );
        }

        return buttons;
    };

    return (
        <div className="flex items-center gap-4 justify-center">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={currentPage === 1}
            >
                {'<'}
            </Button>
            <div className="flex items-center gap-2">{renderPageButtons()}</div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={currentPage === totalPages}
            >
                {'>'}
            </Button>
        </div>
    );
};

export default AzPagination;