import React, { useEffect, useState } from "react";
import { CounselorMainPresenter } from "./CounselorMainPresenter";
import API from "../../../../api/API";
import cookie from "../../../../cookie";
import { useNavigate } from "react-router-dom";

import {
    ConsultingHistory, CoinHistory, InquiryHistory, LuckyPocket, MyHistory, Profile
  } from '../../../../assets/mymenuImg';

const CounselorMainContainer = () => {
    const navigate = useNavigate();

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });
    const [counselor, setCounselor] = useState([]);

    const [myMenuItems] = useState([
        {
            title: '상담내역',
            path: '/counselor/consultinghistory',
            img: <ConsultingHistory />,
        },
        {
            title: '캐시환전',
            path: '/counselor/consultinghistory',
            img: <CoinHistory />,
        },
        {
            title: '복머니내역',
            path: '/counselor/luckypouchhistroy',
            img: <LuckyPocket />,
        },
        {
            title: '문의내역',
            path: '/counselor/ask/history',
            img: <MyHistory />,
        },
        {
            title: '프로필수정',
            path: '/counselor/profile',
            img: <Profile />,
        },
        {
            title: '관리자문의',
            path: '/askadmin/counselor',
            img: <InquiryHistory />,
        },
      ]);

    useEffect(() => {
        (
            async () => {

                const counselor_id = cookie.getCookie('id');
                if (!counselor_id) {
                    // 로그인 필요
                    setError({
                        isError: true,
                        errorMsg: '로그인이 필요합니다.',
                    });
                    return;
                }

                const result = await API.getCounselor(counselor_id);
                if (result.code === 500) {
                    // 서버 연결 안됨
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
                    });
                    return;
                }

                if (result.status === 404) {
                    // 조회 실패
                    setError({
                        isError: true,
                        errorMsg: '회원 정보 조회에 실패하였습니다.',
                    });
                    return;
                }

                if (result.status === 500) {
                    // 에러 발생
                    setError({
                        isError: true,
                        errorMsg: '회원 정보 조회 중 에러가 발생하였습니다.',
                    });
                    return;
                }

                console.log(result.data)
                setCounselor(result.data);
            }
        )();
    }, []);

    /**
     * 로그아웃
     */
    const logOut = () => {
        cookie.remove('id', { path: '/' }, 1000);
        cookie.remove('token', { path: '/' }, 1000);
        cookie.remove('userType', { path: '/' }, 1000);
        cookie.remove('ACCESS_TYPE', { path: '/' }, 1000);
        navigate('/');
    }

    /**
     * 에러 처리 함수
     */
    const checkError = () => {
        setError({
            isError: false,
            errorMsg: '',
        });
    }

    return (
        <CounselorMainPresenter
            counselor={counselor}

            myMenuItems={myMenuItems}

            logOut={logOut}

            error={error}
            setError={setError}
            checkError={checkError}
        />
    )
}

export default CounselorMainContainer;