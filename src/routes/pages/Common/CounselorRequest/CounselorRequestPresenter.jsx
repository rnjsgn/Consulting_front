import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { RequestBanner } from "./components/RequestBanner";
import { RequestBox } from "./components/RequestBox";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const CounselorRequestPresenter = ({
    requests,

    error,
    checkError,
}) => {
    return (
        <Layout title={'상담사 모집하기'}>
            <RequestBanner />

            <RequestBox
                requests={requests}
            />

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