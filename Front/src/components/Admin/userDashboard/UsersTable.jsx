import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import ButtonBootstrap from 'react-bootstrap/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalCreateUser from './ModalCreateUsers';

const UsersTable = ({
  users,
  handleEditUser,
  handleDeleteClick,
  openCreateModal,
  open,
  handleClose,
  getAllUsersFromServer,
}) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      editable: true,
    },

    {
      field: 'del',
      headerName: (
        <ButtonBootstrap
          onClick={openCreateModal}
          style={{ width: '100%' }}
          variant="outline-success"
        >
          Create &nbsp;
          <AddIcon color="green" />
        </ButtonBootstrap>
      ),
      flex: 1,
      sortable: false,
      disabled: true,
      align: 'right',
      headerAlign: 'center',

      disableColumnMenu: true,

      renderCell: (params) => (
        <Button color="inherit" onClick={() => handleDeleteClick(params)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const rows = users.map((vacation) => ({
    id: vacation._id,
    ...vacation,
  }));

  return (
    rows.length > 0 && (
      <div
        style={{
          // height: 'calc(100VH - 200px)',
          width: '100%',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          // checkboxSelection
          disableSelectionOnClick
          onCellEditCommit={handleEditUser}
          autoHeight
        />

        <ModalCreateUser
          open={open}
          handleClose={handleClose}
          getAllUsersFromServer={getAllUsersFromServer}
        />
      </div>
    )
  );
};

export default UsersTable;

// function DataGridDemo() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//         disableSelectionOnClick
//       />
//     </div>
//   );
// }
