import "./sellersignup.css";
import { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerSignup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    password: "",
    confirmPassword: "",
    address: [
      {
        addressType: "",
        houseName: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
    ],
  });
  const [loading, setLoading] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
    password: "",
    confirmPassword: "",
    address: [
      {
        addressType: "",
        houseName: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
    ],
  });

  const signupSeller = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/seller/signup", data);
      setLoading(false);
      // navigate("/seller/dashboard");
      console.log("signed in");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const onClick = () => {
    signupSeller();
  };
  return (
    <div className="seller-signup">
      <h1>ECOM APP</h1>
      <div className="form">
        <label>Name:</label>
        <Input
          onChange={(e) => onChange(e, "name")}
          placeholder="Name"
          size="large"
        />
        <label>Email:</label>
        <Input
          onChange={(e) => onChange(e, "email")}
          placeholder="Email"
          size="large"
        />
        <label>PhonenNo:</label>
        <Input
          onChange={(e) => onChange(e, "phone")}
          placeholder="PhoneNo"
          size="large"
        />
        <label>Password:</label>
        <Input.Password
          onChange={(e) => onChange(e, "password")}
          placeholder="Password"
          size="large"
        />
        <label>Confirm Password:</label>
        <Input.Password
          onChange={(e) => onChange(e, "confirmPassword")}
          placeholder="Confirm Password"
          size="large"
        />

        <label>Address Type</label>
        <Input
          onChange={(e) => onChange(e, "addressType")}
          placeholder="Type"
          size="large"
        />
        <label>House Name</label>
        <Input
          onChange={(e) => onChange(e, "houseName")}
          placeholder="Name"
          size="large"
        />
        <label>Street</label>
        <Input
          onChange={(e) => onChange(e, "street")}
          placeholder="Street"
          size="large"
        />
        <label>City</label>
        <Input
          onChange={(e) => onChange(e, "city")}
          placeholder="City"
          size="large"
        />
        <label>State</label>
        <Input
          onChange={(e) => onChange(e, "houseName")}
          placeholder="State"
          size="large"
        />
        <label>Pincode</label>
        <Input
          onChange={(e) => onChange(e, "pincode")}
          placeholder="Pincode"
          size="large"
        />
        <Button onClick={onClick} className="btn" size="large" type="primary">
          Create Account
        </Button>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default SellerSignup;
