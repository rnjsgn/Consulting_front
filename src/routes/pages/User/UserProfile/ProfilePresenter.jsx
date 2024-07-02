import React, { useEffect } from "react";
import { Form, Input, Button, Select, Space } from "antd";
import './Profile.css';
import Layout from '../../../../components/Layout/Layout';
import styled from "styled-components";
import { ProfileBox } from "./components/ProfileBox";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Alert } from "../../../../components/Layout/Alert/Alert";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const ProfilePresenter = ({
    userInfo,
    setUserInfo,

    onModify,

    isCheckEmail,
    checkEmail,

    showPhone,
    autoHyphenPhoneNumber,

    isDone,
    checkDone,

    error,
    checkError,
}) => {
    return (
        <Layout nav={1} title={'프로필 수정'}>
            <ProfileBox
                userInfo={userInfo}
                setUserInfo={setUserInfo}

                onModify={onModify}

                isCheckEmail={isCheckEmail}
                checkEmail={checkEmail}

                showPhone={showPhone}
                autoHyphenPhoneNumber={autoHyphenPhoneNumber}
            />

            <Popup
                type={'done'}

                isModalOpen={isDone}
                onClose={checkDone}

                content={'수정되었습니다.'}
            />

            {/* <Alert
                isShow={isDone}

                content={'수정 되었습니다.'}
                onClose={checkDone}
            /> */}

            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />

            {/* <ModalComponent
                open={error.isError}

                isShowText={true}
                text={error.errorMsg}

                isShowOk={true}
                handleOk={checkError}
            /> */}
        </Layout>
    )
}