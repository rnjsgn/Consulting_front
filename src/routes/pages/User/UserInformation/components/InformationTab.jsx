import { Tabs } from "antd";

import "./InformationTab.css";

import React from "react";

export const InformationTab = () => {

    const content = {
        content1: 
        <div className="information-content">
            <h3>선불상담 이용방법</h3>
            <span>
                ① 로그인 우측 하단 [코인충전]을 통해 원하는만큼 코인 충전
                <br />
                ② 원하는 상담사 상세페이지에서 [상담하기] 클릭
                <br />
                ③ 상담하기 팝업창에서 [☎상담하기]를 클릭하여 전화를 걸면, 해당 상담사에게 연결됩니다.
                <br />
                ④ 상담사와 전화 연결이 완료되면 상담을 시작하세요.
            </span>
        </div>,
        content2:
        <div className="information-content">
            <h3>선불상담 이용요금</h3>
            <span>
                ①전화 연결 시 상담사가 10초당 설정한 요금만큼 코인이 차감됩니다.
                <br />
                ②충전 된 코인이 모두 소진되면 자동으로 종료됩니다.
                <br />
                ③결제 금액은 VAT 별도입니다.
            </span>
        </div>
        ,
        content3:
        <div className="information-content">
            <h3>선물하기 이용방법</h3>
            <span>
                ① 로그인 우측 하단 [복머니충전]을 통해 원하는만큼 복머니 충전
                <br />
                ② 원하는 상담사 상세페이지에서 [선물하기] 클릭
                <br />
                ③선물하기 팝업창에서 [선물하기]를 클릭하여 복머니 수량을 입력하고 터치하면, 해당 상담사에게 전달됩니다.
                <br />
                ④ 상담사에게 선물하기를 완료하면 응원메세지 및 요청사항을 전달 할 수 있습니다.
            </span>
        </div>
    };
    

    const items = [
        {
            key: '1',
            label: '전화상담',
            children:
            <div className="items-first">
                <span> {content.content1} </span>
                <span> {content.content2} </span>
            </div>
        },
        {
            key: '2',
            label: '선물하기',
            children:
            <div className="items-first">
                <span> {content.content3} </span>
            </div>
        }
    ]
    return(
        <div className="informationtab-container">
            <Tabs items = {items}/>
        </div>
    )
}