import React from "react";
import './UserCoinHistory.css';
import Layout from "../../../../components/Layout/Layout";
// import { Empty } from "antd";
import { Empty } from "../../../../components/Layout/Empty/Empty";
import { UserProductList } from "../UserProduct/components/UserProductList";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const UserCoinHistoryPresenter = ({
    histories,
    usertype,
    error,
    checkError,
    moveCounselorDetail,
}) => {
    return (
        <Layout nav={1} title={'코인내역'}>
            {
                histories?.length !== 0
                    ?
                    <UserProductList
                        histories={histories}
                        moveCounselorDetail={moveCounselorDetail}

                        usertype={usertype}

                        error={error}
                        checkError={checkError}
                    />
                    :
                    <Empty />
            }
            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </Layout>
    )
}