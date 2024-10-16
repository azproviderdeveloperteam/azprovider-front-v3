import { NextResponse } from 'next/server';
import countriesData from '@/services/countries+cities.json';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const countryName = searchParams.get('countryName');
    const pageParam = searchParams.get('page') || '1';
    const limitParam = searchParams.get('limit') || '2000';


     // تبدیل page و limit به عدد
    const page = parseInt(pageParam);
    const limit = parseInt(limitParam);

    if (!countryName) {
        return NextResponse.json({ error: 'Country name is required' }, { status: 400 });
    }

    const country = countriesData.find((c) => c.id == countryName);

    if (!country) {
        return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }


    const start = (page - 1) * limit;
    const end = start + limit;

    const cities = country.cities.slice(start, end).map((city) => ({
        value: city.id,
        label: city.name,
    }));

    return NextResponse.json({
        cities,
        currentPage: page,
        totalCities: country.cities.length,
        totalPages: Math.ceil(country.cities.length / limit),
    });
}
