import React, { useState } from "react";
import Layout from "../../../../components/Layout/Layout";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { AskTab } from "./components/AskTab";
import { Popup } from "../../../../components/Layout/Popup/Popup";

import "./AskAdmin.css";

export const AskAdminPresenter = ({
    setContent,
    asks,
    userType,

    onSubmit,
    onDelete,

    selectTab,
    setSelectTab,

    error,
    checkError,

    enroll,
    checkEnroll,
}) => {

    return (
        <Layout nav={0} title={'관리자 문의'}>
            <AskTab
                setContent={setContent}
                asks={asks}
                userType={userType}

                selectTab={selectTab}
                setSelectTab={setSelectTab}

                onSubmit={onSubmit}
                onDelete={onDelete}
            />

            {/* 기능 성공 모달 */}
            <Popup
                type={'done'}

                isModalOpen={enroll.isEnroll}
                onClose={checkEnroll}

                content={enroll.enrollMsg}
            />

            {/* <ModalComponent
                open={enroll.isEnroll}

                isShowText={true}
                text={enroll.enrollMsg}

                isShowOk={true}
                handleOk={checkEnroll}
            /> */}

            {/* 에러 처리 모달 */}
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