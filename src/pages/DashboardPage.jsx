import { Grid } from "@mui/material";
import React from "react";
import SummaryGrid from "../components/common/SummaryGrid";
import ToursData from "../components/common/ToursData";
import Animate from "../components/common/Animate";
import UserBookingCard from "../components/common/UserBookingCard";
import TotalIncome from "../components/common/TotalIncome";
import BookedData from "../components/common/BookedData";
import StatisticData from "../components/common/StatisticData";

const DashboardPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SummaryGrid />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
