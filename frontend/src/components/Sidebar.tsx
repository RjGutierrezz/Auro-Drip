import { NavLink } from 'react-router-dom'
import { sidebarLinks } from "../constants";
import type { AnimatedIconHandle } from "./icons/types"
import { useRef } from "react"

const Sidebar = () => {
  const iconRefs = useRef<Record<string, AnimatedIconHandle | null>>({})

  return (
    <aside className="sidebar">
      <h2 className="nav-title">Aura Drip</h2>
      <nav className="sidebar-nav">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.href}
              onMouseEnter={() => iconRefs.current[link.name]?.startAnimation()}
              onMouseLeave={() => iconRefs.current[link.name]?.stopAnimation()}
            >
              <Icon ref={(el) => { iconRefs.current[link.name] = el }} size={20} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
