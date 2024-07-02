import React from "react";
import img from "./ToCounselor.png";
import "./UserToBanner.css";
import { Button } from "../../../../../components/Layout/Button/Button";
import { Link } from "react-router-dom";

export const UserToBanner = ({
    goWrite
}) => {
    return(
        <div className="usertobanner-container">
            <div className="usertobanner-img">
                <img src={img} />
            </div>
            <div className="usertobanner-button">
                <Button 
                    title={"글쓰기"}

                    color={"black"}
                    backgroundColor={"#FEE140"}
                    borderColor={"#FEE140"}

                    onClick={() => goWrite('/user/towrite')}
                />
            </div>
        </div>
    )
}