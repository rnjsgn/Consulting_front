import Layout from '../../../../components/Layout/Layout';
import React from "react";
import { WriteBox } from './components/WriteBox';
import { Popup } from "../../../../components/Layout/Popup/Popup";

export const UserToWritePresenter = ({
    setTitle,
    setCounselorName,
    setContent,
    setIsSecret,

    onSubmit,

    error,
    checkError,

    enroll,
    checkEnroll
}) => {
    return(
        <Layout title={"글쓰기"}>
            <WriteBox 
                setTitle = {setTitle}
                setCounselorName = {setCounselorName}
                setContent = {setContent}
                setIsSecret = {setIsSecret}
                
                onSubmit = {onSubmit}
            />

            <Popup
                type={'enroll'}

                isModalOpen={enroll.isEnroll}
                onClose={checkEnroll}

                content={enroll.enrollMsg}
            />

            <Popup
                type={'error'}

                isModalOpen={error.isEnroll}
                onClose={checkError}

                content={error.errorMsg}
            />
            
        </Layout>
    )
}