/* eslint-disable no-extra-boolean-cast */
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Paper, TextField } from "@mui/material";
import { IPost } from "../../src/interfaces/IPosts";
import { GetStaticProps } from "next";
import Layout from "../../src/components/adminLayout";
import PostCard from "../../src/components/postCard";
import { Button, Spinner } from "react-bootstrap";
import toastr, { http } from "utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addPost, postSelector } from "@redux/slices/post";
import IAuthor from "../../src/interfaces/IAuthor";
import axios, { isAxiosError } from "axios";
import Editor from "@components/Editor/editor";

const Post = ({ dataa }: { dataa: string }) => {
  const [data, setData] = useState<IPost>();
  const [updateNotPost, setUpdateNotPost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const inputHelperText = `Select a media of type .mp4, .avi, .mkv, jpg, png etc`;

  const dispatch = useDispatch();
  const post = useSelector(postSelector);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    let author: IAuthor;
    if (name === "author") {
      author = { ...data?.author, name: value };
      setData({ ...data, author });
      return;
    }
    setData({ ...data, [name]: value } as IPost);
    console.log(data);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files, name } = e.target;
    const file = files && files[0];
    const formData = new FormData();
    setFileLoading(true);
    formData.append("file", file!);
    formData.append("upload_preset", process.env.UPLOAD_PRESET!);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
        formData
      )
      .then((res: any) => {
        if (name === "image") {
          files &&
            setData({
              ...data,
              image: {
                data: res.data.secure_url,
                type: file?.type,
                fileName: file?.name,
              },
            } as IPost);
        } else if (name === "authorImage") {
          files &&
            setData({
              ...data,
              author: { ...data?.author, image: res.data.secure_url },
            } as IPost);
        } else {
          files &&
            setData({
              ...data,
              resource: { name: file?.name, data: res.data.secure_url },
            } as IPost);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err);
      })
      .finally(() => {
        setFileLoading(false);
      });
  };

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    setData({ ...data, image: null } as IPost);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!data?.title || !data?.author?.name || !data?.body) {
      toastr.error("Please fill the title, description and author name");
      return;
    }

    setLoading(true);
    try {
      const { data: response, status } = await http.post("/post", data);
      if (status === 201) {
        toastr.success(`${(response as any).data.title} successfully created`);
        inputRef.current.click();
        setData({});
        return;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 413) {
          toastr.error("Video too large");
          setLoading(false);
        } else {
          toastr.error(error.response?.data);
        }
      }
    } finally {
      setLoading(false);
    }

  };

  const handleUpdate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const { data: response, status } = await http.put(
      `/post/${post._id}`,
      data
    );
    if (status === 200) {
      toastr.success(`${data!.title} successfully updated`);
      setLoading(false);
      return;
    }

    if (status === 413) {
      toastr.error("Video too large");
      setLoading(false);
      return;
    }

    toastr.error(`Something went wrong`);
    setLoading(false);
  };

  useEffect(() => {
    setData(post);
    if (!!post._id) {
      setUpdateNotPost(true);
    }

    return () => {
      dispatch(addPost({}));
    }
  }, [post]);
  return (
    <Layout>
      <Paper>
        <div className="post-flex">
          <div className="post-card">
            <form
              className="post-card-form"
              onSubmit={updateNotPost ? handleUpdate : handleSubmit}
            >
              <TextField
                name="image"
                type="file"
                id="video"
                onChange={handleFileUpload}
                helperText={<span>{inputHelperText}</span>}
                placeholder="Select a video"
              />

              {data?.image && (
                <button className="btn-delete-banner" onClick={handleDelete}>
                  Delete Media
                </button>
              )}
              <TextField
                name="title"
                type="text"
                onChange={handleChange}
                label="Post Title"
                value={data?.title}
              />
              {!!!post._id && (
                <TextField
                  name="createdAt"
                  type="datetime-local"
                  onChange={handleChange}
                  helperText={<span>Select the publishing date and time</span>}
                  value={data?.createdAt}
                />
              )}
              {/* <TextField
                name="body"
                multiline
                rows={6}
                onChange={handleChange}
                label="Post Content"
                value={data?.body}
              /> */}
              <div className="">
                <Editor value={data?.body} onChange={(e) => setData({ ...data, body: e })} />
              </div>
              <TextField
                name="resource"
                type="file"
                onChange={handleFileUpload}
                helperText={<span>Select a resource (pdf, docx) etc</span>}
              />
              <div style={{ display: "flex" }}>
                <TextField
                  name="author"
                  type="text"
                  onChange={handleChange}
                  label={`Author`}
                  helperText={<span>Author's Name</span>}
                  value={data?.author?.name}
                />

                <TextField
                  name="authorImage"
                  type="file"
                  className="ml-auto"
                  onChange={handleFileUpload}
                  helperText={<span>Select author's image</span>}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Spinner animation="border" />
                ) : !!post._id ? (
                  "Update"
                ) : (
                  "Post"
                )}
              </Button>
              {!!!post._id && (
                <Button
                  type="reset"
                  variant="danger"
                  ref={inputRef}
                  onClick={() =>
                    setData({ body: "", title: "", author: { name: "" } })
                  }
                >
                  Reset
                </Button>
              )}
            </form>
          </div>
          <PostCard {...data} loading={fileLoading} page="preview" />
        </div>
      </Paper>
    </Layout>
  );
};

// eslint-disable-next-line require-await
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      dataa: "hello",
    },
  };
};

export default Post;
