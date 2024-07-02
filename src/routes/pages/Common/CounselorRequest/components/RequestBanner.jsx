import React from "react";
import img from "./RequestCounselor.png";
import "./RequestBanner.css";
import { Button } from "../../../../../components/Layout/Button/Button";
import { Link } from "react-router-dom";

export const RequestBanner = () => {
    return(
        <div className="Banner-container">
            <img src={img} />
            <Link to = '/counselor/apply'>
                <div className="Banner-button">
                    <Button title={"주야주야 상담사 신청"}/>
                </div>
            </Link>
        </div>
    )
}