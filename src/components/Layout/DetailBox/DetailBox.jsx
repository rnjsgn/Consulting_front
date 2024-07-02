import React from "react";
import "./DetailBox.css"
import { Link } from "react-router-dom";

export const DetailBox = ({
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

    const noticeContent = `
    안녕하세요, 사주나루입니다.


    ${counselor?.category} 신규상담사 ${counselor?.nickname}(${counselor?.id}번) 선생님이 새롭게 등록하였습니다.

    ${counselor?.nickname} 선생님은 잡채된 무의식에 있는 해답을 찾아 줄 ${counselor?.category} 선생님 입니다.


    사주나루의 새로운 간판이 될 ${counselor?.nickname} 선생님에게 많은 관심 부탁드립니다.

    (아래의 이미지를 누르면 상담사 프로필로 즉시 이동합니다.)
    `

    return(
        <>
        {
            write
            ?
            <div className="detailbox-container">
                <div className="detailbox-title">
                    <div className="detail-notice">
                        <span>제목</span>
                    </div>
                    <div className="detail-name">
                        <span>{write.title}</span>
                    </div>
                    <div className="detail-date">
                        {/* <span>{convertIsoToCustomFormat(counselor?.createdAt)}</span> */}
                    </div>
                </div>
                <div className="detailbox-content-all">
                    <div className="detailbox-content-name">
                        <span>상담사 : {write.counselor_name}</span>
                    </div>
                    <div className="detailbox-content">
                        <span>{write.content}</span>
                    </div>
                </div>
            </div>
            :
            <div className="detailbox-container">
                <div className="detailbox-title">
                    <div className="detail-notice">
                        <span>공지</span>
                    </div>
                    <div className="detail-name">
                        <span>[{counselor?.category}] 신규상담사 {counselor?.nickname}({counselor?.id}번) 등록을 알려드립니다.</span>
                    </div>
                    <div className="detail-date">
                        <span>{convertIsoToCustomFormat(counselor?.createdAt)}</span>
                    </div>
                </div>
                <div className="detailbox-content-all">
                {
                    noticeContent.split("\n").map((line, index) => (
                        <div className="detailbox-content">
                            <p key={index}>{line}</p>
                            <br />
                        </div>
                    ))
                }
                <Link to = {`/counselor/${counselor?.id}`}>
                    {counselor?.profile_img}
                </Link>
                </div>
            </div>
        }
        </>
    )
}