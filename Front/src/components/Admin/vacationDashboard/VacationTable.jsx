import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import ButtonBootstrap from 'react-bootstrap/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalCreateVacation from './ModalCreateVacation';

const VacationTable = ({
  vacations,
  handleEditVacation,
  handleDeleteClick,
  openCreateModal,
  open,
  handleClose,
  getAllVacationsFromServer,
}) => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      editable: true,
    },
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      editable: true,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      editable: true,
      flex: 0.5,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'followers',
      headerName: 'Followers',
      editable: false,
      flex: 0.5,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => {
        return params.getValue(params.id, 'followersID').length;
      },
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

  const rows = vacations.map((vacation) => ({
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
          onCellEditCommit={handleEditVacation}
          autoHeight
        />

        <ModalCreateVacation
          open={open}
          handleClose={handleClose}
          getAllVacationsFromServer={getAllVacationsFromServer}
        />
      </div>
    )
  );
};

export default VacationTable;
