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
import { IStakeholder } from "../../src/interfaces/IStakeholder";
import { GetStaticProps } from "next";
import Layout from "../../src/components/adminLayout";
import { Button, Card, Spinner } from "react-bootstrap";
import toastr, { http } from "utils/utils";
import { useSelector } from "react-redux";
import { stakeholderSelector } from "@redux/slices/stakeholder";
import axios from "axios";

const stakeholder = () => {
  const [data, setData] = useState<IStakeholder>();
  const [updateNotstakeholder, setUpdateNotstakeholder] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const inputHelperText = `Select an image type .mkv, jpg, png etc`;

  const stakeholder = useSelector(stakeholderSelector);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value } as IStakeholder);
    console.log(data);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    setLoading(true);
    const { files } = e.target;
    const file = files && files[0];
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("upload_preset", process.env.UPLOAD_PRESET!);
    // TODO: change cloudname to opgan and update upload preset
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
        formData
      )
      .then((res: any) => {
        setData({ ...data, image: res.data.secure_url });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err);
      });
  };

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    setData({ ...data, image: undefined });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const { data: response, status } = await http.post(
      "/stakeholder",
      data
    );
    if (status === 201) {
      toastr.success(`${(response as any).data.name} successfully created`);
      setData(undefined);
      setLoading(false);
      inputRef.current.click();
      return;
    }

    if (status === 413) {
      toastr.error("Image too large");
      setLoading(false);
      return;
    }

    toastr.error(`Something went wrong`);
    setData(undefined);
    setLoading(false);
    inputRef.current.click();
  };

  const handleUpdate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const { data: response, status } = await http.put(
      `/stakeholder/${stakeholder._id}`,
      data
    );
    if (status === 200) {
      toastr.success(`${data!.name} successfully updated`);
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
    setData(stakeholder);
    if (!!stakeholder?._id) {
      setUpdateNotstakeholder(true);
    }
  }, [stakeholder]);
  return (
    <Layout>
      <Paper>
        <div className="post-flex">
          <div className="post-card">
            <form
              className="post-card-form"
              onSubmit={updateNotstakeholder ? handleUpdate : handleSubmit}
            >
              <TextField
                name="image"
                type="file"
                id="video"
                onChange={handleFileUpload}
                helperText={<span>{inputHelperText}</span>}
                placeholder="Select an image"
              />

              {data?.image && (
                <button className="btn-delete-banner" onClick={handleDelete}>
                  Delete Media
                </button>
              )}
              <TextField
                name="name"
                type="text"
                onChange={handleChange}
                label="Name"
                value={data?.name}
              />
              <TextField
                name="description"
                multiline
                rows={6}
                onChange={handleChange}
                label="Description"
                value={data?.description}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Spinner animation="border" />
                ) : !!stakeholder?._id ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
              {!!!stakeholder?._id && (
                <Button
                  type="reset"
                  variant="danger"
                  ref={inputRef}
                  onClick={() =>
                    setData({ name: "", description: "", image: "" })
                  }
                >
                  Reset
                </Button>
              )}
            </form>
          </div>
          <div style={{flex: 1}}>
            <Card className="border-none  portfolio-card">
              <Card.Img
                variant="top"
                className="card-img"
                src={data?.image}
                alt={data?.name}
              />
              <Card.Body>
                <Card.Title className="font-bold">{data?.name}</Card.Title>
                <Card.Text className="text-justify">
                  {data?.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="card-footer"></Card.Footer>
            </Card>
          </div>
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

export default stakeholder;
