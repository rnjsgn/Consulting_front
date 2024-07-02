import React, { useEffect, useState } from "react";
import { UserToCounselorPresenter } from "./UserToCounselorpresenter";
import { useNavigate } from "react-router-dom";
import cookie from "../../../../cookie";
import { API } from "../../../../api";

const UserToCounselorContainer = () => {

    const goWrite = useNavigate();

    const [writes, setWrites] = useState([]);

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });


    useEffect(() => {
        (
            async () => {
                const id = cookie.getCookie('id');
                if (!id) {
                    // 로그인 필요
                    setError({
                        isError: true,
                        errorMsg: '로그인이 필요합니다.',
                    });
                    return;
                }

                const getToCounselor = await API.getToCounselor();

                if (getToCounselor.status === 404) {
                    // 문의 조회 실패
                    setError({
                        isError: true,
                        errorMsg: 'To상담사 조회에 실패하였습니다.',
                    });
                    return;
                }

                if (getToCounselor.status === 500) {
                    // 문의 조회 실패
                    setError({
                        isError: true,
                        errorMsg: 'To상담사 조회 중 에러가 발생하였습니다.',
                    });
                    return;
                }

                setWrites(getToCounselor.data);

            }
        ) ()
    }, [])

    /**
     * 등록 처리 함수
     */

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
        <UserToCounselorPresenter 
            goWrite = {goWrite}

            writes = {writes}

            error = {error}
            checkError = {checkError}
        />
    )
}

export default UserToCounselorContainer;