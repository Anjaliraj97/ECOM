import "./addsubcategory.css";
import { Input, Button, Upload, Select } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
const AddSubCategory = () => {
  const [data, setData] = useState({ name: "", image: "" });
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState({ name: "", image: "" });

  const { id } = useParams();
  // console.log(id);
  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category");
      const actualData = response.data.map((item) => {
        return { label: item.name, value: item._id };
      });
      setCategory(actualData);
    } catch (e) {
      console.log(e);
    }
  };
  const getSubcategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/subcategory/${id}`
      );
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
    fetchCategory();
    if (id) {
      getSubcategory();
    }
  }, []);

  const navigate = useNavigate();

  const onChange = (e, key) => {
    if (key === "categoryid") {
      setData({ ...data, categoryid: e });
    } else {
      setData({ ...data, [key]: e.target.value });
    }
  };

  const addSubcategory = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/subcategory", data);
      setLoading(false);
      navigate("/seller/subcategory");
    } catch (e) {
      console.log(e);
    }
  };
  const editSubcategory = async () => {
    setLoading(true);

    try {
      await axios.patch(`http://localhost:8000/subcategory/${id}`, data);
      setLoading(false);
      navigate("/seller/subcategory");
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = () => {
    if (id) {
      editSubcategory();
    } else {
      addSubcategory();
    }
  };
  const onUploadChange = (info) => {
    if (info.file.status == "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };
  return (
    <div className="add-subcategory">
      <h1>{id ? "EDIT SUBCATEGORY" : "ADD SUBCATEGORY"}</h1>
      <div className="form">
        <label>Name</label>
        <Input
          onChange={(e) => onChange(e, "name")}
          size="large"
          placeholder="Name"
          value={data.name}
        />
        <label>Category:</label>
        <Select
          defaultValue="select category"
          className="category-select"
          options={category}
          onChange={(e) => onChange(e, "categoryid")}
        />
        <div className="upload-div">
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
        <Button
          className="ctgybtn"
          type="primary"
          size="large"
          onClick={onClick}
        >
          {id ? "EDIT SUBCATEGORY" : "ADD SUBCATEGORY"}
        </Button>
      </div>
    </div>
  );
};

export default AddSubCategory;
