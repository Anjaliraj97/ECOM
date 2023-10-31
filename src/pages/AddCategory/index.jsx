import "./addcategory.css";
import { Input, Button, Upload } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
const AddCategory = () => {
  const [data, setData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState({ name: "", image: "" });

  const { id } = useParams();
  console.log(id);

  const getCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/category/${id}`);
      setData({
        ...data,
        image: response.data.image,
        name: response.data.name,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, []);

  const navigate = useNavigate();
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const addCategory = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/category", data);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };
  const editCategory = async () => {
    setLoading(true);

    try {
      await axios.patch(`http://localhost:8000/category/${id}`, data);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = () => {
    if (id) {
      editCategory();
    } else {
      addCategory();
    }
  };
  const onUploadChange = (info) => {
    if (info.file.status == "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };
  return (
    <div className="add-category">
      <h1>{id ? "EDIT CATEGORY" : "ADD CATEGORY"}</h1>
      <div className="form">
        <label>Name</label>
        <Input
          className="input-box"
          onChange={(e) => onChange(e, "name")}
          size="large"
          placeholder="Name"
          value={data.name}
        />

        <div className="upload-div">
          <br />
          <label>Image</label>
          <br />
          <Upload
            name="file"
            action="http://localhost:8000/upload"
            onChange={onUploadChange}
          >
            <Button className="uploadbtn" icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
        </div>
        <br />
        <Button type="primary" size="large" onClick={onClick}>
          {id ? "EDIT CATEGORY" : "ADD CATEGORY"}
        </Button>
      </div>
    </div>
  );
};

export default AddCategory;
