import "./userList.css";
import "../productList/productList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { deleteProduct, getAllProducts, getAllOrders, getAllUsers, deleteUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";
import { toast } from "react-toastify";

export default function UserList() {
  const orders = useSelector(state => state.order.items);
  const users = useSelector(state => state.user.items);
  const [data, setData] = useState(users);
  // const [data, setData] = useState(productRows);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllOrders(dispatch);
    getAllUsers(dispatch);
  }, [dispatch])

  const handleDelete = (id) => {

    // kiểm tra sản phẩm có trong order ko?
    const checkOrder = orders.find(order => {
        // console.log(order._id);   
        return order.userId === id;
      }
    )

    if (checkOrder) {
      toast.error(`Not allowed to delete. This user is in an order.`, {
          position: "bottom-right"
      })
    } else {
      deleteUser(dispatch, id);
    }
  };

  // useEffect(() => {

  //   const data = products.map((item) => ({
  //     ...item,
  //     categories: item.categories.join(","),
  //     size: Object.entries(item.size).map(([size, stock])=> {
  //       return `${size} (${stock})`
  //     }).join(","),
  //   }))

  //   // console.log(data);
  //   setData(data)
  // }, [products])

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Username",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img 
              className="productListImg" 
              style={{ border: "1px solid #ddd" }}
              src={params.row.img || "https://cediv.travel/wp-content/uploads/2017/09/no-avatar-3.png"} 
              alt="" 
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
      renderCell: (params) => {
        return (
          params.row.isAdmin === true ? (
            <Tag color="success">yes</Tag>
          ) : (
            <Tag color="error">no</Tag>
          )
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">User</h1>
        <Link to="/users/create">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        // rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        // checkboxSelection
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
}
