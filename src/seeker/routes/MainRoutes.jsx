import { Routes, Route } from "react-router-dom";
import React, { lazy } from "react";

import MainLayout from "@seeker/layout/MainLayout";
import Loadable from "@seeker/component/Loadable";

const DashboardDefault = Loadable(lazy(() => import("@seeker/views/Dashboard/Default")));
const UtilsTypography = Loadable(lazy(() => import("@seeker/views/Utils/Typography")));
const SamplePage = Loadable(lazy(() => import("@seeker/views/SamplePage")));
const AppliedJob = Loadable(lazy(() => import("@seeker/views/SamplePage/appliedJob")));
const JobDetails=Loadable(lazy(() => import("@seeker/views/SamplePage/jobdetails")));
const ApplyJob=Loadable(lazy(() => import("@seeker/views/SamplePage/applyJob")));
const AllJob=Loadable(lazy(() => import("@seeker/views/SamplePage/alljob")));

export function SeekerRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* ⭐ default route → /seeker */}
        <Route index element={<AllJob />} />

      
        <Route path="all-job" element={<DashboardDefault />} />
        
        <Route path="applied-job" element={<AppliedJob />} />
        <Route path="job-details/:id" element={<JobDetails />} />
        <Route path="apply-job/:id" element={<ApplyJob />} />

        {/* other pages */}
        <Route path="utils/util-typography" element={<UtilsTypography />} />
        <Route path="sample-page" element={<SamplePage />} />

      </Route>
    </Routes>
  );
}
