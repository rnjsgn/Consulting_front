import React, { useEffect } from "react";
import './AddProduct.css';
import Layout from '../../../../components/Layout/Layout';
import { AddProductBox } from "./components/AddProductBox";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const AddProductPresenter = ({
    productInfo,
    setProductInfo,

    addProduct,

    done,
    checkDone,

    error,
    checkError,
}) => {
    return (
        <Layout nav={1} title={'상품 등록'}>
            <AddProductBox
                productInfo={productInfo}
                setProductInfo={setProductInfo}
                addProduct={addProduct}
            />

            <Popup
                type={'done'}

                isModalOpen={done.isDone}
                onClose={checkDone}

                content={done.doneMsg}
            />

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