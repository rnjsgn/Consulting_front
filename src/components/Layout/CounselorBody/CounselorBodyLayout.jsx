import React from 'react'
import { Row, Col } from 'antd'
import { CommonBox } from './components/CommonBox'
import './CounselorBodyLayout.css'

export const CounselorBodyLayout = () => {
    return (
        <div className='counselor-body-layout'>
            {/* <Row gutter={12}>
                <Col xs={12}><CommonBox title={'상품 등록'} url={'/counselor/addproduct'} /></Col>
                <Col xs={12}><CommonBox title={'상품 목록'} url={'/counselor/productions'} /></Col>
            </Row> */}
            <Row gutter={12}>
                <Col xs={12}><CommonBox title={'문의 내역 확인'} url={'/counselor/ask/history'} /></Col>
                <Col xs={12}><CommonBox title={'복머니 내역'} url={'/counselor/luckypouchhistroy'} /></Col>
            </Row>
            <Row gutter={12}>
                <Col xs={12}><CommonBox title={'상담 내역'} url={'/counselor/consultinghistory'} /></Col>
                <Col xs={12}><CommonBox title={'캐시 환전'} url={'/counselor/consultinghistory'} /></Col>
            </Row>
            <Row gutter={12}>
                <Col xs={12}><CommonBox title={'프로필 수정'} url={'/counselor/profile'} /></Col>
                <Col xs={12}><CommonBox title={'관리자 문의'} url={'/askadmin/counselor'} /></Col>
            </Row>
        </div>
    )
}
