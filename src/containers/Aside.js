import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useHistory } from "react-router-dom";
import React from "react";
import usePath from "../hooks/usePath";

// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SubMenu,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter
// } from "react-pro-sidebar";
import { SiElastic } from "react-icons/si";

const Aside = ({ rtl, toggled, handleToggleSidebar }) => {
  //   const intl = useIntl();
  const history = useHistory();

  const headerStyle = {
    padding: "10px",
    textTransform: "uppercase",
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "2.5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "Wrap",
    display: "flex",
    alignItems: "center",
    margin: "auto",
    paddingTop: "60px",
  };

  const path = usePath();
  // const social = usePath();

  const navigate = (path) => {
    handleToggleSidebar();
    history.push(path);
  };

  const paths = [
    {
      path: "/swap",
      label: "Buy",
      icon: <SiElastic />,
    },
  ];

  return (
    <ProSidebar
      rtl={rtl}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader style={headerStyle}>
        <h1>LOP</h1>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          {paths.map((item, index) => (
            <MenuItem
              // className="m-1 text-white text-sm font-medium flex items-center justify-center"
              active={path === item.path}
              key={index}
              icon={item.icon}
              onClick={() => navigate(item.path)}
            >
              {item.label}
              {/* <Link to={item.path}>{item.label}</Link> */}
            </MenuItem>
          ))}
        </Menu>
      </SidebarContent>
      {/* <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px"
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span> {intl.formatMessage({ id: "viewSource" })}</span>
          </a>
        </div>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
