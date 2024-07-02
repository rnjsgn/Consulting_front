import React from "react";
import { Input } from "../../../../../../components/Layout/Input2/Input";
import { Button } from '../../../../../../components/Layout/Button/Button';
import "./PwInfo.css"

export const PwInfo = ({
    setCounselor,
    onSubmit
}) => {
    return (
        <div className="pwinfo-container">
            <div className="pwinfo-title">
                <h4>비밀번호 변경</h4>
            </div>
            <div className="pwinfo-form">
                {/* <div className="pwinfo-input">
                    <Input
                        type="text"
                        label={'현재 비밀번호'}
                        placeholder="현재 비밀번호"
                    />
                </div> */}
                <div className="pwinfo-input">
                    <Input
                        type="text"
                        label={'새 비밀번호'}
                        placeholder="새 비밀번호"
                        onChange={(e) => {
                            const pw = e
                            setCounselor(info => {
                                return { ...info, pw };
                            })
                        }}
                    />
                </div>
                {/* <div className="pwinfo-input">
                    <Input
                        type="text"
                        label={'새 비밀번호 확인'}
                        placeholder="새 비밀번호 확인"
                    />
                </div> */}
                <div className="pwinfo-button">
                    <Button
                        title={'수정하기'}
                        type={'basic'}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </div>
    )
}