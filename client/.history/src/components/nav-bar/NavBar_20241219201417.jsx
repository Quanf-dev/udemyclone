import React, { useState } from "react";
import styles from "./NavBar.module.css";
import SearchBar from "../search-bar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import ConfirmTeachModal from "../teach-on-udemy-modal/ConfirmTeachModal";

function NavBar() {
  // dùng để chuyển trang
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    localStorage.removeItem("avatar");
    localStorage.removeItem("role");
    localStorage.removeItem("active");
    localStorage.removeItem("token");

    message.success("Đăng xuất thành công");
    // redirect
    navigate("/login");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.menuButton}>
            <button type="button" name="menu-icon">
              <i className="fa-solid fa-bars"></i>
            </button>
          </li>
          <li className={styles.logo}>
            <Link to="/">
              <img
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
                alt="udemy-logo"
              />
            </Link>
          </li>
          <li className={styles.categoriesButton}>
            <button type="button" name="categories-button">
              Categories
            </button>
          </li>
          <SearchBar />
          <li className={styles.searchButton}>
            <button type="button" name="search-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
          <li className={styles.udemyBusinessButton}>
            <button type="button" name="udemy-business">
              Udemy Business
            </button>
          </li>
          <li className={styles.teachOnUdemyButton}>
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              name="teach-on-udemy-button"
            >
              Teach on Udemy
            </button>
          </li>
          <li className={styles.cartButton}>
            <button
              onClick={() => navigate("/favorite")}
              type="button"
              name="cart-button"
            >
              <i className="fa-regular fa-heart"></i>
            </button>
          </li>
          {!token ? (
            <>
              <li className={styles.loginButton}>
                <button type="button" name="login-button">
                  <Link to="/login">Login</Link>
                </button>
              </li>
              <li className={styles.signupButton}>
                <button type="button" name="signup-button">
                  <Link to="/signup">Sign up</Link>
                </button>
              </li>
            </>
          ) : (
            <li className={styles.signupButton}>
              <button type="button" name="signup-button" onClick={logout}>
                Logout
              </button>
            </li>
          )}
          <li className={styles.langButton}>
            <button type="button" name="language-button">
              <Link to={"edit-profile"}>
                <i className="fa-solid fa-user"></i>
              </Link>
            </button>
          </li>
        </ul>
      </nav>
      <ConfirmTeachModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default NavBar;
