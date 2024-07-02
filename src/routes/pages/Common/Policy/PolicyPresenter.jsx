import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { PolicyBox } from "./components/PolicyBox";

export const PolicyPresenter = () => {
    return(
        <Layout nav={0}>
            <PolicyBox />
        </Layout>
    )
}