import React from "react";
import './UserProduct.css';
import Layout from "../../../../components/Layout/Layout";
import { UserProductList } from "./components/UserProductList";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
// import { Empty } from "antd";
import { Empty } from "../../../../components/Layout/Empty/Empty";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const UserProductPresenter = ({
    histories,

    moveCounselorDetail,

    usertype,

    error,
    checkError,
}) => {
    return (
        <Layout nav={1} title={'상담 내역'}>
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