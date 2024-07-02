import React, { useEffect } from "react";
import Layout from '../../../../components/Layout/Layout';
import { SignUpBox } from "../../../../components/Layout/SignUpBox/SignUpBox";
import { Popup } from '../../../../components/Layout/Popup/Popup';

import './SignUp.css';

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

    done,
    setDone,
    checkDone,

    error,
    checkError,

    setIsAgree,
}) => {
    return (
        <Layout nav={1} title={'회원가입'}>
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

                notice={
                    <>
                        아이디와 비밀번호를 입력해 회원이 되시면
                        <br />
                        다양한 서비스를 이용할 수 있습니다.
                    </>
                }
                signUpType={'고객'}

                setIsAgree={setIsAgree}
            />

            {/* 완료 팝업 */}
            <Popup
                type='done'

                isModalOpen={done.isDone}
                onClose={checkDone}

                content={done.doneMsg}
            />

            {/* 오류 팝업 */}
            <Popup
                type='error'

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </Layout>
    )
}