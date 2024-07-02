import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { CounselorProfileBox } from './components/CounselorProfileBox';
import { Popup } from "../../../../components/Layout/Popup/Popup";

import "./CounselorProfile.css";

export const CounselorProfilePresenter = ({
    counselor,
    setCounselor,

    time,
    setTime,

    page,
    setPage,

    onSubmit,

    selectConsultingStatus,
    setSelectConsultingStatus,

    onChangeImage,
    prevImageSrc,
    onChangeProductImage,
    productPrevImageSrc,

    error,
    setError,
    checkError,

    enroll,
    checkEnroll
}) => {
    return (
        <Layout nav={0} title={'프로필 수정'}>
            <CounselorProfileBox
                counselor={counselor}
                setCounselor={setCounselor}

                time={time}
                setTime={setTime}

                page={page}
                setPage={setPage}

                onSubmit={onSubmit}

                selectConsultingStatus={selectConsultingStatus}
                setSelectConsultingStatus={setSelectConsultingStatus}

                onChangeImage={onChangeImage}
                prevImageSrc={prevImageSrc}
                onChangeProductImage={onChangeProductImage}
                productPrevImageSrc={productPrevImageSrc}

                setError={setError}
            />

            {/* 기능 성공 모달 */}
            <Popup
                type={'done'}

                isModalOpen={enroll.isEnroll}
                onClose={checkEnroll}

                content={enroll.enrollMsg}
            />

            {/* <ModalComponent 
                open={enroll.isEnroll}

                isShowText={true}
                text={enroll.enrollMsg}

                isShowOk={true}
                handleOk={checkEnroll}
            /> */}

            {/* 에러 처리 모달 */}
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