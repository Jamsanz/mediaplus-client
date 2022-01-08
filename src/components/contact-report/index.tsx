import * as React from 'react';
import AdminLayout from 'pages/admin/layout';
import toastr, { DeleteAlert, http } from 'utils/utils';
import {
  Grid,
  Paper,
  Container,
  Button,
  Typography
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridSelectionModel,
  GridCellEditCommitParams
} from '@mui/x-data-grid';
import { useEffect } from 'react';
import router from 'next/router';

const columns: GridColDef[] = [

  { field: 'name', headerName: 'Full Name', width: 200, editable: false },
  { field: 'email', headerName: 'E-Mail', width: 200, editable: false },
  { field: 'phone', headerName: 'Phone', type: 'number', width: 150, editable: false },
  { field: 'service', headerName: 'Service', width: 150, editable: false },
  { field: 'status', headerName: 'Status', width: 150, editable: true },
  { field: 'message', headerName: 'Message', width: 700, editable: true },

];




const Contacts: React.FC = ({ contact }: any): JSX.Element => {
  const [user, setUser] = React.useState<any>();
  const [id, setId] = React.useState<string>('');
  const [rows, setRows] = React.useState<any[]>([]);
  const [view, setView] = React.useState<boolean>(false);
  const [deleteData, setDeleteData] = React.useState<any[]>([]);
  useEffect(() => {
    http.get('/contacts')
      .then(contact =>
        (contact as any).data.contacts.map((contacts: any) => {
          setRows(rows => [
            ...rows,
            {
              id: contacts._id,
              name: contacts.name,
              email: contacts.email,
              phone: contacts.phone,
              // subject:contacts.subject,
              service: contacts.service,
              status: contacts.status,
              message: contacts.message,
            }])
        })
      )
  }, []);




  const handleEditCellChangeCommitted = (params: GridCellEditCommitParams) => {
    const { id, field, value } = params;
    http.put(`/contacts/${id}`, {
      [field]: value
    }).then(res => {
      toastr.success(`${(res as any).data.message}`)
    }).catch(err => toastr.error(`${err}`));

  }

  const [pageSize, setPageSize] = React.useState<number>(5);
  const handlePageSizeChange = (params: any) => {
    setPageSize(params.pageSize);
  };

  const handleOnSelectionModelChange = (selectionModel: GridSelectionModel): void => {
    setDeleteData(selectionModel);
    setId(selectionModel[0] as string);
    setView(!view);
  }

  const handleDetails = (): void => {
    router.push(`/admin/details/${id}`);
  }
  const handleClick = (): void => {
    DeleteAlert()
      .then(result => {
        if (result.isConfirmed) {
          http.delete(`/contacts/${deleteData}`)
            .then(res => {
              toastr.success(`Record successfully deleted`)
              deleteData.map((del) => {
                setRows((prev) => {
                  return prev.filter((item) => {
                    return item.id !== del;
                  });
                });
              });
            });
        }
      });
  };
  useEffect(() => {
    const t: any = window.localStorage.getItem('MediaUser');
    setUser(JSON.parse(t));
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push("/admin/signIn");
    }
  }, [user]);

  return (
    <Paper className="paper">
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>Contact Report</Typography>
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          onCellEditCommit={handleEditCellChangeCommitted}
          autoHeight
          rows={rows}
          columns={columns}
          pagination
          onRowClick={handleDetails}
          onSelectionModelChange={handleOnSelectionModelChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {view && <Button onClick={handleDetails} variant="contained" className="mr-3">VIEW DETAILS</Button>}
          <Button onClick={handleClick} variant="contained" color="error">DELETE</Button>
        </div>
      </React.Fragment>
    </Paper>
  )
}

// export const getStaticProps: GetStaticProps = async () =>{
//   const contacts = await http.get("/contacts");
//     return{
//         props:{contacts: (contacts as any).data.contacts}
//     }
// }

export default Contacts;
