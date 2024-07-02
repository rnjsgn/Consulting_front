import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { ServiceCenter } from "./components/ServiceCenter";
import { NewCounselor } from "./components/NewCounselor";
import { Popup } from "../../../../components/Layout/Popup/Popup";
import "./UserCenter.css"

export const UserCenterPresenter = ({
    counselors,

    error,
    checkError,
}) => {
    return(
        <Layout title={"고객센터"}>
            <div className="usercenter-container">
                <NewCounselor 
                    counselors = {counselors}
                />
                <ServiceCenter />
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