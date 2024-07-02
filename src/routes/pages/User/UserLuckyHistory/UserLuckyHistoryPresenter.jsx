import React from "react";
import Layout from "../../../../components/Layout/Layout";
// import { Empty } from "antd";
import { Empty } from "../../../../components/Layout/Empty/Empty";
import { UserProductList } from "../UserProduct/components/UserProductList";
import { Popup } from "../../../../components/Layout/Popup/Popup";
import './UserLuckyHistory.css'

export const UserLuckyHistoryPresenter = ({
    histories,
    usertype,
    error,
    checkError,
    moveCounselorDetail,
}) =>{
    return (
        <Layout nav={1} title={'복머니내역'}>
            {
                histories?.length === 0
                    ?
                    <Empty />
                    :
                    <UserProductList
                        histories={histories}
                        moveCounselorDetail={moveCounselorDetail}

                        usertype={usertype}

                        error={error}
                        checkError={checkError}
                    />
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