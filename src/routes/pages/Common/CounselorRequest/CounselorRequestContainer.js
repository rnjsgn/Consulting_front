import React, { useEffect, useState } from "react";
import { CounselorRequestPresenter } from "./CounselorRequestPresenter";
import API from "../../../../api/API";

const CounselorRequestContainer = () => {

    const [ requests, setRequests ] = useState([]);

    const [ error, setError ] = useState({
        isError: false,
        error: '',
    });

    useEffect(() => {
        (
            async () => {
                // 상담사 요청 리스트 조회
                const result = await API.getRequestCounselors();

                if (result.code === 500) {
                    // 서버 연결 안됨
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
                    });
                    return;
                }

                if (result.status === 500) {
                    // 에러 발생
                    setError({
                        isError: true,
                        errorMsg: '상담사 전체 조회 중 에러가 발생하였습니다.'
                    });
                    return;
                }

                setRequests(result.data)
            }
        ) ()
    },[])

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
        <CounselorRequestPresenter
            requests = {requests}

            error = {error}
            checkError = {checkError}
        />
    )
}

export default CounselorRequestContainer;