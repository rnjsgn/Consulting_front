import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/Layout/Button/Button";
// import example from './example.png';
import './CounselorMyInfo.css';
import { Setting } from "../../../../../assets/mymenuImg";

export const CounselorMyInfo = ({
    counselor,
    goToSignin,
}) => {
    const navigate = useNavigate();
    return (
        <div className="mymenu-user">
            {
                counselor ?
                    <>
                        <div className="user-info">
                            <div className="counselor-img">
                                <img src={counselor.profile_img} alt="이미지" />
                            </div>
                            <div className="user-name">
                                <div className="user-tag">
                                    <span className="counselor-tag">상담사</span>
                                    <span className="counselor-lv"> Lv.1</span>
                                </div>
                                <span>전화{counselor.category} {counselor.name}</span>
                                <span>{counselor.email}</span>
                            </div>
                            <div className="SettingButton" onClick={() => { navigate('/counselor/profile') }}>
                                <Setting />
                            </div>
                        </div>

                        <div className="myhistory-form">
                            <ul className="myhistory-user1" >
                                <li className="myhistory-tab">
                                    <span>예상 적립금</span>
                                    <span>0 코인</span>
                                </li>
                            </ul>
                            <ul className="myhistory-user2" onClick={() => { navigate('/counselor/coin', { state: { isCoin: 2 } }) }} >
                                <li className="myhistory-tab">
                                    <span>복머니</span>
                                    <span>{counselor.lucky_pouch} 개</span>
                                </li>
                            </ul>
                            {/* <ul className="myhistory-user3" onClick={() => { navigate('/user/charge/coin') }}>
                                <li className="myhistory-tab">
                                    <span>코인</span>
                                    <span>{userInfo.total_coin.toLocaleString()} 개</span>
                                </li>
                            </ul> */}
                        </div>
                    </> :
                    <>
                        <div className="user-need-signin">
                            <span>로그인이 필요합니다</span>
                            <Button title={'로그인'} width={'100%'} onClick={goToSignin} />
                        </div>
                    </>
            }
        </div>
    )
}