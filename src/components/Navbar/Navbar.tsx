import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <NavLink
                to="/"
                end
                className={({ isActive }) => `${styles.navbarButton} ${isActive ? styles.active : ""}`}
            >
                Catch
            </NavLink>
            <NavLink
                to="/obtained"
                className={({ isActive }) => `${styles.navbarButton} ${isActive ? styles.active : ""}`}
            >
                Obtained
            </NavLink>
        </nav>
    );
}
