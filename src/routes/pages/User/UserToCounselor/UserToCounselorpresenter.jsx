import Layout from '../../../../components/Layout/Layout';
import React from "react";
import { UserToBanner } from './components/UserToBanner';
import { WriteList } from './components/WriteList';
import { Popup } from '../../../../components/Layout/Popup/Popup';

export const UserToCounselorPresenter = ({
    goWrite,
    writes,

    error,
    checkError
}) => {
    return(
        <Layout title="To 상담사">
            <UserToBanner
                goWrite = {goWrite}
            />
            <WriteList
                writes = {writes}
            />

            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </Layout>
    )
}