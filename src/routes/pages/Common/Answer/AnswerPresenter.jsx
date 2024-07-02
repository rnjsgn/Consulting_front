import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { Ask } from "./components/Ask";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const AnswerPresenter = ({
    setAnswer,
    onAnswer,

    error,
    checkError,

    enroll,
    checkEnroll
}) => {
    return (
        <Layout nav={0} title={'문의 내역'}>
            <div>
                <Ask setAnswer={setAnswer} onAnswer={onAnswer} />
            </div>

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