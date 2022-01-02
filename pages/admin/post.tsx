import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { Paper, TextField } from '@mui/material';
import { IPost } from '../../src/interfaces/IPosts';
import { GetStaticProps } from 'next';
import Layout from './layout';
import axios from 'axios';
import PostCard from './components/postCard';
import { Button } from 'react-bootstrap';
import toastr, { http } from 'utils/utils';

const Post = ({ dataa }: { dataa: string }) => {
    const [data, setData] = useState<IPost>();
    const inputRef = useRef<any>(null);
    const inputHelperText = `Select a media of type .mp4, .avi, .mkv etc`

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value } as IPost);
    };

    const handleImgUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        const { files, name } = e.target;
        const reader = new FileReader();
        reader.onload = ((e: ProgressEvent<FileReader>) => {
            if (name === 'image') {
                files && setData({ ...data, [name]: { data: e.target?.result as string, fileName: files[0].name } } as IPost)

            } else {
                files && setData({ ...data, [name]: e.target?.result } as IPost);
            }
        });

        files && reader.readAsDataURL(files[0] as Blob);

    };

    const handleDelete = (e: MouseEvent) => {
        e.preventDefault();
        setData({ ...data, image: null } as IPost);
        // console.log(inputRef?.current);
    }

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const { data: response, status } = await http.post('/post', data);
        if (status === 201) {
            toastr.success(`${(response as any).data.title} successfully created`);
            setData({});
            inputRef.current.click();
            return;
        }

        if (status === 413) {
            toastr.error('Video too large');
            return;
        }

        toastr.error(`Something went wrong`);
        setData({});
        inputRef.current.click();
    };

    useEffect(() => {
        console.log(dataa);
    }, []);

    return (
        <Layout>
            <Paper>
                <div className="post-flex">
                    <div className="post-card">
                        <form className="post-card-form" onSubmit={handleSubmit}>
                            <TextField
                                name='image'
                                type="file"
                                id='video'
                                onChange={handleImgUpload}
                                helperText={<span>{inputHelperText}</span>}
                                placeholder='Select a video'
                            />

                            {data?.image && <button className='btn-delete-banner' onClick={handleDelete}>Delete Media</button>}
                            <TextField
                                name="title"
                                type="text"
                                onChange={handleChange}
                                label='Post Title'
                            />
                            <TextField
                                name='createdAt'
                                type="datetime-local"
                                onChange={handleChange}
                                helperText={<span>Select the publishing date and time</span>}
                            />
                            <TextField
                                name="body"
                                multiline
                                rows={6}
                                onChange={handleChange}
                                label='Post Content'
                            />
                            <div style={{ display: 'flex' }}>
                                <TextField
                                    name="authorName"
                                    type='text'
                                    onChange={handleChange}
                                    label={`Author`}
                                    helperText={<span>Author's Name</span>}
                                />

                                <TextField
                                    name="authorImage"
                                    type='file'
                                    className='ml-auto'
                                    onChange={handleImgUpload}
                                    helperText={<span>Select author's image</span>}
                                />
                            </div>
                            <Button type='submit'> Post </Button>
                            <Button type='reset' variant='danger' ref={inputRef}> Reset </Button>
                        </form>
                    </div>
                    <PostCard {...data} />
                </div>
            </Paper>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            dataa: 'hello'
        }
    }
}

export default Post;
