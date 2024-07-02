import React from "react";
import { InputComponent } from '../../../../../components/Layout/Input/InputComponent';
import { Input } from "../../../../../components/Layout/Input2/Input";
import { Select, Space } from 'antd';
import './SignUpInputBox.css';

export const SignUpInputBox = ({
    isCheckEmail,
    isCheckPw,

    setUserInfo,

    checkEmail,
    checkPw,
    checkPhone,

    showPhone,
    autoHyphenPhoneNumber,
}) => {
    const option = [
        {
            label: '대한민국 +82',
            value: 'korea',
            emoji: '대한민국',
            desc: '+82',
        },
        {
            label: '미국 +1',
            value: 'usa',
            emoji: '미국',
            desc: '+1'
        },
    ];

    return (
        <div className="input-container">
            <Input
                label='아이디 (이메일)'
                type='email'
                placeholder='아이디를 입력해주세요'
                onChange={(e) => {
                    const email = e;
                    setUserInfo(info => {
                        return { ...info, email };
                    });
                }}
                onBlur={checkEmail}
            />

            <Input
                label='비밀번호'
                type='password'
                placeholder='비밀번호를 입력해주세요'
                onChange={(e) => {
                    const pw = e;
                    setUserInfo(info => {
                        return { ...info, pw };
                    });
                }}
            />

            <Input
                label='비밀번호 확인'
                type='password'
                placeholder='비밀번호를 확인'
                onChange={(e) => {
                    const pw_check = e;
                    setUserInfo(info => {
                        return { ...info, pw_check };
                    });
                }}
                onBlur={checkPw}
            />

            <Input
                label='이름'
                type='text'
                placeholder='이름을 입력해주세요'
                onChange={(e) => {
                    const name = e;
                    setUserInfo(info => {
                        return { ...info, name };
                    });
                }}
            />

            <Input
                label='예명'
                type='text'
                placeholder='예명을 입력해주세요'
                onChange={(e) => {
                    const nickname = e;
                    setUserInfo(info => {
                        return { ...info, nickname };
                    });
                }}
            />

            <div className="input-phone-container">
                <span className="phone-notice">회원가입을 위해 휴대폰 인증을 진행해주세요</span>
                <div className="input-phone">
                    <Select
                        style={{ width: '100%' }}
                        defaultValue={['korea']}
                        optionLabelProp="label"
                        option={option}
                        optionRender={(option) => (
                            <Space>
                                <span role='img' aria-label={option.data.label}>
                                    {option.data.emoji}
                                </span>
                                {option.data.desc}
                            </Space>
                        )}
                    />
                    <Input
                        placeholder={'전화번호 입력'}
                        value={showPhone}
                        onChange={function (e) {
                            const phone = e.replace(/-/g, '');
                            setUserInfo(info => {
                                return { ...info, phone };
                            });
                            autoHyphenPhoneNumber(e);
                        }}
                        onBlur={checkPhone}
                    />
                </div>
                <span className="phone-sub-notice">본인확인 후 회원가입 및 서비스 이용이 가능합니다</span>
            </div>
        </div>
    )
}