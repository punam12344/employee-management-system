import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EmployeeInfo(props) {
  const [data, setData] = useState({
    title: "",
    description: "",
    Id: ",",
  });

  useEffect(() => {
    if (props.id != -1) {
      fetch(`https://itchy-plum-caridea.cyclic.app/api/tutorials/${props.id}`)
        .then((y) => y.json())
        .then((y) => {
          setData(y);
          // if(y.status== 200)
          // {
          //   toast.success("Data Edited Successfully!!");
          // }
        });
    }
  }, [props.id]);

  const formHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveData = () => {
    let url = "https://itchy-plum-caridea.cyclic.app/api/tutorials";
    let method = "post";

    if (props.id != -1) {
      url = `https://itchy-plum-caridea.cyclic.app/api/tutorials/${props.id}`;
      method = "put";
    }

    fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((y) => y.json())
      .then((y) => {
        props.setId(-1);
        props.handleClose();
      });
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Employee Details</DialogTitle>
      <DialogContent>
        <DialogContentText>Please Fill The Details.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="title"
          type="text"
          fullWidth
          variant="standard"
          onChange={formHandler}
          value={data.title}
        />

        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="description"
          type="text"
          name="description"
          fullWidth
          variant="standard"
          value={data.description}
          onChange={formHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={saveData}>Save</Button>
        <Button onClick={props.handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
