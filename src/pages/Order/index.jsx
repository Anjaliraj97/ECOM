import "./order.css";
import Frame from "../../Components/Frame";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Order = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const orderCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addorder/${id}`}>{id}</Link>,
    },
    {
      title: "Customer",
      dataIndex: "customerid",
      render: (customer) => <p>{customer.name}</p>,
    },
    {
      title: "Product",
      dataIndex: "products",
      render: (product) => <p>{product[0].productid}</p>,
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
      await axios.delete(`http://localhost:8000/order/${id}`);
    } catch (e) {
      console.log(e);
    }
    fetchOrder();
  };

  const fetchOrder = async () => {
    setLoading(true);

    try {
      const sellerid = localStorage.getItem("sellerid");
      const response = await axios.get(
        `http://localhost:8000/order?sellerid=${sellerid}`
      );
      setLoading(false);
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const onClick = () => {
    navigate("/seller/addorder");
  };
  return (
    <Frame>
      <h1>ORDER</h1>
      <div className="order-btns">
        <Button onClick={onClick} type="primary" size="large">
          Add Order
        </Button>
      </div>
      <Table className="order-table" columns={orderCol} dataSource={data} />
    </Frame>
  );
};
export default Order;
