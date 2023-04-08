import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.scss';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/admin',
        section: '/admin'
    },
    {
        display: 'Products',
        icon: <i className='bx bx-star'></i>,
        to: '/admin/product',
        section: '/admin/product'
    },
    {
        display: 'User',
        icon: <i className='bx bx-calendar'></i>,
        to: '/admin/user',
        section: '/admin/user'
    },
    {
        display: 'Category',
        icon: <i className='bx bx-user'></i>,
        to: '/admin/category',
        section: '/admin/category'
    },
    {
        display: 'Brand',
        icon: <i className='bx bx-user'></i>,
        to: '/admin/brand',
        section: '/admin/brand'
    },
    {
        display: 'Slider',
        icon: <i className='bx bx-user'></i>,
        to: '/admin/slider',
        section: '/admin/slider'
    },
    {
        display: 'Orders',
        icon: <i className='bx bx-receipt'></i>,
        to: '/admin/order',
        section: '/admin/order'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname;
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
        console.log(window.location.pathname);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Animate
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;


// import React, { useState } from "react";
// import { AiOutlineHome } from "react-icons/ai";
// import { NavLink } from "react-router-dom";
// import Logo from "../../assets/images/1.avif";
// import { MdArrowBackIosNew } from "react-icons/md";
// import { FiUser } from "react-icons/fi";
// import { BsBag } from "react-icons/bs";
// const SideBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleClickToggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };
//   const list = [
//     {
//       icon: <AiOutlineHome size={24} color="white" />,
//       text: "Dashboard",
//       path: "/admin/dashboard",
//     },
//     {
//       icon: <FiUser size={24} color="white" />,
//       text: "User",
//       path: "/admin/user",
//     },
//     {
//       icon: <BsBag size={24} color="white" />,
//       text: "Product",
//       path: "/admin/product",
//     },
//     {
//       icon: <AiOutlineHome size={24} color="white" />,
//       text: "Customer",
//       path: "/admin/customer",
//     },
//   ];
//   return (
//     <div
//       className={`relative ${
//         isOpen ? "w-240" : "w-40"
//       } h-full border  bg-color_dark_admin transition-all duration-400 group`}
//     >
//       <div
//         onClick={handleClickToggleSidebar}
//         className="absolute top-10 right-0 transition-all duration-200 translate-x-full flex items-center justify-center w-0 group-hover:w-6 h-14 bg-color_dark_admin rounded-tr-md rounded-br-md"
//       >
//         {isOpen ? (
//           <div className="transition-all duration-400 hidden group-hover:block">
//             <MdArrowBackIosNew color="white" />
//           </div>
//         ) : (
//           <div className="rotate-180 transition-all duration-400 hidden group-hover:block">
//             <MdArrowBackIosNew color="white" />
//           </div>
//         )}
//       </div>
//       <div className="w-full">
//         <img src={Logo} alt="logo" className="w-80% h-40 object-cover" />
//       </div>
//       <ul className="my-8">
//         {list.map((item, idx) => {
//           return (
//             <NavLink
//               key={idx}
//               to={item.path}
//               style={({ isActive, isPending }) => {
//                 return {
//                   color: isActive ? "#f5d10d" : "white",
//                 };
//               }}
//             >
//               <li className="flex items-center mb-2 py-1 pl-2 border-b">
//                 <span className="inline-block mr-3">{item.icon}</span>
//                 <p
//                   className={`transition-opacity duration-400 font-semibold text-15 ${
//                     isOpen ? "opacity-100" : "opacity-0"
//                   }`}
//                 >
//                   {item.text}
//                 </p>
//               </li>
//             </NavLink>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default SideBar;
