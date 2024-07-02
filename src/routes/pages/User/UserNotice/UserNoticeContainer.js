import React, { useEffect, useState } from "react";
import { UserNoticePresenter } from "./UserNoticePresenter";
import { API } from "../../../../api";

const UserNoticeContainer = () => {

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
      });

    const [counselors, setCounselors] = useState([]);

    useEffect(() => {
        (
            async () => {
                const result = await API.getCounselors();

                if (result.code === 500) {
                    // 서버 에러
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원할하지 않습니다.\n잠시만 기다려주시기 바랍니다.`,
                    });
                    return;
                }

                if (result.status === 500) {
                    // 에러 발생
                    setError({
                        isError: true,
                        errorMsg: `공지 사항 조회 중 에러가 발생했습니다.`,
                    });
                    return;
                }

                setCounselors(result.data)
                console.log(result.data)
            }
        ) ()
    }, [])

    /**
     * 에러 처리 함수
     */
    const checkError = () => {
        setError({
            isError: false,
            errorMsg: '',
        });
    }


    return(
        <UserNoticePresenter 
            counselors = {counselors}

            error = {error}
            checkError = {checkError}
        />
    )
}

export default UserNoticeContainer;