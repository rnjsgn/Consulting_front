import React from "react";
import { NoticeBox } from "../../../../../components/Layout/NoticeBox/NoticeBox";
import { Link } from "react-router-dom";

export const NoticeList = ({
    counselors
}) => {
    return (
        <div className="noticelist">
            {
                counselors.map((counselor) => (
                    <Link to = {`/user/notice/detail/${counselor.id}`}>
                        <NoticeBox
                            counselor={counselor}
                        />
                    </Link>
                ))
            }
        </div>
    )
}