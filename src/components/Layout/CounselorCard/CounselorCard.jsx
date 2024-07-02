import React, { useState } from "react";
import './CounselorCard.css';
import example from './example.png';
import donation from './donation_icon.svg';
import consulting from './consulting_icon.svg';
import { Link } from "react-router-dom";
import LuckyPouch from '../../Layout/LuckyPouchCard/LuckyPouch.png';
import { useRowStyle } from "antd/es/grid/style";

const showMethod = {
    'coin': '사용 코인',
    '복주머니': '복머니',
}

export const CounselorCard = ({
    isReview,

    histories,

    usertype,

    moveCounselorDetail,
}) => {

    /**
     * 날짜 포맷
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

        return `${year}. ${month}. ${day} ${hour}:${minute} (${dayOfWeek})`;
    }
    
    return (
        <>

            <ul className="history-list">
                {
                    histories &&
                    histories.map((history, idx) => {
                        console.log(history)
                        return (
                            <li className={`history-item ${idx}`} key={`history-item ${idx}`}>
                                <div className="counselorcard-box">
                                    <div className="counselorcard-container">
                                        <div className="counselorcard-date">
                                            <span>{formatDate(history.paidAt)}</span>
                                            <span className="counselorcard-status">⦁ 선물 완료</span>
                                        </div>
                                        <div className="counselorcard-content">
                                            <div className="counselorcard-img">
                                                <img src={history.counselor_img ? history.counselor_img : example} alt="상담사 이미지"/>
                                            </div>
                                            <div className="counselorcard-history">
                                                {
                                                    usertype === "고객" ?
                                                    <span className="counselorcard-name">{history.counselor_name}</span>
                                                    :
                                                    <span className="counselorcard-name">{history.user_name}</span>
                                                }
                                                {
                                                    history.category === "상담" ?
                                                        <>
                                                            <span>
                                                                상담 시간 :
                                                                <span className="counselorcard-time"> {parseInt(history.total_time / 60)}분 </span>
                                                                {
                                                                    history.total_time % 60 !== 0 &&
                                                                    <span className="counselorcard-time">
                                                                        {`${history.total_time % 60}초`}
                                                                    </span>
                                                                }
                                                            </span>
                                                            <span>
                                                                <img className="counselorcard-donation" src={donation} alt="후원 아이콘" style={{marginRight: '0.2rem'}} />
                                                                {showMethod[history.method]} :
                                                                <span className="counselorcard-coin"> {history.amount}코인</span>
                                                            </span>
                                                            <img className="counselorcard-consulting" src={consulting} alt="상담 아이콘" />
                                                        </>
                                                        :
                                                        <>
                                                            <span>
                                                                상담 시간 :
                                                                <span className="counselorcard-time"> - </span>
                                                            </span>
                                                            <span>
                                                                <img src={LuckyPouch} alt="복머니 아이콘" style={{marginRight: '0.2rem'}}/>
                                                                {showMethod[history.method]} :
                                                                <span className="counselorcard-coin"> {history.amount}개</span>
                                                            </span>
                                                            {/* <img className="counselorcard-donation" src={donation} alt="후원 아이콘" /> */}
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        {
                                            // isReview ?
                                            usertype === "고객" ?
                                                // <></>
                                                // :
                                                <div className="counselorcard-button">
                                                    {
                                                        history.category === "상담" ?
                                                            history.is_review === 1 ?
                                                                <button disabled>작성 완료</button>
                                                                :
                                                                <Link to={`/user/review/write/${history.counselor_id}`} state={{ history: [histories[idx]] }}><button>리뷰 등록</button></Link>
                                                            :
                                                            <></>
                                                    }
                                                    {/* <button>상세 보기</button> */}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>

    )
}