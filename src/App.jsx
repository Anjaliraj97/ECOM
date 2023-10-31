import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import SellerLogin from "./pages/SellerLogin";
import SellerDashboard from "./pages/SellerDashboard";
import SellerSignup from "./pages/SellerSignup";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import Subcategory from "./pages/Subcategory";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import AddSubcategory from "./pages/AddSubcategory";
import Accounts from "./pages/Accounts";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";
import Signout from "./pages/Signout";
import { Navigate } from "react-router-dom";
import Home from "./pages/Customer/Home";
import Login from "./pages/Customer/Login";
function App() {
  const Token = ({ children }) => {
    const token = localStorage.getItem("token");
    if (token) {
      return <>{children}</>;
    } else return <Navigate to="/seller/login" />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/seller/dashboard"
          element={
            <Token>
              <SellerDashboard />
            </Token>
          }
        />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route
          path="/seller/dashboard"
          element={
            <Token>
              <SellerDashboard />
            </Token>
          }
        />
        <Route path="/seller/signup" element={<SellerSignup />} />
        <Route
          path="/seller/category"
          element={
            <Token>
              <Category />
            </Token>
          }
        />
        <Route
          path="/seller/addcategory"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/addcategory/:id"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route path="/seller/subcategory" element={<Subcategory />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/seller/addsubcategory" element={<AddSubcategory />} />
        <Route path="/seller/addsubcategory/:id" element={<AddSubcategory />} />
        <Route path="/seller/product" element={<Product />} />
        <Route path="/seller/addproduct" element={<AddProduct />} />
        <Route path="/seller/addproduct/:id" element={<AddProduct />} />
        <Route path="/seller/accounts" element={<Accounts />} />
        <Route path="/seller/inventory" element={<Inventory />} />
        <Route
          path="/seller/order"
          element={
            <Token>
              <Order />
            </Token>
          }
        />
        <Route path="/seller/signout" element={<Signout />} />
      </Routes>
    </>
  );
}

export default App;
