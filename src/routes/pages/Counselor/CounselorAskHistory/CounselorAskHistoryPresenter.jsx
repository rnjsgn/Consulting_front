import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { AskHistory } from "../../../../components/Layout/AskHistory/AskHistory";
// import { Empty } from "antd";
import { Empty } from "../../../../components/Layout/Empty/Empty";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const CounselorAskHistoryPresenter = ({
    asks,
    userType,

    error,
    checkError,
}) => {
    return (
        <Layout nav={0} title={'문의 내역'}>
            {
                asks?.length === 0
                    ?
                    <Empty />
                    :
                    <AskHistory
                        asks={asks}
                        userType={userType}
                    />
            }

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