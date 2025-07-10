// This is for generating the static webpage without runtime envorinment on server.
//  Image component from next.js doesnt support that so we make a custom loader to resolve the image paths
interface ImageLoaderProps {
    src: string;
    width: number;
    quality?: number;
}

export default function imageLoader({src, width, quality}: ImageLoaderProps) {
    return `${src}?w=${width}&q=${quality || 75}`
}