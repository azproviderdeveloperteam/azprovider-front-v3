const fs = require('fs');
const path = require('path');

// لیست تمام فایل‌هایی که در جستجوی قبلی مشکل داشتند
const filesToFix = [
    'src/components/Cards/ProductCard.tsx',
    'src/components/companyDetails/CompanyDetailsCertificates.tsx',
    'src/components/companyDetails/CompanyDetailsMembership.tsx',
    'src/components/dashboard/profile/ProfileAll.tsx',
    'src/components/dashboard/profile/ProfileCertificates.tsx',
    'src/components/dashboard/profile/ProfileMembership.tsx',
    'src/components/dashboard/profile/ProfileProjects.tsx'
];

filesToFix.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);

    if (!fs.existsSync(fullPath)) {
        console.log(`❌ فایل یافت نشد: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let originalContent = content;

    // ۱. اصلاح اختصاصی و منظم برای فایل ProductCard.tsx (رفع مشکل خطوط چندخطی)
    if (filePath.includes('ProductCard.tsx')) {
        const oldPattern = /item\?.media_files\?\.\[0\]\?.image\?.includes\("api.azprovider.com"\)\s*\|\|\s*item\?.media_files\?\.\[0\]\?.image\?.includes\("api.azprovider.ir"\)\s*\?\s*""\s*:\s*process.env.MEDIA_URL/g;
        content = content.replace(oldPattern, 'item?.media_files?.[0]?.image?.startsWith("http") ? "" : process.env.MEDIA_URL');
    }

    // ۲. اصلاح سراسری الگوهای ترکیب MEDIA_URL در بقیه فایل‌ها
    // این رگکس الگوهایی مثل ${process.env.MEDIA_URL}${imageSrc} را شناسایی کرده و به صورت شرطی اصلاح می‌کند
    const genericPattern = /\$\{process\.env\.MEDIA_URL\}\$\{([^}]+)\}/g;
    content = content.replace(genericPattern, '${($1)?.startsWith("http") ? "" : process.env.MEDIA_URL}${ $1 }');

    if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ با موفقیت اصلاح شد: ${filePath}`);
    } else {
        console.log(`ℹ️ نیازی به اصلاح نداشت یا از قبل اصلاح شده بود: ${filePath}`);
    }
});

console.log('--- عملیات اصلاح خودکار پایان یافت ---');