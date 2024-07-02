import { useState, useEffect } from 'react';
import { BoxHead } from './components/BoxHead';
import { BoxBody } from './components/BoxBody';
import { ModalComponent } from '../Modal/Modal';
import { ModalBox } from '../ModalBox/ModalBox';
import { LuckyPouchCard } from '../LuckyPouchCard/LuckyPouchCard';
import { Popup } from '../Popup/Popup';
import styled from 'styled-components';
import cookie from '../../../cookie';
import API from '../../../api/API';

import './ConsultingBox.css';

export const ConsultingBox = ({
    counselor,

    setIsModalOpen,
}) => {
    console.log(counselor)
    const [enroll, setEnroll] = useState({
        isEnroll: false,
        enrollMsg: ''
    });

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });

    const [userInfo, setUserInfo] = useState({});

    const [isOpenPresent, setIsOpenPresent] = useState(false);
    const [isSignin, setIsSignin] = useState(false);
    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        (
            async () => {
                const userId = cookie.getCookie('id');

                const result = await API.getUser(userId);
                if (result.code === 500) {
                    // 서버 연결 안됨
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
                    });
                    return;
                }

                if (result.status === 409) {
                    // 정보 없음
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

                setIsSignin(userId && true);
                setUserInfo(result.data);
            }
        )()
    }, [isClick]);

    /**
     * 등록 함수
     */
    const checkEnroll = () => {
        setEnroll({
            isEnroll: false,
            enrollMsg: ''
        });

        // navigate("/user/product")
        setIsClick(prev => !prev);
        setIsOpenPresent(false);
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
        <>
            <div className="consulting-box">
                <BoxHead
                    counselor={counselor}
                    setIsOpenPresent={setIsOpenPresent}
                />
                <hr />
                <BoxBody
                    counselor={counselor}
                    isSignin={isSignin}
                    userInfo={userInfo}
                    setIsModalOpen={setIsModalOpen}

                    setError={setError}
                />
            </div>

            <ModalBox
                isModalOpen={isOpenPresent}
                title={'보유현황'}

                onClose={() => {
                    setIsOpenPresent(false);
                }}
            >
                <LuckyPouchCard
                    counselor={counselor}

                    setError={setError}
                    setEnroll={setEnroll}
                />
            </ModalBox>

            {/* <ModalComponent
                open={enroll.isEnroll}

                isShowText={true}
                text={enroll.enrollMsg}

                isShowOk={true}
                handleOk={checkEnroll}
            /> */}
            <Popup
                type={'done'}

                isModalOpen={enroll.isEnroll}
                onClose={checkEnroll}

                content={enroll.enrollMsg}
            />


            {/* <ModalComponent
                open={error.isError}

                isShowText={true}
                text={error.errorMsg}

                isShowOk={true}
                handleOk={checkError}
            /> */}
            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </>
    )
}