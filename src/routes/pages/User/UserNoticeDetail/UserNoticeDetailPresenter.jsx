import { DetailBox } from '../../../../components/Layout/DetailBox/DetailBox';
import Layout from '../../../../components/Layout/Layout';
import React from "react";
import { Popup } from '../../../../components/Layout/Popup/Popup';

export const UserNoticeDetailPresenter = ({
    counselor,

    error,
    checkError
}) => {
    return(
        <Layout title="공지사항">
            <DetailBox 
                counselor = {counselor}
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