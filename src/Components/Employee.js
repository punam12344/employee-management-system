import { Button } from "@mui/material";
import React, { useState } from "react";
import DisplayEmployee from "./DisplayEmployee";
import EmployeeInfo from "./EmployeeInfo";

export default function Employee() {
  const [array, setArray] = useState([]);

  const [open, setOpen] = useState(false);

  const [id, setId] = useState(-1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId(-1);
  };

  const handleDelete = (index) => {};

  const myid = (id) => {
    setId(id);
    handleClickOpen();
  };
  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        onClick={handleClickOpen}
        sx={{ marginTop: 4 }}
      >
        Add EmployeeInfo
      </Button>
      <DisplayEmployee rows={array} setId={myid} />
      <EmployeeInfo
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        id={id}
        setId={setId}
        array={array}
        setarray={setArray}
      />
    </div>
  );
}
