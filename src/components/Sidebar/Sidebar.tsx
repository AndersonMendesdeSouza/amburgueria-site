import { NavLink } from "react-router-dom";
import { FiClipboard, FiHeart, FiHome, FiUser } from "react-icons/fi";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
        <nav className={styles.menu}>
          <NavLink
            to="/main"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <FiHome className={styles.icon} />
            <span>Início</span>
          </NavLink>

          <NavLink
            to="/pedidos"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <FiClipboard className={styles.icon} />
            <span>Pedidos</span>
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <FiHeart className={styles.icon} />
            <span>Favoritos</span>
          </NavLink>

          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <FiUser className={styles.icon} />
            <span>Perfil</span>
          </NavLink>
        </nav>
    </aside>
  );
}
