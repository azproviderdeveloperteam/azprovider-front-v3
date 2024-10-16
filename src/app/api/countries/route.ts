import { NextResponse } from 'next/server';
import countriesData from '@/services/countries.json';

export async function GET() {
    const countries = countriesData.map((country) => ({
        value: country.id,
        label: country.name,
    }));

    return NextResponse.json(countries);
}
