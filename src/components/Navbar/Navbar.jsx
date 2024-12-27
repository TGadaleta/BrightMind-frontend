// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthedUserContext } from "../../App";

const Navbar = (props) => {
  const user = useContext(AuthedUserContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.navLink}>
          Brightmind
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {user ? (
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                Dashboard
              </Link>
            </li>
          ) : (
            <></>
          )}
          <li className={styles.navItem}>
            <Link to="/courses" className={styles.navLink}>
              Courses
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          {user ? (
            <li className={styles.navItem}>
              <Link
                to="/"
                onClick={props.handleSignout}
                className={styles.navLink}
              >
                SignOut
              </Link>
            </li>
          ) : (
            <li className={styles.navItem}>
              <Link to="/signup" className={styles.navLink}>
                SignUp
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
