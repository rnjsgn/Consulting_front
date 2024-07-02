import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (userInfo.phone.length === 11) {
            setShowPhone(
                userInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            );
        } else if (userInfo.phone.length === 13) {
            setShowPhone(
                userInfo.phone
                    //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
                    .replace(/-/g, '')
                    .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            );
        }
    }, [userInfo.phone]);

    return (
        <div className="user-signup-container">
            <div className="signup-wrap">
                <div className="signup-notice">
                    <span>회원가입을 통해 다양한 서비스를 이용할 수 있습니다.</span>
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
                    onClick={doubleCheck}
                    title={'중복확인'}
                    type={'basic'}
                />

                <Button
                    onClick={SignUp}
                    title={'회원가입'}
                    disabled={!canSignup}
                />
            </div>
        </div>
    )
}


{/* <Button style={{ width: '100%' }} onClick={doubleCheck}>
                    중복확인
                </Button>

                <Button style={{ width: '100%' }} onClick={SignUp} disabled={!canSignup}>
                    회원가입
                </Button> */}