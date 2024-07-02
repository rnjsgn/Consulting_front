import React, { useEffect } from "react";
import './SignUp.css';
import Layout from '../../../../components/Layout/Layout';
// import { SignUpBox } from "./components/SignUpBox";
import { SignUpBox } from "../../../../components/Layout/SignUpBox/SignUpBox";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Alert } from '../../../../components/Layout/Alert/Alert';
import { Popup } from "../../../../components/Layout/Popup/Popup";
import RequestBannerImg from "../../../../assets/bannerImg/RequestBanner.png";

export const SignUpPresenter = ({
    isCheckEmail,
    isCheckPw,

    canSignup,

    userInfo,
    setUserInfo,
    setIsCorrectPw,

    checkEmail,
    checkPw,
    checkPhone,

    doubleCheck,
    doubleCheckEmail,
    doubleCheckPhone,

    SignUp,

    onChangeImage,
    prevImageSrc,

    done,
    checkDone,

    error,
    checkError,

    setIsAgree,
}) => {
    return (
        <Layout nav={1} title={'상담사 회원가입'}>
            <img src={RequestBannerImg} alt="상담사 신청 배너" style={{ width: '100%' }} />

            <SignUpBox
                isCheckEmail={isCheckEmail}
                isCheckPw={isCheckPw}

                canSignup={canSignup}

                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setIsCorrectPw={setIsCorrectPw}

                checkEmail={checkEmail}
                checkPw={checkPw}
                checkPhone={checkPhone}

                doubleCheck={doubleCheck}
                doubleCheckEmail={doubleCheckEmail}
                doubleCheckPhone={doubleCheckPhone}

                SignUp={SignUp}

                onChangeImage={onChangeImage}
                prevImageSrc={prevImageSrc}

                notice={'회원가입을 통해 상담을 진행하실 수 있습니다.'}
                signUpType={'상담사'}

                setIsAgree={setIsAgree}
            />


            <Popup
                type={'done'}

                isModalOpen={done.isDone}
                onClose={checkDone}

                content={done.doneMsg}
            />


            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </Layout>
    )
}