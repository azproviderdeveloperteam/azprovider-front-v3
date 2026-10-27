// src/utils/pdfGenerator.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportCatalogToPDF = async (productsCount: number): Promise<boolean> => {
    const element = document.getElementById('catalog-pdf-template');
    if (!element) return false;

    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pages = element.querySelectorAll('.pdf-page');

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;

            const canvas = await html2canvas(page, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                imageTimeout: 3000 // اگر لود تصویر هر محصول بیش از ۳ ثانیه طول کشید، آن را رد کن تا لودر قفل نکند
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            if (i > 0) {
                pdf.addPage();
            }

            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        }

        pdf.save(`AZProvider-Catalog-${new Date().toISOString().slice(0, 10)}.pdf`);
        return true;
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        return false;
    }
};