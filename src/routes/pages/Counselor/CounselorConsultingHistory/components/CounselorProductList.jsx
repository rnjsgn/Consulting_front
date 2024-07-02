import React from "react";
import { CounselorCard } from "../../../../../components/Layout/CounselorCard/CounselorCard";
import "./CounselorProductList.css"

export const CounselorProductList = ({
    histories,
    
    usertype,
}) => {
    return (
        <div className="counselorproduct-container">
            <div className="counselorproduct-list">
                <CounselorCard
                    usertype = {usertype}

                    histories = {histories}
                />
            </div>
        </div>
    )
}