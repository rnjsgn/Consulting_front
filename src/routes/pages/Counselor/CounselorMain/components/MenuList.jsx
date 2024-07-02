import React from "react";
import './MenuList.css';
import { Link } from "react-router-dom";

export const MenuList = ({
    myMenuItems,

    histories,

    title,
}) => {
    return (
        <div className="mymenu-tab">
            {
                title &&
                <span className="mymenu-title">{title}</span>
            }
            <ul className="mymenu-grid"  style={ title ? { gridTemplateRows: 'repeat(1, 0.5fr)', height: '50%'} : { gridTemplateRows: 'repeat(2, 1fr)', marginTop: '0.5rem'}}>
                {
                    myMenuItems &&
                    myMenuItems.map((myMenuItem, idx) =>
                    (
                        <>
                            <li className={`menu-item ${idx}`} key={`menu-item ${idx}`}>
                                <Link className="menu-item-link" to={myMenuItem.path}>
                                    {myMenuItem.img}
                                    <span>{myMenuItem.title}</span>
                                </Link>
                            </li>
                        </>
                    )
                    )
                }
            </ul>
        </div>
    )
}