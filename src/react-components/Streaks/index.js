import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: "#5271FF",
        color: "white",
        p: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: 19,
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.object,
};

export default function index() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#D7E4FF",
      }}
    >
      <p style={{ textAlign: "center", fontSize: "18px" }}>Overview</p>
      <Box
        sx={{
          display: "grid",
          margin: "10px",
          padding: "10px",
        }}
      >
      <p style={{ fontSize: "14px" }}>This is study planner apllication where you can plan sessions with your friends</p>
      </Box>
    </div>
  );
}
