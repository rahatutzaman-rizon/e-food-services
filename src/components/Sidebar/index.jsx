import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function SideBar() {
  const [menuItems, setMenuItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transitionClass, setTransitionClass] = useState("");
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    setTransitionClass(isSidebarOpen ? "translate-x-0" : "-translate-x-full");
  }, [isSidebarOpen]);

  useEffect(() => {
    axios.get("/sideMenu.json").then((res) => setMenuItems(res.data));
  }, []);

  const openSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Hamburger icon for xs screens */}
      <div
        className="lg:hidden text-xl p-3 cursor-pointer absolute z-20 mt-3 ml-[1%]"
        onClick={openSidebar}
      >
        {!isSidebarOpen ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faX} />
        )}
      </div>

      {/* Sidebar for lg screens */}
      <div
        className={`w-[22%] lg:block xs:hidden overflow-y-auto fixed bg-white text-black`}
      >
        <div className="h-[100vh]">
          <div className="text-3xl font-bold mb-11 p-3 text-center mt-5">
            <h2>DigitalMenu</h2>
          </div>
          <div className="">
            {menuItems.map((menuItem, index) => (
              <NavLink
                to={menuItem.path}
                key={index}
                className={`w-[72%] mx-auto rounded-2xl flex gap-4 mt-2 items-center p-3 text-lg font-semibold text-[#A098AE] ${
                  menuItem.name === "QR Code" ? "pl-0 gap-0" : ""
                } ${
                  activeMenu === menuItem.name ? "bg-[#ffa901] text-white" : ""
                }`}
                onClick={() => setActiveMenu(menuItem.name)}
              >
                <svg
                  width={`${menuItem.name === "QR Code" ? "60" : "33"}`}
                  height="33"
                  viewBox={`${0} ${0} ${
                    menuItem.name === "Expense"
                      ? 1
                      : menuItem.name === "QR Code"
                      ? 22
                      : 40
                  } ${menuItem.name === "QR Code" ? 20 : 40}`}
                  fill={activeMenu === menuItem.name ? "white" : "gray"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={menuItem.icon} />
                </svg>

                <span>{menuItem.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for xs screens */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 cursor-pointer"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar content for xs screens */}
      {isSidebarOpen && (
        <div
          className={`lg:hidden fixed inset-y-0 left-0 xs:w-[60%] md:w-[40%] bg-white text-black z-10 transition-transform duration-500 ease-in-out ${transitionClass}`}
        >
          <div className="text-xl font-bold p-3 ml-[15%] mt-3">
            <h2>DigitalMenu</h2>
          </div>
          <div className="inline-block rounded-full ml-3 mt-2 cursor-pointer"></div>
          <div>
            {menuItems.map((menuItem, index) => (
              <NavLink
                to={menuItem.path}
                key={index}
                className={`w-[72%] mx-auto rounded-2xl flex gap-4 mt-2 items-center p-3 text-sm font-semibold text-[#A098AE] ${
                  activeMenu === menuItem.name ? "bg-[#ffa901] text-white" : ""
                }`}
                onClick={() => {
                  setActiveMenu(menuItem.name);
                  setIsSidebarOpen(false);
                }}
                // onClick={openSidebar}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 40 40"
                  fill={activeMenu === menuItem.name ? "white" : "gray"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={menuItem.icon} />
                </svg>
                <span>{menuItem.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
