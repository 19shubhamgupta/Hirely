import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiFileUserLine } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineBook } from "react-icons/ai";
import { FaRobot } from "react-icons/fa";
import { RiMagicLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCourseStore } from "../store/useCourseStore";
import { useStoreAuth } from "../store/useAuthStore";

const Sidebar = ({ open, setOpen }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState(null);
  const { userRoadmaps, getUserRoadmaps } = useCourseStore();
  const { logout } = useStoreAuth();

  useEffect(() => {
    getUserRoadmaps();
  }, [getUserRoadmaps]);

  const menus = [
    {
      name: "Create Resume",
      link: "/templates",
      icon: RiFileUserLine,
    },
    {
      name: "AI Resume Tailor",
      link: "/tailorinput",
      icon: RiMagicLine,
    },
    {
      name: "My Resumes",
      link: "/my-resumes",
      icon: FaUser,
    },

    {
      name: "Roadmaps",
      icon: BsBarChartFill,
      id: "roadmaps",
      children: [
        {
          name: "Official Roadmaps",
          link: "/roadmap",
          icon: MdMenuBook,
        },
        {
          name: "AI Generated Roadmaps",
          icon: AiOutlineBook,
          id: "ai-roadmaps",
          children: userRoadmaps.map((roadmap) => ({
            name: roadmap.title,
            link: `/roadmap/customize-roadmap/course/${roadmap.id}`,
            icon: AiOutlineBook,
          })),
        },
      ],
    },
    {
      name: "Generate Roadmaps",
      link: "/course-generator",
      icon: FaRobot,
    },
    {
      name: "Mock Interviews",
      link: "/interview",
      icon: MdMenuBook,
    },
    {
      name: "Logout",
      icon: RiLogoutBoxLine,
      action: "logout", // Special action instead of link
    },
  ];

  const toggleSubmenu = (id) => {
    if (activeSubmenu === id) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(id);
      // Close nested submenu when parent is closed
      setActiveNestedSubmenu(null);
    }
  };

  const toggleNestedSubmenu = (id) => {
    if (activeNestedSubmenu === id) {
      setActiveNestedSubmenu(null);
    } else {
      setActiveNestedSubmenu(id);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-blue-900 px-4 fixed left-0 top-0 pt-4 border-r-4 border-black bg-white`}
      style={{
        zIndex: 1000,
      }}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <div key={i} className="group">
            {menu.children ? (
              // Menu with submenu
              <>
                <div
                  className={`
                    flex items-center gap-3.5 font-medium cursor-pointer p-2 hover:bg-blue-100 rounded-md
                    ${activeSubmenu === menu.id ? "bg-blue-100" : ""}
                  `}
                  onClick={() => toggleSubmenu(menu.id)}
                  style={{ color: "#1e3a8a" }}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 truncate max-w-[150px] ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                    title={menu.name}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu.name}
                  </h2>
                  {open && (
                    <span className="ml-auto">
                      {activeSubmenu === menu.id ? "▲" : "▼"}
                    </span>
                  )}
                </div>

                {/* Submenu */}
                {open && activeSubmenu === menu.id && (
                  <div className="ml-6 mt-2 flex flex-col gap-2">
                    {menu.children.map((submenu, j) => (
                      <div key={j}>
                        {submenu.children ? (
                          // Nested submenu
                          <>
                            <div
                              className={`
                                flex items-center gap-3.5 font-medium cursor-pointer p-2 hover:bg-blue-100 rounded-md
                                ${
                                  activeNestedSubmenu === submenu.id
                                    ? "bg-blue-100"
                                    : ""
                                }
                              `}
                              onClick={() => toggleNestedSubmenu(submenu.id)}
                              style={{ color: "#1e3a8a" }}
                            >
                              <div>
                                {React.createElement(submenu.icon, {
                                  size: "18",
                                })}
                              </div>
                              <h2
                                className={`whitespace-pre duration-500 truncate max-w-[120px] ${
                                  !open &&
                                  "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                                title={submenu.name}
                              >
                                {submenu.name}
                              </h2>
                              {open && (
                                <span className="ml-auto">
                                  {activeNestedSubmenu === submenu.id
                                    ? "▲"
                                    : "▼"}
                                </span>
                              )}
                            </div>
                            {/* Nested submenu items */}
                            {open && activeNestedSubmenu === submenu.id && (
                              <div className="ml-6 mt-2 flex flex-col gap-2">
                                {submenu.children.map((nestedSubmenu, k) => (
                                  <Link to={nestedSubmenu.link} key={k}>
                                    <div
                                      className="flex items-center gap-3.5 font-medium p-2 hover:bg-blue-100 rounded-md"
                                      style={{ color: "#1e3a8a" }}
                                    >
                                      <div>
                                        {React.createElement(
                                          nestedSubmenu.icon,
                                          { size: "16" }
                                        )}
                                      </div>
                                      <h2
                                        className={`whitespace-pre duration-500 truncate max-w-[150px] ${
                                          !open &&
                                          "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                        title={nestedSubmenu.name}
                                      >
                                        {nestedSubmenu.name}
                                      </h2>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          // Regular submenu item
                          <Link to={submenu.link}>
                            <div
                              className="flex items-center gap-3.5 font-medium p-2 hover:bg-blue-100 rounded-md"
                              style={{ color: "#1e3a8a" }}
                            >
                              <div>
                                {React.createElement(submenu.icon, {
                                  size: "18",
                                })}
                              </div>
                              <h2
                                className={`whitespace-pre duration-500 truncate max-w-[120px] ${
                                  !open &&
                                  "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                                title={submenu.name}
                              >
                                {submenu.name}
                              </h2>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : // Regular menu item without submenu
            menu.action === "logout" ? (
              // Logout button - handle click instead of link
              <div
                onClick={logout}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red-100 rounded-md cursor-pointer`}
                style={{ color: "#dc2626" }}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 truncate max-w-[150px] ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                  title={menu.name}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu.name}
                </h2>
              </div>
            ) : (
              // Regular link menu item
              <Link
                to={menu.link}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-100 rounded-md`}
                style={{ color: "#1e3a8a" }}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 truncate max-w-[150px] ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                  title={menu.name}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu.name}
                </h2>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
