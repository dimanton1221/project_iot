import React, { useState } from "react";
import { images } from "../../assets";
import { Box, Grid, Stack, Typography, colors } from "@mui/material";
import Animate from "./Animate";
import MPaper from "./MPaper";
import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:4000");

// jika terkoneksi dengan server
socket.on("connect", () => {
  console.log("connected");
});

socket.on("Timbangan", (msg) => {
  // console.log(msg);
});

const summaryData = [
  {
    title: "Sold",
    value: "2897392 Grams",
    image: images.summaryImages.sold,
  },
];

const SummaryGrid = () => {
  const [data, setData] = useState([]);


  socket.on("Timbangan", (msg) => {
    const msgInt = parseInt(msg);
    
    let value = msgInt;
    if (msgInt < 0) {
      value = 0;
    }
    
    const apasih = [
      {
        title: "Beratnya",
        value: value + " gr",
        image: images.summaryImages.sold,
      }
    ];
    setData(apasih);
  });

  return (
    <Grid container spacing={3}>
      {data.map((summary, index) => (
        <Grid key={index} item xs={12} lg={12}>
          <Animate type="fade" delay={(index + 1) / 3}>
            <MPaper>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack spacing={1}>
                  <Typography variant="h4" fontWeight="bold">
                    {summary.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={colors.grey[600]}
                  >
                    {summary.title}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    height: "100px",
                    width: "100px",
                    "& img": { width: "100%" },
                  }}
                >
                  <img src={summary.image} alt="summary" />
                </Box>
              </Stack>
            </MPaper>
          </Animate>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryGrid;
