import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner, Table } from "react-bootstrap";
import Layout from "../../src/components/adminLayout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toastr, { DeleteAlert, http } from "utils/utils";
import { GetServerSideProps, GetStaticProps } from "next";
import { IStakeholder } from "../../src/interfaces/IStakeholder";
import { addStakeholder } from "@redux/slices/stakeholder";
import router from "next/router";
import { blue, red, teal } from "@mui/material/colors";

const Stakeholder = () => {
  const [data, setData] = useState<any>();
  const dispatch = useDispatch();
  const handleEdit = (data: IStakeholder): void => {
    dispatch(addStakeholder(data));
    router.push("/admin/postStakeholder");
  };
  const handleDelete = (dataa: IStakeholder): void => {
    DeleteAlert().then((result) => {
      if (result.isConfirmed) {
        http
          .delete(`stakeholder/${dataa._id}`)
          .then(({ data: dataaa, status }) => {
            if (status === 200) {
              toastr.success("successfully deleted");
              setData(
                data.filter((item: IStakeholder) => item._id !== dataa._id)
              );
              return;
            }
            toastr.error((dataaa as any).message);
          })
          .catch((e: any) => toastr.error(e));
      }
    });
  };
  useEffect(() => {
    http
      .get("/stakeholder")
      .then((res: any) => setData(res.data.data))
      .then(() => console.log(data))
      .catch((e) => console.error(e));
  }, []);
  let i = 1;
  return (
    <Layout>
      <Paper className="center-table p-3">
        {data ? (
          <Table borderless hover responsive striped>
            <thead>
              <tr className="head">
                <th>S/N</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((data: IStakeholder) => (
                  <tr>
                    <th scope="row">{i++}</th>
                    <td>{data.name}</td>
                    <td className="ellipsis">{data.description}</td>
                    <td>{new Date(data.createdAt!).toLocaleDateString()}</td>
                    <td>
                      <EditIcon
                        color="primary"
                        onClick={(e) => handleEdit(data)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: blue[500] },
                        }}
                      />{" "}
                      <DeleteIcon
                        color="error"
                        onClick={(e) => handleDelete(data)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: red[500] },
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <div className="place-center">
            <Spinner animation="border" variant="primary">
            </Spinner>
          </div>
        )}
      </Paper>
    </Layout>
  );
};

export default Stakeholder;

// export const getStaticProps: GetStaticProps = async (ctx) => {
//     const { data, status } = await http.get('/Stakeholder');
//     return {
//         props: {
//             data: (data as any)
//         },
//         revalidate: 1,
//     }
// }
