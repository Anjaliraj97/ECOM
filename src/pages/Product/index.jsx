import "./product.css";
import Frame from "../../Components/Frame";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const productCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addproduct/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Price", dataIndex: "price" },
    { title: "Tags", dataIndex: "tags" },
    {
      title: "Thumbnailimage",
      dataIndex: "thumbnailImage",
      render: (text) => (
        <img src={text}  crossOrigin="anonymous" />
      ),
    },
    { title: "Discount", dataIndex: "discount" },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text} className="product-img" crossOrigin="anonymous" />
      ),
    },
    { title: "Categoryid", dataIndex: "categoryid" },
    { title: "Subcategoryid", dataIndex: "subcategoryid" },
    { title: "Variants", dataIndex: "variants" },
    { title: "Isavailable", dataIndex: "isAvailable" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Sellerid", dataIndex: "sellerid" },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id) => (
        <i onClick={() => onDelete(id)} class="fa-solid fa-trash delete"></i>
      ),
    },
  ];
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}`);
    } catch (e) {
      console.log(e);
    }
    fetchProduct();
  };

  const fetchProduct = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8000/product");
      setLoading(false);
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const onClick = () => {
    navigate("/seller/addproduct");
  };
  return (
    <Frame>
      <h1>PRODUCT</h1>
      <div className="product-btns">
        <Button onClick={onClick} type="primary" size="large">
          Add Product
        </Button>
      </div>
      <Table className="product-table" columns={productCol} dataSource={data} />
    </Frame>
  );
};
export default Product;
