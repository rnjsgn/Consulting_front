import React, { useEffect } from "react";
import Layout from '../../../../components/Layout/Layout';
import { Popup } from "../../../../components/Layout/Popup/Popup";
import { ProductionList } from './components/ProductionList';

import './CounselorProductionList.css';

export const CounselorProductionListPresenter = ({
    productions,
    removeProduction,

    done,
    checkDone,

    error,
    checkError,
}) => {
    return (
        <Layout nav={1} title={'상담사 상품 목록'}>
            <ProductionList
                productions={productions}
                removeProduction={removeProduction}
            />

            {/* 완료 팝업 */}
            <Popup
                type={'done'}

                isModalOpen={done.isDone}
                onClose={checkDone}

                content={done.doneMsg}
            />

            {/* 에러 팝업*/}
            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </Layout>
    )
}