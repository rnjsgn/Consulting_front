import React from "react";
import { TermBox } from "./components/TermBox";
import Layout from "../../../../components/Layout/Layout";

export const TermsPresenter = () => {
    return(
        <Layout nav = {1}>
            <TermBox />
        </Layout>
    )
}