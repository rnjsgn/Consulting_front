import React from "react";
import Layout from '../../../../components/Layout/Layout';
import { AskTab } from "./components/AskTab";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const UserAskPresenter = ({
    setContent,
    asks,
    userType,

    onSubmit,
    onDelete,

    error,
    checkError,

    enroll,
    checkEnroll
}) => {
    return (
        <Layout nav={0} title={'문의'}>
            <AskTab
                setContent={setContent}
                asks={asks}
                userType={userType}

                onSubmit={onSubmit}
                onDelete={onDelete}
            />

            {/* 기능 성공 모달 */}
            <Popup
                type={'enroll'}

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