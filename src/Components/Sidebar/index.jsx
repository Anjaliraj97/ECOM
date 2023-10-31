import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem("sellerid");
    localStorage.removeItem("token");
    navigate("/seller/login");
  };
  return (
    <div className="sidebar">
      <div className="logo-section">
        <i class="fa-solid fa-cart-shopping fa-beat"></i>
        <h1>ECOM APP</h1>
      </div>
      <h2 className="section-heading">Dashboard</h2>
      <div className="dashboard-section">
        <NavLink className="sidebar-link" to="/seller/dashboard">
          <i class="fa-solid fa-table-columns"></i>
          DashBoard
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/product">
          <i class="fa-solid fa-warehouse"></i>
          Inventory
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/category">
          <i class="fa-regular fa-layer-group"></i>
          Category
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/subcategory">
          <i class="fa-brands fa-slack"></i>
          Sub Category
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/order">
          <i class="fa-solid fa-truck"></i>
          Orders
        </NavLink>
      </div>
      <h2 className="section-heading">Settings</h2>
      <div className="settings-section">
        <NavLink className="sidebar-link" to="/seller/accounts">
          <i class="fa-solid fa-user"></i>
          Accounts
        </NavLink>

        <p className="sidebar-link" onClick={onClick}>
          <i class="fa-solid fa-right-from-bracket"></i>
          Sign Out
        </p>
      </div>
    </div>
  );
};
export default Sidebar;
