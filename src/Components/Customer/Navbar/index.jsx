import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { Button } from "antd";
const Navbar = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("customerid");
    localStorage.removeItem("token");
    navigate("/");
  };
  const onLogIn = () => {
    localStorage.removeItem("customerid");
    localStorage.removeItem("token");
    navigate("/customer/login");
  };
  return (
    <div className="customer-navbar">
      <div className="left">
        <h1>ECOM</h1>
      </div>
      <div className="right">
        <p>Home</p>
        <p>Category</p>
        <p>Cart</p>
        <p>Orders</p>
        {localStorage.getItem("customerid") ? (
          <Button onClick={onLogOut}>Log Out</Button>
        ) : (
          <Button onClick={onLogIn}>Log In</Button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
