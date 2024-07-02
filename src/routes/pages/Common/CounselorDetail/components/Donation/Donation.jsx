import React, { useState } from "react";
// import { InputComponent } from "../../../../../../components/Layout/Input/InputComponent";
import { Input } from '../../../../../../components/Layout/Input2/Input';
import { Button } from "../../../../../../components/Layout/Button/Button";
import { Link } from "react-router-dom";
import API from "../../../../../../api/API";

import './Donation.css';
import cookie from "../../../../../../cookie";

export const Donation = ({
    userInfo,
    counselor,
    productionInfo,

    closeDonationDrawer,

    // setIsClick,
    clickEvent,
    setIsDone,
    setError,
}) => {
    const [coin, setCoin] = useState(0);

    const donation = async () => {
        const id = cookie.getCookie('id');
        if (id == null) {
            // 로그인 필요
            setError({
                isError: true,
                errorMsg: '로그인이 필요합니다.',
            });
            return;
        }

        const body = {
            category: '후원',
            amount: coin,
            product: productionInfo.name,
            user_id: id,
            counselor_id: counselor.id,
        };

        const donation = await API.postDonation(body);

        if (donation.code === 500) {
            // 서버 연결 끊김
            setError({
                isError: true,
                errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
            });
            return;
        }

        if (donation.status === 500) {
            // 에러 발생
            setError({
                isError: true,
                errorMsg: '후원 중 에러가 발생하였습니다.',
            });
            return;
        }

        if (donation.data.status === 'FAIL') {
            // 잔액 부족 에러
            setError({
                isError: true,
                errorMsg: '복머니 개수가 부족합니다.'
            });
            return;
        }

        // 후원 완료 알림
        setIsDone(true);
        clickEvent();
        // closeDonationDrawer();
    }

    return (
        <div className="donation-container">
            <div className="donation-input">
                <Input
                    type={'number'}
                    label={'후원할 복머니'}
                    placeholder={'후원할 복머니 개수를 입력하세요'}
                    onChange={setCoin}
                />
            </div>
            <div className="coin-info">
                <div>보유 복머니: {userInfo.lucky_pouch}개</div>
                <Link className="charge-link" to={'/user/charge/coin'}>복머니 충전 하러가기</Link>
            </div>
            <div className="send-donation">
                <textarea className="donation-message" cols="30" rows="10" placeholder="후원 메시지를 입력하세요"></textarea>
                <Button
                    title={'후원하기'}
                    onClick={donation}
                />
            </div>
        </div>
    )
}