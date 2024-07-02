import React from "react";
import "./InfoList.css"
import { Link } from "react-router-dom";

export const InfoList = ({
    counselors
}) => {

    // 날짜 변환
    const convertIsoToCustomFormat = function (isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear().toString().slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    return(
        <div className="infolist-container">
            <Link to = {`/user/notice/detail/${counselors[counselors.length-1]?.id}`}>
            <div className="title">
                <div className="new-category">
                    <span className="new">new</span>
                </div>
                <div className="couselor-title">
                    {
                        counselors.length === 0
                        ?
                        <span>상담사가 존재하지 않습니다.</span>
                        :
                        <span>[{counselors[counselors.length-1].category}] 신규상담사 {counselors[counselors.length-1].nickname} 등록을 알려 드립니다.</span>
                    }
                </div>
            </div>
            <div className="counselor-content">
                <span>안녕하세요. 주야주야입니다. {counselors[counselors.length-1]?.category}에 신규 상담사 {counselors[counselors.length-1]?.nickname} 선생님이 새롭게 등록하셨습니다.</span>
            </div>
            <div className="counselor-create">
                <span>{convertIsoToCustomFormat(counselors[counselors.length-1]?.createdAt)}</span>
            </div>
            </Link>
        </div>
    )
}