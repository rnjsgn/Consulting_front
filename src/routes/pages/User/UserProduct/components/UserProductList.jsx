import React from "react";
import './UserProductList.css';
import { CounselorCard } from "../../../../../components/Layout/CounselorCard/CounselorCard";

export const UserProductList = ({
    histories,
    moveCounselorDetail,
    usertype
}) => {
    return (
        <div className="userproduct-container">
            <div className="userproduct-list">
                <CounselorCard
                    usertype={usertype}

                    histories={histories}
                    moveCounselorDetail={moveCounselorDetail}
                />
            </div>
        </div>
    )
}