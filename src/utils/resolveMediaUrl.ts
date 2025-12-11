const isAbsoluteUrl = (url?: string | null) => {
    if (!url) return false;
    return /^(https?:)?\/\//i.test(url);
};

export const resolveMediaUrl = (url?: string | null) => {
    if (!url) return undefined;
    return isAbsoluteUrl(url) ? url : `${process.env.MEDIA_URL}${url}`;
};

export default resolveMediaUrl;
