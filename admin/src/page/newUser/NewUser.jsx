import "../newProduct/newProduct.css";
import "../product/product.css";
import { Link, useParams } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Input, Select, InputNumber, Button, Form, Space, Modal, Tag } from "antd";
import { ModalAddSize } from "../../modalBox";
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import { useFormik } from "formik";
import * as Yup from "yup";
import useMessageApi, {messageCall}  from "../../messageApi";
import { addProduct, addSizeAndStock, addUser, validateAddProduct, validateAddUser } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../firebase";

export default function NewProduct() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [file, setFile] = useState("")
  const [imgPreview, setImgPreview] = useState("");

  const [messageApi, contextMsg] = useMessageApi();

  useEffect(() => {
    return () => {
      imgPreview && URL.revokeObjectURL(imgPreview);
    }
  }, [imgPreview])

  const handleAdminChange = (value) => {
    console.log(value);
    setIsAdmin(value)
  }

  const handleFileInput = (e) => {
    console.log(e.target.files);

    setImgPreview(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
      isAdmin, 
      file 
    }

    console.log(newUser);

    // const check = validateAddUser(messageApi, newUser);

    // if (check) {
    //   if (file) {
    //     const fileName = new Date().getTime() + "_" + file.name;
    //     const storage = getStorage(firebaseApp);
        
    //     const storageRef = ref(storage, `images/users/${fileName}`);
      
    //     // Upload the file and metadata
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    
    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         const progress = 
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         switch(snapshot.state) {
    //           case "paused": {
    //             console.log("Upload is paused ");
    //             break;
    //           }
    //           case "running": {
    //             console.log("Upload is running ");
    //             break;
    //           }
    //           default: 
    
    //         }
    //       },
    //       (error) => {
    
    //       },
    //       () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //           addUser(dispatch,{
    //             ...newUser,
    //             img: downloadURL
    //           });
    //         });
    //       }
    //     )
    //   } else {
    //     addUser(dispatch, newUser);
    //   }

    //   // setTitle("")
    //   // setDesc("")
    //   // setCode("")
    //   // setBrand("Adidas")
    //   // setCategory("men")
    //   // setColor("black")
    //   // setSizeStock([])
    //   // setPrice(0)
    //   // setFile("")
    //   // setImgPreview("")
    //   // handleSizeAndStock("",[]);
    // }
  }

  return (
    <>
      {contextMsg}
      <div className="newProduct">
        <h1 className="addProductTitle">New User</h1>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <div className="productFormInput">
              <label>Username</label>
              <Input onChange={(e) => setUsername(e.target.value)} value={username}/>
            </div>
            <div className="productFormInput">
              <label>Email</label>
              <Input onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="productFormInput">
              <label>Password</label>
              <Input onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className="productFormSelect">
              <div className="productFormSelectInput">
                <label>Admin</label>
                <Select
                    style={{
                      width: '100%',
                    }}
                    onChange={handleAdminChange}
                    defaultValue={false}
                  >
                    <Select.Option value={false}>No</Select.Option>
                    <Select.Option value={true}>Yes</Select.Option>
                  </Select>
              </div>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={imgPreview || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={handleFileInput}/>
            </div>
            <button className="productButton" onClick={handleSubmit}>Create</button>
          </div>
        </form>
      </div>
    </>
  );
}
