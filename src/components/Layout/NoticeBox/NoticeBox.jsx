import React from "react";
import "./NoticeBox.css";

import { Lock } from "../../../assets/mymenuImg";

export const NoticeBox = ({
    counselor,
    write
}) => {

    const convertIsoToCustomFormat = function (isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear().toString().slice();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    return(
        <>
        {
            write
            ?
            <div className="noticelist-container">
                <div className="notice-top">
                    {
                        write.secret_accept === 1 ?
                        <Lock />
                        :
                        <></>
                    }
                    <div className="notice-category">
                        <span>제목</span>
                    </div>
                    <div className="notice-title">
                        <span>{write?.title}</span>
                    </div>
                </div>
                {/* <div className="notice-date">
                    <span>{convertIsoToCustomFormat(counselor?.createdAt)}</span>
                </div> */}
            </div>
            :
            <div className="noticelist-container">
                <div className="notice-top">
                    <div className="notice-category">
                        <span>공지</span>
                    </div>
                    <div className="notice-title">
                        <span>[{counselor?.category}] 신규상담사 {counselor?.nickname}({counselor?.id}번) 등록을 알려드립니다.</span>
                    </div>
                </div>
                <div className="notice-date">
                    <span>{convertIsoToCustomFormat(counselor?.createdAt)}</span>
                </div>
            </div>
        }
        </>
    )
}