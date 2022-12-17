import "./userList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { deleteProduct, getAllProducts, getAllOrders } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";
import { toast } from "react-toastify";

export default function UserList() {
  const products = useSelector(state => state.product.items);
  const orders = useSelector(state => state.order.items);
  const [data, setData] = useState(products);
  // const [data, setData] = useState(productRows);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts(dispatch);
    getAllOrders(dispatch);
  }, [dispatch])

  const handleDelete = (id) => {

    // kiểm tra sản phẩm có trong order ko?
    const checkOrder = orders.find(order => {
        // console.log(order._id);   
        const a = order.products.find(product => {
          // console.log(product._id.split("#")[0], " ", id);
          return product._id.split("#")[0] === id
        })
        return a;
      }
    )

    if (checkOrder) {
      toast.error(`Not allowed to delete. This product is in an order.`, {
          position: "bottom-right"
      })
    } else {
      deleteProduct(dispatch, id);
    }

    // setData(data.filter((item) => item.id !== id));


    // deleteProduct(dispatch, id);
  };

  useEffect(() => {

    const data = products.map((item) => ({
      ...item,
      categories: item.categories.join(","),
      size: Object.entries(item.size).map(([size, stock])=> {
        return `${size} (${stock})`
      }).join(","),
    }))

    // console.log(data);
    setData(data)
  }, [products])

  console.log(products);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "brand", headerName: "Brand", width: 120 },
    {
      field: "categories",
      headerName: "Categories",
      width: 140,
      renderCell: (params) => {
        const categories = params.row.categories.split(",");
        let color = "blue";
        if (categories[1] === "women") {
          color = "pink";
        } else if (categories[1] === "unisex"){
          color = "black";
        }
        return (
          <>
            {/* <Tag color="">{categories[0]}</Tag> */}
            <Tag color={color}>{categories[1]}</Tag>
          </>
        )
      }
    },
    {
      field: "color",
      headerName: "Color",
      width: 100,
      renderCell: (params) => {
        return (
          <Tag style={params.row.color === "white" ? {
            color: "#999", borderColor: "#999"
          } : {}} color={params.row.color}>{params.row.color}</Tag>
        );
      },
    },
    {
      field: "size",
      headerName: "Size and Stock",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            {
              params.row.size.split(",").map(item => {
                if (item.includes("(0)")) {
                  return (
                    <Tag color="error" key={item}>{item}</Tag>
                  )
                } else {
                  return (
                    <Tag color="success" style={{ color: "#444" }} key={item}>{item}</Tag>
                  )
                }
              })
            }
          </>
        )
      }
    },
    {
      field: "price",
      headerName: "Price ($)",
      width: 130,
      renderCell: (params) => {
        return (
          <p style={{ textAlign: "right" }}>{params.row.price}</p>
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
            <Link to={"/products/" + params.row._id}>
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
        <h1 className="productTitle">Product</h1>
        <Link to="/products/create">
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
