import React from "react";
import Layout from "../../../../components/Layout/Layout";
import "./CounselorConsultingHistory.css"
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { CounselorProductList } from "./components/CounselorProductList";
// import { Empty } from "antd";
import { Empty } from "../../../../components/Layout/Empty/Empty";
import { Popup } from "../../../../components/Layout/Popup/Popup";


export const CounselorConsultingHistoryPresenter = ({
    histories,

    usertype,

    error,
    checkError,
}) => {
    return (
        <Layout nav={0} title={'상담 내역'}>
            {
                histories?.length === 0
                    ?
                    <Empty />
                    :
                    <CounselorProductList
                        histories={histories}

                        usertype={usertype}
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