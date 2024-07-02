import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { HaveCoin } from "./components/HaveCoin";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const CounselorCoinPresenter = ({
    counselor,

    error,
    checkError,
}) => {
    return (
        <Layout nav={0} title={'캐시 환전'}>
            <HaveCoin counselor={counselor} />

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