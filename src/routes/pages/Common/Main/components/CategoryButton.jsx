import React, { useState } from "react";
import { taro, sin, saju, review } from '../../../../../assets/navImg';
import { Link } from "react-router-dom";
import './CategoryButton.css';

import { mainTaroIcon, mainSinjumIcon, mainSajuIcon, mainReviewIcon } from "../../../../../assets/navImg";

export const CategoryButton = () => {
    const [categories] = useState([
        {
            img: taro,
            text: '전화타로',
            link: `/consulting/list?category=타로`,
        },
        {
            img: sin,
            text: '전화신점',
            link: `/consulting/list?category=신점`,
        },
        {
            img: saju,
            text: '전화사주',
            link: `/consulting/list?category=사주`,
        },
        {
            img: review,
            text: '후기모음',
            link: `/review`,
        },
    ]);

    return (
        <ul className="category-button-container">
            {
                categories.map(category => (
                    <li className="category-button">
                        <Link className="category-link" to={category.link}>
                            <span className="category-text">
                                {category.text}
                            </span>
                            <img src={category.img} alt={category.text} />
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}