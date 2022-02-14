import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../../redux/actions/usersAction';
import {
  deleteUser,
  editUser,
  getAllUsers,
} from '../../../services/usersAdmin.service';
import UsersTable from './UsersTable';

const UsersDashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    getAllUsersFromServer();
  }, []);
  const getAllUsersFromServer = () => {
    // console.log('users');
    getAllUsers().then((res) => res.data && dispatch(setUsers(res.data)));
  };
  const handleEditUser = (params) => {
    // console.log(params);
    editUser(params)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err.response.data);
      });
  };
  const handleDeleteClick = (event) => {
    // console.log(event.id);
    deleteUser(event.id)
      .then((res) => {
        // console.log(res.data);
        getAllUsersFromServer();
      })
      .catch((err) => console.log(err.response.data));
  };
  const openCreateModal = () => {
    handleOpen();
  };
  return (
    users.length > 0 && (
      <>
        <UsersTable
          users={users}
          handleEditUser={handleEditUser}
          handleDeleteClick={handleDeleteClick}
          openCreateModal={openCreateModal}
          open={open}
          handleClose={handleClose}
          getAllUsersFromServer={getAllUsersFromServer}
        />
      </>
    )
  );
};

export default UsersDashboard;
