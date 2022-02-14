import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteVacations,
  editVacations,
  getAllVacations,
} from '../../../services/vacationAdmin.service';
import { setVacations } from '../../../redux/actions/vacationAction';
import VacationTable from './VacationTable';
import { ChartFollowers } from './ChartFollowers';

const VacationsDashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const dispatch = useDispatch();
  const vacations = useSelector((state) => state.vacations);

  useEffect(() => {
    getAllVacationsFromServer();
  }, []);
  const getAllVacationsFromServer = () => {
    // console.log('vacation');
    getAllVacations().then(
      (res) => res.data && dispatch(setVacations(res.data))
    );
  };
  const handleEditVacation = (params) => {
    // console.log(params);
    editVacations(params)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  };
  const handleDeleteClick = (event) => {
    // console.log(event.id);
    deleteVacations(event.id)
      .then((res) => {
        // console.log(res.data);
        getAllVacationsFromServer();
      })
      .catch((err) => console.log(err.response.data));
  };
  const openCreateModal = () => {
    handleOpen()
  };
  return (
    vacations.length > 0 && (
      <>
        <VacationTable
          vacations={vacations}
          handleEditVacation={handleEditVacation}
          handleDeleteClick={handleDeleteClick}
          openCreateModal={openCreateModal}
          open={open}
          handleClose={handleClose}
          getAllVacationsFromServer={getAllVacationsFromServer}
        />
        <hr />
        {/* <ChartFollowers/> */}
      </>
    )
  );
};

export default VacationsDashboard;
