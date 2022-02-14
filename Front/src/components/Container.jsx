import React, { useRef } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProfileCard from './ProfileCard';
import VacationList from './VacationList';
import VacationDetailes from './VacationDetailes';
import HomeAdmin from './Admin/HomeAdmin';
import VacationsDashboard from './Admin/vacationDashboard/VacationsDashboard';
import UsersDashboard from './Admin/userDashboard/UsersDashboard';
import ChartFollowers from './Admin/vacationDashboard/ChartFollowers';
const Container = () => {
  const vacationScroll = useRef();
  const executeVacationScroll = () =>
    vacationScroll.current.scrollIntoView({ behavior: 'smooth' });
  const vacationOnFollowScroll = useRef();
  const executeVacationOnFollowScroll = () =>
    vacationOnFollowScroll.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <div>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<HomeAdmin />}>
          <Route index element={<VacationsDashboard />} />
          <Route path="vacations" element={<VacationsDashboard />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route path="chart" element={<ChartFollowers />} />
        </Route>
        <Route
          path="/home"
          element={
            <Home
              executeVacationOnFollowScroll={executeVacationOnFollowScroll}
              executeVacationScroll={executeVacationScroll}
            />
          }
        >
          <Route path="VacationDetailes/:id" element={<VacationDetailes />} />
          <Route path="profile" element={<ProfileCard />} />
          <Route
            index
            element={
              <VacationList
                vacationOnFollowScroll={vacationOnFollowScroll}
                vacationScroll={vacationScroll}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Container;
