import { IPost } from '../interfaces/IPosts';
import React, { useEffect, useState } from 'react';
import Avatar from './avatar';
import Date from './date';
import Link from 'next/link';
import { PictureAsPdf } from '@mui/icons-material';
import router from 'next/router';
import { Button } from '@mui/material';

const PostCard = ({ _id, image, title, createdAt, body, author, page, resource }: IPost) => {
    const mediaType = image?.data.substring(0, 15).includes("video");
    const detailsPage = `my-3 media-resize shadow small`;
    const previewPage = `my-3 media-resize shadow small`;
    return (
        <div className='ml-2 mr-4 post-card pb-4'>
            {image && mediaType &&
                <video
                    src={image?.data}
                    controls
                    className={page !== 'details' ? previewPage : detailsPage}
                />
            }

            {image && !mediaType &&
                <img
                    src={image?.data}
                    className={page !== 'details' ? previewPage : detailsPage}
                />
            }

            {title && <Link href={_id ? `/post/${_id}` : `#`}><a className='title-link mt-3 text-justify'>{title}</a></Link>}
            {createdAt && <Date dateString={createdAt} />}
            {body && <p className={page == 'blog' ? 'text-justify mb-3 mt-3 text-ellipsis' : 'text-justify mb-3 mt-3'}>{body}</p>}
            {page !== 'blog' && resource &&
                <div
                    className='mb-3 flex justify-end'
                >
                    <a
                        className='text-black'
                        href={resource.data}
                        download

                    >
                        <PictureAsPdf color="error" /> Click here to download resource
                    </a>
                </div>}
            {author && <Avatar authorName={author.name} authorImage={author.image} />}
            {page === 'blog' && <Button onClick={(e) => _id ? router.push(`/post/${_id}`) : e.preventDefault()}>Read More</Button>}
        </div>

    )
}

export default PostCard;
