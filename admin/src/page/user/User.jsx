import "./user.css";
import "../product/product.css";

import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Input, Select, InputNumber, Button, Form, Space, Modal, Tag } from "antd";
import { ModalAddSize } from "../../modalBox";
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import useMessageApi, {messageCall}  from "../../messageApi";
import { addSizeAndStock, updateUser, validateAddUser } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../firebase";
import * as Yup from "yup";
import {useFormik} from "formik";

export default function User() {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.items.find(item => item._id === userId));

  // const [username, setUsername] = useState(user.username)
  // const [email, setEmail] = useState(user.email)
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin)
  const [file, setFile] = useState("")
  const [imgPreview, setImgPreview] = useState(user?.img);

  const [messageApi, contextMsg] = useMessageApi();

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      username: user?.username,
      // password: user?.password,
      // confirmedPassword: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Please enter a valid email"),
      username: Yup.string().required("Required").matches(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,14}[a-zA-Z0-9]$/, "Username must be 4-14 characters which include letter or number"),
      // password: Yup.string().required("Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters, one letter and one number"),
      // confirmedPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Password must match")
    }),
    onSubmit: ({username, email}) => {

      const updatedUser = {
        ...user,
        username,
        email,
        isAdmin,  
      }

      console.log(updatedUser);

      const check = validateAddUser(messageApi, updatedUser);

      console.log(check);

      if (check) {
        if (file) {
          const fileName = new Date().getTime() + "_" + file.name;
          const storage = getStorage(firebaseApp);
          
          const storageRef = ref(storage, `images/users/${fileName}`);
        
          // Upload the file and metadata
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch(snapshot.state) {
                case "paused": {
                  console.log("Upload is paused ");
                  break;
                }
                case "running": {
                  console.log("Upload is running ");
                  break;
                }
                default: 
      
              }
            },
            (error) => {
      
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateUser(dispatch, userId, {
                  ...updatedUser,
                  img: downloadURL
                }, messageApi);
              });
            }
          )
        } else {
          updateUser(dispatch, userId, updatedUser, messageApi);
        }

      }
    }
  });

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
    
  }

  return (
    <>
      {/* <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Tuan Nguyen</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">annabeck99</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">29.01.2001</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+84 0324 000 997</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">ABC@gmail.com</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">HCM | VietNam</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Nguyen Van A"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Nguyen Van A"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="XYZ9@gmail.com"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+84 0985 222 333"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Ha Noi| Viet Nam"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div> */}


      <div className="product">
        {contextMsg}
        <div className="productTitleContainer">
          <h1 className="productTitle">User</h1>
          {/* <Link to="/users/create">
            <button className="productAddButton">Create</button>
          </Link> */}
        </div>

        <div className="productBottom">
          <form className="productForm" onSubmit={formik.handleSubmit}>
            <div className="productFormLeft">
              <div className="productFormInput">
                <label>Username</label>
                <Input id="username" name="username" onChange={formik.handleChange} value={formik.values.username}/>
                {formik.errors.username && (
                  <p style={{ color: "red" }}>{formik.errors.username}</p>
                )}
              </div>
              <div className="productFormInput">
                <label>Email</label>
                <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                {formik.errors.email && (
                  <p style={{ color: "red" }}>{formik.errors.email}</p>
                )}
              </div>
              <div className="productFormInput">
                <label>Admin</label>
                <Select
                      style={{
                        width: '100%',
                      }}
                      onChange={handleAdminChange}
                      defaultValue={user?.isAdmin}
                    >
                      <Select.Option value={false}>No</Select.Option>
                      <Select.Option value={true}>Yes</Select.Option>
                    </Select>
              </div>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img
                  src={imgPreview || "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
                  alt=""
                  className="productUploadImg"
                />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleFileInput}/>
              </div>
              <button className="productButton" type="submit" >Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
