import { IPost } from '../../../src/interfaces/IPosts';
import React, { useEffect, useState } from 'react';
import Avatar from './avatar';
import Date from './date';
import Link from 'next/link';

const PostCard = ({ _id, image, title, createdAt, body, authorName, authorImage, page }: IPost) => {
    const mediaType = image?.data.substring(0, 15).includes("video");
    const detailsPage = `my-3 media-resize shadow small`;
    return (
        <div className='ml-2 mr-4 post-card pb-4'>
            {image && mediaType &&
                <video
                    src={image?.data}
                    controls
                    width={700}
                    height={300}
                    className='my-3 shadow-small'
                />
            }

            {image && !mediaType &&
                <img
                    src={image?.data}
                    width={700}
                    height={300}
                    className='my-3 shadow-small'
                />
            }

            {title && <Link href={_id ? `/post/${_id}` : `#`}><a className='title-link mt-3 text-justify'>{title}</a></Link>}
            {createdAt && <Date dateString={createdAt} />}
            {body && <p className='text-justify mt-3'>{body}</p>}
            {authorName && <Avatar authorName={authorName} authorImage={authorImage} />}
        </div>
    )
}

export default PostCard;
