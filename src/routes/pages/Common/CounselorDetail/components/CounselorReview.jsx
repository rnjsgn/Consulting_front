import React from "react";
import "./CounselorReview.css";
import ReviewCard from "../../Review/components/ReviewCard";
import { Link } from "react-router-dom";
import { Button } from "antd";

const CounselorReview = ({
    reviews,
    counselor_id
}) => {
    return (
        <div>
            <div className="Button-form">
                <Link to={`/user/review/write/${counselor_id}`}><Button>후기 작성</Button></Link>    
            </div>
            <ReviewCard
                reviews={reviews}
            />
        </div>
    )
}

export default CounselorReview;