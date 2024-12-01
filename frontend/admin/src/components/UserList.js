import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

import Loader from 'components/Loader';

export default function UserList({ classes, appContext, onAppContextChanged, history }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().catch((err) => { toast.error("Error fetching users", err); });
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await appContext.api.get("/admin/users");
      const usersData = Array.isArray(response.data) ? response.data : [];
      setUsers(usersData);
    } finally {
      setLoading(false);
    }
  };

  const tableColumns = [
    {
      field: "username",
      headerName: "UserName",
      minWidth: 150,
      headerAlign: "center",
      align: "left",
      editable: false,
      disableColumnMenu: true,
      headerClassName: classes.ad_table_header,
      cellClassName: classes.ad_table_cell,
      renderHeader: (params) => "UserName",
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
      headerAlign: "center",
      align: "left",
      editable: false,
      disableColumnMenu: true,
      headerClassName: classes.ad_table_header,
      cellClassName: classes.ad_table_cell,
      renderHeader: (params) => "Email",
      renderCell: (params) => {
        return (
          <div className={classes.ad_table_cell_div} >
            <span><MdOutlineEmail className={classes.ad_table_cell_icon} /></span>
            <span>{params?.row?.email}</span>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 170,
      headerAlign: "center",
      align: "left",
      editable: false,
      disableColumnMenu: true,
      headerClassName: classes.ad_table_header,
      cellClassName: classes.ad_table_cell,
      renderHeader: (params) => "Name",
    },
    {
      field: "created",
      headerName: "Created At",
      width: 260,
      headerAlign: "center",
      align: "left",
      editable: false,
      disableColumnMenu: true,
      headerClassName: classes.ad_table_header,
      cellClassName: classes.ad_table_cell,
      renderHeader: (params) => "Created At",
      renderCell: (params) => {
        return (
          <div className={classes.ad_table_cell_div}>
            <span><MdDateRange className={classes.ad_table_cell_icon} /></span>
            <span>{params?.row?.created}</span>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerAlign: "center",
      align: "center",
      editable: false,
      disableColumnMenu: true,
      headerClassName: classes.ad_table_header,
      cellClassName: classes.ad_table_cell,
      renderHeader: (params) => "Status",
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      headerAlign: "center",
      align: "center",
      editable: false,
      sortable: false,
      headerClassName: classes.ad_table_header + " " + classes.ad_table_header_last,
      cellClassName: classes.ad_table_cell + " " + classes.ad_table_cell_last,
      renderHeader: (params) => "Action",
      renderCell: (params) => {
        return (
          <Link to={`/admin/users/${params.id}`} className={classes.ad_table_cell_link} >
            <button className={classes.ad_table_cell_button} >
              Views
            </button>
          </Link>
        );
      },
    },
  ];

  const rows = users.map((item) => {
    const formattedDate = moment(item.createdDate).format(
      "MMMM DD, YYYY, hh:mm A"
    );

    return {
      id: item.id,
      username: item.username,
      name: item.name,
      email: item.email,
      created: formattedDate,
      status: item.enabled ? "Active" : "Inactive",
    };
  });

  return (
    <div className={classes.ad_userlist} >
      <div className={classes.ad_list_title} >
        <h1 className={classes.ad_list_title_h1} >
          All Users
        </h1>
      </div>
      <div className={classes.ad_list} >
        {loading ? ( <Loader /> ) : (
          <DataGrid
            className={classes.ad_list_table}
            rows={rows}
            columns={tableColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[10]}
            disableColumnResize
          />
        )}
      </div>
    </div>
  );
};