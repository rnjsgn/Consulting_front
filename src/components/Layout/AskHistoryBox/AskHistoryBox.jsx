import React from "react";
import { Button } from "../Button/Button";
import './AskHistoryBox.css';

export const AskHistoryBox = ({
    ask,
    userType,
    onClick
}) => {
    return (
        <div className="Box-layout">
            <div className="icon-layout">
                {/* 이미지 링크 https://icon-sets.iconify.design/streamline/customer-support-1/ */}
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 14 14">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                        d="M3 7V4.37A3.93 3.93 0 0 1 7 .5a3.93 3.93 0 0 1 4 3.87V7M1.5 5.5h1A.5.5 0 0 1 3 6v3a.5.5 0 0 1-.5.5h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1m11 4h-1A.5.5 0 0 1 11 9V6a.5.5 0 0 1 .5-.5h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1M9 12.25a2 2 0 0 0 2-2V8m-2 4.25a1.25 1.25 0 0 1-1.25 1.25h-1.5a1.25 1.25 0 0 1 0-2.5h1.5A1.25 1.25 0 0 1 9 12.25"></path>
                </svg>
            </div>
            <div className="contents-layout">
                {
                    ask.writer === '고객' ?
                        <p className="Question-Name">{ask.user.name}님의 문의</p>
                        :
                        <p className="Question-Name">{ask.counselor.name}님의 문의</p>
                }
                <p className="Question-Category">{ask.category}</p>
                {
                    ask.reply_id === null ?
                    <p className="Question-Status">문의 중</p>
                    :
                    <p className="Question-Status">문의 완료</p>
                }
            </div>
            <div className="button">
                {
                    (ask.category === "관리자문의" || userType === "고객") &&
                    <Button
                        title={"삭제"}
                        onClick={() => { onClick(ask.id) }}
                    />
                }
            </div>
        </div>
    )
}