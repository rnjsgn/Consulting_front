import React, { useEffect, useState } from "react";
import { UserCenterPresenter } from "./UserCenterPresenter";
import cookie from "../../../../cookie";
import { API } from "../../../../api";

const UserCenterContainer = () => {

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
      });

    const [ counselors, setCounselors ] = useState([]);

    useEffect(() => {
        (
            async () => {
                // 로그인 여부 판단
                const id = cookie.getCookie('id');

                if (!id) {
                    setError({
                        isError: true,
                        errorMsg: '로그인이 필요합니다.',
                    });
                    return
                }

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
                        errorMsg: `신규 상담사 공지 중 에러가 발생했습니다.`,
                    });
                    return;
                }
                console.log(result.data)

                setCounselors(result.data)
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
        <UserCenterPresenter 
            counselors = {counselors}

            error = {error}
            checkError = {checkError}
        />
    )
}

export default UserCenterContainer;