import React from "react";
import "./CounselorReview.css";
import ReviewCard from "../../../Review/components/ReviewCard";
import WriteReview from "../../../../User/UserWriteReview/components/WriteReview";
import { Link } from "react-router-dom";
import { ShowReview } from "./ShowReview";

const CounselorReview = ({
    userType,

    counselor_id,

    reviews,
    isShowReviews,
    toggleShowReviews,

    // isClick,
    // setIsClick,
    clickEvent,
}) => {
    return (
        <div className="review-container">
            {/* <Link to={`/user/review/write/${counselor_id}`}><button>후기 작성하기</button></Link> */}
            {/* 후기 작성 카드 */}
            {/* {
                userType === '고객' &&
                <ShowReview
                    isShowReviews={isShowReviews}
                    toggleShowReviews={toggleShowReviews}
                />
            }
            {
                isShowReviews &&
                <div className={`review-box ${isShowReviews}`}>
                    <WriteReview
                        cols={5}
                        padding={'0 0.6rem'}

                        isClick={isClick}
                        setIsClick={setIsClick}
                    />
                </div>
            } */}
            <ReviewCard
                reviews={reviews}
            />
        </div>
    )
}

export default CounselorReview;