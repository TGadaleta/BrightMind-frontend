// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link to='/' className={styles.navLink}>
					Brightmind
				</Link>
			</div>
			<nav className={styles.nav}>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<Link to='/' className={styles.navLink}>
							Dashboard
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link to='/courses' className={styles.navLink}>
							Courses
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link to='/about' className={styles.navLink}>
							About
						</Link>
					</li>
					<li className={styles.navItem}>
						<Link to='/signout' className={styles.navLink}>
							SignOut
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
