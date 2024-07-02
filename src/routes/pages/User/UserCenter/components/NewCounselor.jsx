import React from "react";
import "./NewCounselor.css";
import { InfoList } from "./InfoList";
import { Link } from "react-router-dom";

export const NewCounselor = ({
    counselors
}) => {
    return(
        <div className="newcounselor-container">
            <div className="add-info">
                <h4>신규상담사 소개</h4>
                <Link to = '/user/notice'>
                    <span>더보기 +</span>
                </Link>
            </div>
            <InfoList 
                counselors = {counselors}
            />
        </div>
    )
}