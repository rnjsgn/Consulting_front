import React from "react";
import { Input } from '../../../../../components/Layout/Input2/Input';
import { Button } from "antd";
import './ProfileBox.css';

export const ProfileBox = ({
    userInfo,
    setUserInfo,

    onModify,

    isCheckEmail,
    checkEmail,

    showPhone,
    autoHyphenPhoneNumber,
}) => {
    return (
        <div className="profile-box-container">
            <div className="profile-box">
                <Input
                    label='아이디'
                    isWrite={true}
                    value={userInfo.email}
                    placeholder={'아이디를 입력하세요'}
                    onChange={(e) => {
                        const email = e;
                        setUserInfo(info => {
                            return { ...info, email };
                        });
                    }}

                    onBlur={checkEmail}

                    isAlert={!isCheckEmail}
                    alertMessage={'이메일 형식을 확인하세요'}
                />
                <Input
                    label='패스워드'
                    type='password'
                    isWrite={true}
                    placeholder={'비밀번호를 입력하세요'}
                    onChange={(e) => {
                        const pw = e;
                        setUserInfo(info => {
                            return { ...info, pw };
                        });
                    }}

                    subNotice={'비밀번호는 8자 이상, 특수문자를 하나 이상 포함해야 합니다.'}
                />
                <Input
                    label='이름'
                    isWrite={true}
                    value={userInfo.name}
                    placeholder={'이름을 입력하세요'}
                    onChange={(e) => {
                        const name = e;
                        setUserInfo(info => {
                            return { ...info, name };
                        });
                    }}
                />
                <Input
                    label='전화번호'
                    isWrite={true}
                    value={showPhone}
                    placeholder={'전화번호를 입력하세요'}
                    onChange={(e) => {
                        const phone = e;
                        setUserInfo(info => {
                            return { ...info, phone };
                        });

                        autoHyphenPhoneNumber(e);
                    }}
                />
                <Button onClick={onModify}>수정하기</Button>
            </div>
        </div>
    )
}