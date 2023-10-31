import "./subcategory.css";
import Sidebar from "../../Components/Sidebar";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const Subcategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const subcategoryCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addsubcategory/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text} className="subcategory-img" crossOrigin="anonymous" />
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
      await axios.delete(`http://localhost:8000/subcategory/${id}`);
    } catch (e) {
      console.log(e);
    }
    fetchCategory();
  };

  const fetchCategory = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8000/subcategory");
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
    navigate("/seller/addsubcategory");
  };

  return (
    <div className="sub-category">
      <Sidebar />
      <div className="subcategory-container">
        <h1>SUB CATEGORY</h1>
        <div className="subcategory-btns">
          <Button onClick={onClick} type="primary" size="large">
            Add SubCategory
          </Button>
        </div>
        <Table
          className="subcategory-table"
          columns={subcategoryCol}
          dataSource={data}
        />
      </div>
    </div>
  );
};
export default Subcategory;
