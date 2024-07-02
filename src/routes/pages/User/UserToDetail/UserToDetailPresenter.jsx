import React from "react";
import Layout from '../../../../components/Layout/Layout';
import { DetailBox } from "../../../../components/Layout/DetailBox/DetailBox";
import { Popup } from '../../../../components/Layout/Popup/Popup';

export const UserToDetailPresenter = ({
    write,

    error,
    checkError
}) => {
    return(
        <Layout title = 'To. 상담사'>
            <DetailBox 
                write = {write}
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