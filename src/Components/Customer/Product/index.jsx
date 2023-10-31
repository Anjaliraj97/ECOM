import "./product.css";
import { Card, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Product = (props) => {
  const [customer, setCustomer] = useState({});
  const getCustomerById = async () => {
    const customerid = localStorage.getItem("customerid");
    console.log(customerid);
    const response = await axios.get(
      `http://localhost:8000/customer/${customerid}`
    );
    setCustomer(response.data);
  };

  const onBuy = async () => {
    const customerid = localStorage.getItem("customerid");
    const sellerid = props.sellerid;
    const products = [
      {
        productid: props.id,
        quantity: 1,
      },
    ];
    await getCustomerById();
    const address = customer.address;
    await axios.post("http://localhost:8000/order", {
      customerid: customerid,
      sellerid: sellerid,
      products: products,
      shippingaddress: address,
    });
    toast("order placed");
  };
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={props.thumbnailImage} />}
    >
      <div className="content">
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <h2>{props.price}</h2>
        <h3>{props.discount}</h3>
        <div className="btns">
          <Button onClick={onBuy}>BUY</Button>
          <Button>ADD TO CART</Button>
        </div>
      </div>
    </Card>
  );
};
export default Product;
