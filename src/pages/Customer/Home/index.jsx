import "./home.css";
import Navbar from "../../../Components/Customer/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../../Components/Customer/Product";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const fetchCategory = async () => {
    const response = await axios.get("http://localhost:8000/category");
    setCategory(response.data);
  };
  const fetchProduct = async () => {
    const response = await axios.get("http://localhost:8000/product");
    setProduct(response.data);
  };

  
  const fetchProductWithCat = async (catId) => {
    const response = await axios.get(
      `http://localhost:8000/product?category=${catId}`
    );
    setProduct(response.data);
  };
  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);
  console.log(category);
  console.log(product);
  return (
    <div className="home">
      <ToastContainer />
      <Navbar />
      <div className="home-img"></div>
      <div className="home-category">
        <div className="home-category-container">
          {category.map((item) => (
            <div
              onClick={() => {
                fetchProductWithCat(item._id);
              }}
              className="image-div"
            >
              <img src={item.image} alt="" crossOrigin="anonymous" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="product-container">
        {product.map((item) => (
          <Product
            thumbnailImage={item.thumbnailImage}
            name={item.name}
            description={item.description}
            price={item.price}
            discount={item.discount}
            sellerid={item.sellerid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
