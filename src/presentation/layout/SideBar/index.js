import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LogoutIcon from "@mui/icons-material/Logout"; // Add Logout Icon
import {
  adminSideBarData,
  clientSideBarData,
  onboardingSideBarData,
  settlementSideBarData,
} from "../NavData";
import secureStorage from "../../../utility/secureStorage";
import styles from "./sidenav.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { enqueueSnackbar } from "notistack"; // Snackbar for notifications
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { useDispatch } from "react-redux";
import { authAction } from "../../../data/local/redux/action/authAction";
import { LogoFinal } from "../../resources/assetsManager";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [navData, setNavData] = useState(adminSideBarData);
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after logout
  const dispatch = useDispatch(); // For managing auth state



  // Logout Functionality
  const logout = () => {
    ApiRequestPost.logout()
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Logout Successfully", { variant: "success" });
          secureStorage.clear();
          navigate("/login");
          dispatch(authAction(false));
        }
      })
      .catch(() => {
        enqueueSnackbar("Logout Failed", { variant: "error" });
      })
      .finally(() => {
        secureStorage.clear();
        navigate("/login");
        dispatch(authAction(false));
      });
  };

  useEffect(() => {
    const role = secureStorage.getItem("role");
    setNavData(
      role === "Admin"
        ? adminSideBarData
        : role === "Client"
        ? clientSideBarData
        : role === "Onboarding"
        ? onboardingSideBarData
        : role === "Settlement"
        ? settlementSideBarData
        : []
    );
    setSelectedItem(0);
  }, []);

  const getSelectedIndex = (pathName) => {
    navData.forEach((item) => {
      if (item.link === pathName) {
        setSelectedItem(item.id);
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.link === pathName) {
            setSelectedItem(child.id);
          }
        });
      }
    });
  };

  const handleClick = (id) => {
    setSelectedItem(id);
    if (navData[id]?.children) {
      setOpenDropdowns((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  useEffect(() => {
    getSelectedIndex(location.pathname);
  }, [location]);

  const isChildSelected = (children) => {
    return children?.some((child) => child.id === selectedItem);
  };

  return (
    <div className={styles.sidenav}>
     <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <img style={{ width: 200 }} src={LogoFinal} alt="Logo" />
  </div>
    {/* Sidebar Navigation Items */}
    {navData.map((item) => (
      <div key={item.id} >
        <NavLink
          to={item.link}
          onClick={() => handleClick(item.id)}
          style={{
            textDecoration: "none",
            color: "#000000",
            display: "flex",
            flexDirection: "column",  
            alignItems: "center",      
            justifyContent: "center",  
            padding: "5px",          
          }}
          className={`${styles.navLink} ${
            selectedItem === item.id || isChildSelected(item.children)
              ? styles.active
              : ""
          }`}
        >
          {/* Icon with circle background when active */}
          <i
            className={`${styles.icon} ${
              selectedItem === item.id || isChildSelected(item.children)
                ? styles.activeIcon
                : ""
            }`}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%", 
              backgroundColor:
                selectedItem === item.id || isChildSelected(item.children)
                  ? "#64C466"          
                  : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           {item.icon && React.cloneElement(item.icon, { style: { fontSize: '40px' } })}
          </i>
          <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
    <span className={styles.linkText}>{item.text}</span>

    {/* Add the arrow icon if there are children */}
    {item.children && (
      <>
        {openDropdowns[item.id] ? (
          <ExpandLessIcon style={{ marginLeft: "5px", fontSize: "20px" }} />
        ) : (
          <ExpandMoreIcon style={{ marginLeft: "5px", fontSize: "20px" }} />
        )}
      </>
    )}
  </div>
        </NavLink>
  
        {/* Submenu for children */}
        {item.children && (
          <div
            className={`${styles.dropdownContainer} ${
              openDropdowns[item.id] ? styles.dropdownOpen : ""
            }`}
          >
            {item.children.map((child) => (
              <NavLink
                key={child.id}
                to={child.link}
                onClick={() => handleClick(child.id)}
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  display: "flex",
                  flexDirection: "column", 
                  alignItems: "center",
                  justifyContent: "center",
                  width: "150px",
                  padding: "10px",
                  marginLeft: "30px",
                  borderRadius: "5px",
                  background:
                    selectedItem === child.id ? "#449046" : "transparent",
                }}
                className={`${styles.navLink} ${
                  selectedItem === child.id ? styles.active : ""
                }`}
              >
                <i>{child.icon}</i>
                <span className={styles.linkText}>{child.text}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    ))}
  
    {/* Add Logout Button at the Bottom */}
    <div style={{ marginTop: "auto" }}>
      <NavLink
        onClick={logout}
        style={{
          textDecoration: "none",
          color: "#000000",
          display: "flex",
          flexDirection: "column",  // Column layout for logout as well
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
        className={styles.navLink}
      >
        <i
          className={styles.icon}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoutIcon />
        </i>
        <span className={styles.linkText}>Log out</span>
      </NavLink>
    </div>
  </div>
  
  );
};

export default SideBar;
