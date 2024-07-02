import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { Popup } from "../../../../components/Layout/Popup/Popup";
import { NoticeList } from "./components/NoticeList";

export const UserNoticePresenter = ({
    counselors,

    error,
    checkError,
}) => {
    return(
        <Layout title="공지사항">
            <div className="usernotice-container">
                <NoticeList
                    counselors = {counselors}
                />
            </div>

            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </Layout>
    )
}