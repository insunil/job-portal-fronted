import React, { lazy } from 'react';

// project import
import MainLayout from '@employer/layout/MainLayout';
import Loadable from '@employer/component/Loadable';
import { Route, Routes } from 'react-router';

const DashboardDefault = Loadable(lazy(() => import('@employer/views/Dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('@employer/views/Utils/Typography')));

const Jobs=Loadable(lazy(() => import('@employer/views/SamplePage/job')));
const Applications=Loadable(lazy(() => import('@employer/views/SamplePage/applications')));
const AddJob=Loadable(lazy(() => import('@employer/views/SamplePage/addJob')));
const EditJob=Loadable(lazy(() => import('@employer/views/SamplePage/edit-job')));
const DeleteJob=Loadable(lazy(() => import('@employer/views/SamplePage/deleteJob')));

// ==============================|| MAIN ROUTES ||============================== //

export function EmployerRoutes() {
  return (  
    <Routes>
      <Route element={<MainLayout />}>

        {/* ⭐ default route → /seeker */}
        <Route index element={<Jobs />} />
        
        <Route path="jobs" element={<Jobs/>} />
        <Route path="applications" element={<Applications/>} />
        <Route path="add-job" element={<AddJob/>} />
        <Route path="edit-job/:id" element={<EditJob/>} />
        <Route path="delete-job/:id" element={<DeleteJob/>} />


      </Route>
    </Routes>
  );
}
