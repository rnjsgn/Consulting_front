import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import './ShowReview.css'

export const ShowReview = ({
    isShowReviews,
    toggleShowReviews
}) => {
    return (
        <div className="show-review-container" onClick={toggleShowReviews}>
            <div>
                {
                    isShowReviews ?
                        <FontAwesomeIcon icon={faAngleDown} /> :
                        <FontAwesomeIcon icon={faAngleRight} />
                }
            </div>
            <div>
                <span>후기 작성</span>
            </div>
        </div>
    )
}