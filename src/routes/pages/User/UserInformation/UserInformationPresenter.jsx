import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { InformationTab } from "./components/InformationTab";

export const UserInformationPresenter = () => {
    return(
        <Layout title={'이용안내'}>
            <InformationTab />
        </Layout>
    )
}