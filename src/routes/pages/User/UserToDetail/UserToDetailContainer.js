import React, { useState, useEffect } from "react";
import { UserToDetailPresenter } from "./UserToDetailPresenter";
import { API } from "../../../../api";
import { useParams } from "react-router-dom";

const UserToDetailContainer = () => {

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });

    const { write_id } = useParams();

    const [ write, setWrite ] = useState();

    useEffect(() => {
        (
            async () => {
                const result = await API.getToCounselorOne(write_id)

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
                        errorMsg: `To.상담사 조회 중 에러가 발생했습니다.`,
                    });
                    return;
                }

                setWrite(result.data)
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
        <UserToDetailPresenter 

            write = {write}
        
            error = {error}
            checkError = {checkError}
        />
    )
}

export default UserToDetailContainer;