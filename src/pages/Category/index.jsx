import "./category.css";
import Frame from "../../Components/Frame";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const categoryCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addcategory/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text} className="category-img" crossOrigin="anonymous" />
      ),
    },
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
      await axios.delete(`http://localhost:8000/category/${id}`);
    } catch (e) {
      console.log(e);
    }
    fetchCategory();
  };

  const fetchCategory = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8000/category");
      setLoading(false);
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const onClick = () => {
    navigate("/seller/addcategory");
  };
  return (
    <Frame>
      <h1>CATEGORY</h1>
      <div className="category-btns">
        <Button onClick={onClick} type="primary" size="large">
          Add Category
        </Button>
      </div>
      <Table
        className="category-table"
        columns={categoryCol}
        dataSource={data}
      />
    </Frame>
  );
};
export default Category;
