import "./login.css";
import { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState({ email: "", password: "" });

  const loginCustomer = async () => {
    setLoading(true);

    try {
      const user = await axios.post(
        "http://localhost:8000/customer/login",
        data
      );
      const customerid = user.data.customerid;
      const token = user.data.token;
      localStorage.setItem("customerid", customerid);
      localStorage.setItem("token", token);
      console.log(user);
      setLoading(false);
      navigate("/");
      console.log("logged in");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const onClick = () => {
    loginCustomer();
  };
  return (
    <div className="customer-login">
      <h1>ECOM APP</h1>
      <div className="form">
        <label>Email:</label>
        <Input
          onChange={(e) => onChange(e, "email")}
          placeholder="Email"
          size="large"
        />
        <label>Password:</label>
        <Input.Password
          onChange={(e) => onChange(e, "password")}
          placeholder="Password"
          size="large"
        />
        <Button onClick={onClick} className="btn" size="large" type="primary">
          LOGIN
        </Button>
        <p>Not a member? Sign Up</p>
      </div>
    </div>
  );
};

export default Login;
