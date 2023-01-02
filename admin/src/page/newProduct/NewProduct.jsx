import "./newProduct.css";
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
import { addProduct, addSizeAndStock, validateAddProduct } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../firebase";

export default function NewProduct() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.items);

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [code, setCode] = useState("")
  const [brand, setBrand] = useState("Adidas")
  const [category, setCategory] = useState("men")
  const [color, setColor] = useState("black")
  const [sizeStock, setSizeStock] = useState([])
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [profitRate, setProfitRate] = useState(10)
  const [file, setFile] = useState("")
  const [imgPreview, setImgPreview] = useState("");

  const [messageApi, contextMsg] = useMessageApi();

  useEffect(() => {
    return () => {
      imgPreview && URL.revokeObjectURL(imgPreview);
    }
  }, [imgPreview])

  const handleBrandChange = (value) => {
    console.log(value);
    setBrand(value)
  }

  const handleCategoryChange = (value) => {
    console.log(value);
    setCategory(value)
  }

  const handleColorChange = (value) => {
    console.log(value);
    setColor(value)
    setTitle(title.split("-")[0] + "-" + value);
  }

  const handleSizeAndStock = (changeValues, values) => {
    // console.log(values);
    setSizeStock(values);
  }

  const handleCostInput = (value) => {
    setCost(value); 
    setPrice(Math.round(value * (100 + profitRate) / 100));
  }

  const handleProfitRateChange = (value) => {
    console.log(value);
    setProfitRate(value);
    setPrice(Math.round(cost * (100 + value) / 100));
  }

  const handleFileInput = (e) => {
    console.log(e.target.files);

    setImgPreview(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    let sizeProduct = {};
    sizeStock.sizes?.forEach(({size, stock}) => {
      sizeProduct = {
        ...sizeProduct,
        [size]: stock
      }
    })

    let totalQuantity = sizeStock.sizes?.reduce((total, {size, stock}) => total + stock, 0);

    let updates = [];
    updates.push({
      updateTime: (new Date()).toISOString(),
      quantity: totalQuantity,
    })

    const newProduct = {
      title,
      desc,
      brand,  
      seriesCode: code,
      categories: ["shoe", category],
      color,
      size: sizeProduct,
      cost,
      price,
      updates
    }

    const check = validateAddProduct(messageApi, newProduct, file);

    if (check) {
      const fileName = new Date().getTime() + "_" + file.name;
      const storage = getStorage(firebaseApp);
      
      const storageRef = ref(storage, `images/products/${fileName}`);

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
            addProduct(dispatch, {
              ...newProduct,
              img: downloadURL
            });

            setTitle("")
            setDesc("")
            setCode("")
            setBrand("Adidas")
            setCategory("men")
            setColor("black")
            setSizeStock([])
            setProfitRate(10)
            setCost(0)
            setPrice(0)
            setFile("")
            setImgPreview("")
            handleSizeAndStock("",[]);
          });
        }
      )
    }
  }

  return (
    <>
      {contextMsg}
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        {/* <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input type="text" placeholder="Nike shoes" />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <input type="text" placeholder="123" />
          </div>
          <div className="addProductItem">
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button className="addProductButton">Create</button>
        </form> */}
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <div className="productFormInput">
              <label>Product Name</label>
              <Input onChange={(e) => setTitle(e.target.value)} value={title}/>
            </div>
            <div className="productFormInput">
              <label>Series Code</label>
              <Input onChange={(e) => setCode(e.target.value)} value={code}/>
            </div>
            <div className="productFormInput">
              <label>Description</label>
              <Input.TextArea
                rows={4}
                onChange={(e) => setDesc(e.target.value)} value={desc}
              />
            </div>
            <div className="productFormInput">
              <Form name="dynamic_form_nest_item" onValuesChange={handleSizeAndStock} autoComplete="off">
                <Form.List name="sizes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: 'flex',
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'size']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing size',
                              },
                            ]}
                          >
                            <Input placeholder="Size" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'stock']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing stock',
                              },
                            ]}
                          >
                            <InputNumber min={0} placeholder="Stock" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add size and stock
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
            </div>
            <div className="productFormSelect">
              <div className="productFormSelectInput">
                <label>Brand</label>
                <Select
                    style={{
                      width: '100%',
                    }}
                    onChange={handleBrandChange}
                    defaultValue="Adidas"
                  >
                    <Select.Option value="Adidas">Adidas</Select.Option>
                    <Select.Option value="Nike">Nike</Select.Option>
                    <Select.Option value="Puma">Puma</Select.Option>
                    <Select.Option value="Reebok">Reebok</Select.Option>
                    <Select.Option value="Skechers">Skechers</Select.Option>
                  </Select>
              </div>
              <div className="productFormSelectInput">
                <label>Category</label>
                <Select
                    style={{
                      width: '100%',
                    }}
                    onChange={handleCategoryChange}
                    defaultValue="men"
                  >
                    <Select.Option value="men">Men</Select.Option>
                    <Select.Option value="women">Women</Select.Option>
                    <Select.Option value="unisex">Unisex</Select.Option>
                  </Select>
              </div>
              <div className="productFormSelectInput">
                <label>Color</label>
                <Select
                    style={{
                      width: '100%',
                    }}
                    onChange={handleColorChange}
                    defaultValue="black"
                  >
                    <Select.Option value="black"><Tag color="black">black</Tag></Select.Option>
                    <Select.Option value="red"><Tag color="red">red</Tag></Select.Option>
                    <Select.Option value="orange"><Tag color="orange">orange</Tag></Select.Option>
                    <Select.Option value="yellow"><Tag color="yellow">yellow</Tag></Select.Option>
                    <Select.Option value="green"><Tag color="green">green</Tag></Select.Option>
                    <Select.Option value="blue"><Tag color="blue">blue</Tag></Select.Option>
                    <Select.Option value="white"><Tag color="white" style={{ color: "#999", borderColor:"#999" }}>white</Tag></Select.Option>
                    <Select.Option value="purple"><Tag color="purple">purple</Tag></Select.Option>
                    <Select.Option value="pink"><Tag color="pink">pink</Tag></Select.Option>
                    <Select.Option value="gray"><Tag color="gray">gray</Tag></Select.Option>
                  </Select>
              </div>
              <div className="productFormSelectInput">
                <label style={{ display: "block" }}>Cost ($)</label>
                <InputNumber min={0} style={{ width: "100px" }} defaultValue={0}
                  onChange={handleCostInput} value={cost}
                />
              </div>
              <div className="productFormSelectInput">
                <label>Profit Rate</label>
                <Select
                    style={{
                      width: '100%',
                    }}
                    onChange={handleProfitRateChange}
                    defaultValue={10}
                  >
                    <Select.Option value={10}>10%</Select.Option>
                    <Select.Option value={20}>20%</Select.Option>
                    <Select.Option value={30}>30%</Select.Option>
                    <Select.Option value={40}>40%</Select.Option>
                    <Select.Option value={50}>50%</Select.Option>
                  </Select>
              </div>
              <div className="productFormSelectInput">
                <label style={{ display: "block" }}>Price ($)</label>
                <InputNumber disabled min={0} style={{ width: "100px" }} defaultValue={0}
                  // onChange={(value) => setPrice(value)} 
                  value={price}
                />
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
