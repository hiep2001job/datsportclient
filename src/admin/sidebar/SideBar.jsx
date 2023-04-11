import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.scss';

const sidebarNavItems = [
    // {
    //     display: 'Dashboard',
    //     icon: <i className='bx bx-home'></i>,
    //     to: '/admin',
    //     section: '/admin'
    // },
    {
        display: 'Products',
        icon: <i className='bx bx-star'></i>,
        to: '/admin/product',
        section: '/admin/product'
    },
    // {
    //     display: 'User',
    //     icon: <i className='bx bx-calendar'></i>,
    //     to: '/admin/user',
    //     section: '/admin/user'
    // },
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
    {
        display: 'Posts',
        icon: <i className='bx bx-user'></i>,
        to: '/admin/posts',
        section: '/admin/posts'
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

        let curPath = window.location.pathname;

        if(curPath.includes('/process-order')) curPath='/admin/order';
        if(curPath==='/admin'||curPath==='/admin/profile')curPath='/admin/product';

        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
        
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

