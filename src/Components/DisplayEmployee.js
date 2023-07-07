import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DisplayEmployee(data) {
  const [input, setInput] = useState("");
  const [rows, setRows] = useState([]);
  const getallData = () => {
    fetch("https://itchy-plum-caridea.cyclic.app/api/tutorials")
      .then((y) => y.json())
      .then((y) => {
        setRows(y);
      });
  };

  const columns = [
    { field: "id", headername: "ID", width: 300 },
    { field: "title", headername: "Title", width: 300 },
    { field: "description", headername: "Description", width: 330 },
    {
      field: "delete",
      headername: "DELETE",
      width: 90,
      renderCell: (params) => {
        console.log(params);
        return (
          <Button
            onClick={() => {
              fetch(
                `https://itchy-plum-caridea.cyclic.app/api/tutorials/${params.row.id}`,
                {
                  method: "delete",
                }
              )
                .then((y) => y.json())
                .then((y) => {
                  if (y.status == 200 || y.status == 201) {
                    toast.error("Error!");
                  }

                  getallData();
                });
            }}
          >
            Delete
          </Button>
        );
      },
    },

    {
      field: "Edit",
      headerName: "Edit",
      width: 90,
      renderCell: (params) => {
        console.log(params);
        // you will find row info in params
        return (
          <Button
            onClick={() => {
              data.setId(params.row.id);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const searchData = () => {
    fetch("https://itchy-plum-caridea.cyclic.app/api/tutorials?title=" + input)
      .then((y) => y.json())
      .then((u) => {
        setRows(u);
      });
  };

  useEffect(() => {
    getallData();
  }, [data]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <input type="text" onChange={changeHandler} />
      <input type="button" value="save" onClick={searchData} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
