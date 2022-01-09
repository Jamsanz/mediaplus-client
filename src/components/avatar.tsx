import Image from 'next/image';

const Avatar = ({ authorName, authorImage }: { authorName?: string; authorImage?: string }) => {
    return (
        <div className="flex items-center">
            <div className="author-avatar mr-4">
                {authorImage && <Image
                    src={authorImage}
                    layout="responsive"
                    height="3rem"
                    width="3rem"
                    className="rounded-full"
                    alt={authorName}
                />}
            </div>
            {authorName && <div className="text-xl font-bold">{authorName}</div>}
        </div>
    )
}

export default Avatar;
