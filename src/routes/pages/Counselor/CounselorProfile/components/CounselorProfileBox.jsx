import React from "react";
import { MyInfo } from "./Info/MyInfo";
import { PwInfo } from "./Info/PwInfo";
import './CounselorProfileBox.css';

export const CounselorProfileBox = ({
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

    setError,
}) => {
    return (
        <div className="counselor-profile-container">
            <div className="counselor-profile-wrap">
                {
                    page ?
                        <>
                            <p onClick={() => setPage(false)}>비밀번호 변경</p>
                            <MyInfo
                                counselor={counselor}
                                setCounselor={setCounselor}

                                time={time}
                                setTime={setTime}

                                onSubmit={onSubmit}

                                selectConsultingStatus={selectConsultingStatus}
                                setSelectConsultingStatus={setSelectConsultingStatus}

                                onChangeImage={onChangeImage}
                                prevImageSrc={prevImageSrc}
                                onChangeProductImage={onChangeProductImage}
                                productPrevImageSrc={productPrevImageSrc}
            
                                setError={setError}
                            />
                        </>
                        :
                        <>
                            <p onClick={() => setPage(true)}>기본정보 변경</p>
                            <PwInfo
                                setCounselor={setCounselor}
                                onSubmit={onSubmit}
                            />
                        </>
                }
            </div>
        </div>
    )
}