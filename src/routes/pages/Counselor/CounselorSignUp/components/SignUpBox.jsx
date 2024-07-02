import React, { useState } from "react";
import { SignUpInputBox } from "./SignUpInputBox";
// import { Button } from "antd";
import { Button } from "../../../../../components/Layout/Button/Button";
import './SignUpBox.css';


export const SignUpBox = ({
    title,

    isCheckEmail,
    isCheckPw,

    canSignup,

    userInfo,
    setUserInfo,

    checkEmail,
    checkPw,
    checkPhone,


    doubleCheck,
    SignUp,
}) => {
    const [showPhone, setShowPhone] = useState('');

    const autoHyphenPhoneNumber = (e, setValue,) => {
        const rawPhone = e.replace(/-/g, '')
        let formattedPhone = ''

        if (rawPhone.length < 4) {
            formattedPhone = rawPhone
        } else if (rawPhone.length < 8) {
            formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(3)}`
        } else if (rawPhone.length < 11) {
            formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
                3,
                7,
            )}-${rawPhone.slice(7)}`
        } else {
            formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
                3,
                7,
            )}-${rawPhone.slice(7, 11)}`
        }

        const displayPhone = formattedPhone.length > 0 ? formattedPhone : ''
        setShowPhone(displayPhone)
    }

    return (
        <div className='signup-presenter'>
            <div className="signup-notice">
                <span>회원가입을 통해 상담을 진행하실 수 있습니다.</span>
            </div>
            <div className="signup-container">
                <div className="signup-box">
                    <div className="social-container">
                        <div className="title">{title}</div>
                    </div>

                    <SignUpInputBox
                        isCheckEmail={isCheckEmail}
                        isCheckPw={isCheckPw}

                        setUserInfo={setUserInfo}

                        checkEmail={checkEmail}
                        checkPw={checkPw}
                        checkPhone={checkPhone}
                        
                        showPhone={showPhone}
                        autoHyphenPhoneNumber={autoHyphenPhoneNumber}
                    />

                    <Button
                        title='중복확인'
                        type={'basic'}
                        onClick={doubleCheck}
                    />

                    <Button
                        title={'회원가입'}
                        onClick={SignUp}
                        disabled={!canSignup}>
                    </Button>
                </div>
            </div>
        </div>
    )
}