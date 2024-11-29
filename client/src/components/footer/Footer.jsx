import React from "react";
import LinksList from "../links-list/LinksList";
import links from "./links";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logoUdemy from "../../assets/logo-udemy.png";

function Footer() {
  return (
    <>
      <footer id="page-footer" className={styles.footer}>
        <div className={styles.linksContainer}>
          <div className={styles.languageSwitch}>
            <button className={styles.button}>
              <i className="fa-solid fa-globe"></i>
              <span>English</span>
            </button>
          </div>
          {links.map((group, idx) => (
            <LinksList className={styles.linksGroup} key={idx} links={group} />
          ))}
        </div>
        <div className={styles.logoCopyRights}>
          <Link to="/Udemy-Clone-ReactJS/">
            <img
              src={logoUdemy}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
          <div className={styles.copyRights}>© 2024 Udemy, Inc.</div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
