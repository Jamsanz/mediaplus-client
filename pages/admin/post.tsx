import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { Paper, TextField } from '@mui/material';
import { IPost } from '../../src/interfaces/IPosts';
import { GetStaticProps } from 'next';
import Layout from './layout';
import axios from 'axios';
import PostCard from './components/postCard';
import { Button } from 'react-bootstrap';
import toastr, { http } from 'utils/utils';
import { useSelector } from 'react-redux';
import { postSelector } from '@redux/slices/post';
import router from 'next/router';
import IAuthor from '../../src/interfaces/IAuthor';

const Post = ({ dataa }: { dataa: string }) => {
    const [data, setData] = useState<IPost>();
    const [updateNotPost, setUpdateNotPost] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const inputHelperText = `Select a media of type .mp4, .avi, .mkv, jpg, png etc`;

    const post = useSelector(postSelector);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        let author: IAuthor;
        if (name === 'author') {
            author = { ...data?.author, name: value };
            setData({ ...data, author });
            return;
        }
        setData({ ...data, [name]: value } as IPost);
        console.log(data);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        const { files, name } = e.target;
        const reader = new FileReader();
        reader.onload = ((e: ProgressEvent<FileReader>) => {
            if (name === 'image') {
                files && setData({ ...data, image: { data: e.target?.result as string, fileName: files[0].name } } as IPost)

            } else if (name === 'authorImage') {
                files && setData({ ...data, author: { ...data?.author, image: e.target?.result } } as IPost);
            } else {
                files && setData({ ...data, resource: { name: files[0].name, data: e.target?.result } } as IPost);
            }
        });

        files && reader.readAsDataURL(files[0] as Blob);

    };

    const handleDelete = (e: MouseEvent) => {
        e.preventDefault();
        setData({ ...data, image: null } as IPost);
    }

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const { data: response, status } = await http.post('/post', data);
        if (status === 201) {
            toastr.success(`${(response as any).data.title} successfully created`);
            setData(undefined);
            inputRef.current.click();
            return;
        }

        if (status === 413) {
            toastr.error('Video too large');
            return;
        }

        toastr.error(`Something went wrong`);
        setData(undefined);
        inputRef.current.click();
    };

    const handleUpdate = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const { data: response, status } = await http.put(`/post/${post._id}`, data);
        if (status === 200) {
            toastr.success(`${data!.title} successfully updated`);
            return;
        }

        if (status === 413) {
            toastr.error('Video too large');
            return;
        }

    };


    useEffect(() => {
        setData(post);
        if (!!post._id) {
            setUpdateNotPost(true);
        }
    }, [post]);
    return (
        <Layout>
            <Paper>
                <div className="post-flex">
                    <div className="post-card">
                        <form className="post-card-form" onSubmit={updateNotPost ? handleUpdate : handleSubmit}>
                            <TextField
                                name='image'
                                type="file"
                                id='video'
                                onChange={handleFileUpload}
                                helperText={<span>{inputHelperText}</span>}
                                placeholder='Select a video'
                            />

                            {data?.image && <button className='btn-delete-banner' onClick={handleDelete}>Delete Media</button>}
                            <TextField
                                name="title"
                                type="text"
                                onChange={handleChange}
                                label='Post Title'
                                value={data?.title}
                            />
                            {!!!post._id && <TextField
                                name='createdAt'
                                type="datetime-local"
                                onChange={handleChange}
                                helperText={<span>Select the publishing date and time</span>}
                                value={data?.createdAt}
                            />}
                            <TextField
                                name="body"
                                multiline
                                rows={6}
                                onChange={handleChange}
                                label='Post Content'
                                value={data?.body}
                            />
                            <TextField
                                name="resource"
                                type='file'
                                onChange={handleFileUpload}
                                helperText={<span>Select a resource (pdf, docx) etc</span>}
                            />
                            <div style={{ display: 'flex' }}>
                                <TextField
                                    name="author"
                                    type='text'
                                    onChange={handleChange}
                                    label={`Author`}
                                    helperText={<span>Author's Name</span>}
                                    value={data?.author?.name}
                                />

                                <TextField
                                    name="authorImage"
                                    type='file'
                                    className='ml-auto'
                                    onChange={handleFileUpload}
                                    helperText={<span>Select author's image</span>}
                                />
                            </div>
                            <Button type='submit'>
                                {!!post._id ? 'Update' : 'Post'}
                            </Button>
                            {!!!post._id &&
                                <Button
                                    type='reset'
                                    variant='danger'
                                    ref={inputRef}
                                    onClick={() => setData({ body: '', title: '', author: { name: '' } })}
                                >
                                    Reset
                                </Button>
                            }
                        </form>
                    </div>
                    <PostCard {...data} page="preview" />
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
