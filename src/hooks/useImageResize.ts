import { useState } from 'react';
import heic2any from 'heic2any';

interface UseImageResizeOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
}

const useImageResize = (options: UseImageResizeOptions = {}) => {
    const [resizedImage, setResizedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { maxWidth = 500, maxHeight = 500, quality = 0.9 } = options;

    const resizeImage = async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            let imageFile = file;

            // Check if the file is a HEIC image and convert it
            if (file.type === 'image/heic' || file.type === 'image/heif') {
                const convertedBlob = await heic2any({ blob: file, toType: 'image/png' });
                imageFile = new File([convertedBlob as Blob], file.name.replace(/\.[^/.]+$/, '.png'), { type: 'image/png' });
            }

            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions maintaining the aspect ratio
                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.floor((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.floor((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    // Resize the image to fit within the specified max width/height
                    canvas.width = width;
                    canvas.height = height;
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Convert the resized image to a data URL
                    const resizedImageUrl = canvas.toDataURL('image/jpeg', quality);
                    setResizedImage(resizedImageUrl);
                    setLoading(false);
                };
            };

            reader.onerror = () => {
                setError('Failed to read the image file.');
                setLoading(false);
            };

            reader.readAsDataURL(imageFile);
        } catch (err) {
            setError('Failed to convert HEIC image.');
            setLoading(false);
        }
    };

    return {
        resizedImage,
        resizeImage,
        loading,
        error,
    };
};

export default useImageResize;