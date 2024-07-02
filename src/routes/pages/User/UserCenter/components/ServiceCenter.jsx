import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../../components/Layout/Button/Button";
// import { Linking } from "react-native";
import "./ServiceCenter.css";

export const ServiceCenter = () => {
    return(
        <div className="servicecenter-container">
            <h3>주야주야 고객센터</h3>
            <h4>전화문의</h4>
            <h4 className="tel">1555-1710</h4>
            <p>운영시간 : 10시 ~ 17시 (주말 공휴일 휴무)</p>
            <p>점심시간 : 13시 ~ 14시</p>
            <a href="tel:1555-1710">
            <Button
                title={'전화 문의'}
            />
            </a>
            <h4>1:1 문의</h4>
            <p>365일 문의 가능하며, 고객센터 운영시간에 순차적으로 답변드리겠습니다.</p>
            <Link to={'/askadmin/:params'}>
                <Button 
                    title={'1:1 문의'}
                />
            </Link>
        </div>
    )
}