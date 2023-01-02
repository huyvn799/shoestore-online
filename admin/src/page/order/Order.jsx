import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Input, Select, InputNumber, Button, Form, Space, Modal, Tag } from "antd";
import { ModalAddSize } from "../../modalBox";
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import useMessageApi, {messageCall}  from "../../messageApi";
import { addSizeAndStock, updateProduct, validateAddProduct } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../firebase";

const { Option } = Select;

export default function Order() {
  const {productId} = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.items.find(product => product._id === productId));
  const products = useSelector(state => state.product.items);

  const [productStats, setProductStats] = useState([]);

  const [title, setTitle] = useState(product.title)
  const [desc, setDesc] = useState(product.desc)
  const [code, setCode] = useState(product.seriesCode)
  const [brand, setBrand] = useState(product.brand)
  const [category, setCategory] = useState(product.categories[1])
  const [color, setColor] = useState(product.color)
  const [sizeStock, setSizeStock] = useState([])
  const [price, setPrice] = useState(product.price)
  const [file, setFile] = useState("")
  const [imgPreview, setImgPreview] = useState(product.img);

  const [messageApi, contextMsg] = useMessageApi();

  const MONTHS = useMemo(() => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], []
  )

  useEffect(() => {
    const getProductStats = async() => {
      try {
        const res = await userRequest.get("/orders/income/latest?pid=" + productId);
        console.log(res.data);
        const stats = res.data.map(item => (
            {
              name: MONTHS[item._id[1] - 1],
              "Sales": item.total
            }
        ))
        setProductStats(stats);

      } catch (err) {
        console.log(err);
      }
    }

    getProductStats();
  }, [MONTHS]);


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

  // const handleSizeAndStock = (changeValues, values) => {
  //   // console.log(values);
  //   setSizeStock(values);
  // }

  const handleFileInput = (e) => {
    console.log(e.target.files);

    setImgPreview(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    // let sizeProduct = {};
    // sizeStock.sizes?.forEach(({size, stock}) => {
    //   sizeProduct = {
    //     ...sizeProduct,
    //     [size]: stock
    //   }
    // })

    const updatedProduct = {
      ...product,
      title,
      desc,
      brand,  
      seriesCode: code,
      categories: ["shoe", category],
      color,
      price
    }

    // console.log(updatedProduct);

    const check = validateAddProduct(messageApi, updatedProduct);

    if (check) {
      if (file) {
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
              updateProduct(dispatch, productId, {
                ...updatedProduct,
                img: downloadURL
              });
            });
          }
        )
      } else {
        updateProduct(dispatch, productId, updatedProduct);
      }

      // setTitle("")
      // setDesc("")
      // setCode("")
      // setBrand("Adidas")
      // setCategory("men")
      // setColor("black")
      // setSizeStock([])
      // setPrice(0)
      // setFile("")
      // setImgPreview("")
      // handleSizeAndStock("",[]);
    }
  }

  const [visible, setVisible] = useState(false);
  const [sizeModal, setSizeModal] = useState("");
  const [stockModal, setStockModal] = useState(1);
  
  const showModal = () => {
    setVisible(true)
  }

  const handleOkModal = (e) => {
    console.log("[size]",sizeModal);
    console.log("[stock]",stockModal);

    addSizeAndStock(messageApi, product, dispatch);
    
    // setVisible(false);
    // setSizeModal("")
    // setStockModal(0)
  };
  
  const handleCancelModal = () => {
    setVisible(false)
    setSizeModal("")
    setStockModal(0)
  };

  return (
    <div className="product">
      {contextMsg}
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/products/create">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart 
            data={productData} 
            // data={productStats} 
            dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product?.img}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">series code: </span>
              <span className="productInfoValue">{product?.seriesCode}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">brand: </span>
              <span className="productInfoValue">{product?.brand}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">category: </span>
              <span className="productInfoValue">{product?.categories[1]}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">color: </span>
              <span className={`productInfoValue color ${product?.color}`}></span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">size & stock: </span>
              <span className="productInfoValue">
              {
                Object.entries(product?.size).map(([size, stock]) => (
                  `${size} (${stock})`
                )).join(" , ")
              }
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price: </span>
              <span className="productInfoValue">$ {product?.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">description: </span>
              <span className="productInfoValue">{product?.desc}</span>
            </div>
            {/* <div className="productInfoItem">
              <span className="productInfoKey">sales: </span>
              <span className="productInfoValue">5123</span>
            </div> */}
          </div>
        </div>
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
            <div className="productFormSelect">
              <div className="productFormSelectInput">
                <label>Brand</label>
                <Select
                    style={{
                      width: '100%',
                    }}
                    onChange={handleBrandChange}
                    defaultValue={product?.brand}
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
                    defaultValue={product?.categories[1]}
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
                    defaultValue={product?.color}
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
                <label style={{ display: "block" }}>Price ($)</label>
                <InputNumber min={0} style={{ width: "100px" }} defaultValue={0}
                  onChange={(value) => setPrice(value)} value={price}
                />
              </div>
              <div className="productFormSelectInput">
                <Button icon={<PlusOutlined />} onClick={showModal}>Add size</Button>
                <Modal 
                  title={<><PlusOutlined /> Add Size & stock</>}
                  open={visible} 
                  onOk={handleOkModal}
                  onCancel={handleCancelModal}
                  width={300}
                >
                  <Input.Group style={{ display: "flex" }} compact>
                    <Input placeholder="Size" value={sizeModal} onChange={(e) => setSizeModal(e.target.value)}/>
                    <InputNumber min={1} value={stockModal} onChange={(value) => setStockModal(value)}/>
                  </Input.Group>
                </Modal>
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
            <button className="productButton" onClick={handleSubmit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
