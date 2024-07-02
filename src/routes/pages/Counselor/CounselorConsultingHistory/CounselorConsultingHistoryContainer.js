import React, { useEffect, useState } from "react";
import { CounselorConsultingHistoryPresenter } from "./CounselorConsultingHistoryPresenter";
import { API } from "../../../../api";
import cookie from "../../../../cookie";
import { useNavigate } from "react-router-dom";

const CounselorConsultingHistoryContainer = ({
}) => {
    const navigate = useNavigate();

    const [ type, setType ] = useState('')

    /**
     * 에러 ㅓ리
     */
    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });

    /**
     * 상품 구매 내역
     */
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        (
            async() => {
                // 로그인 필요
                const id = cookie.getCookie('id');
                const usertype = cookie.getCookie('userType');

                if (!id) {
                    setError({
                        isError: true,
                        errorMsg: '로그인이 필요합니다.',
                    });
                    return
                }

                const result = await API.getCounselorCoinHistory();
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
                        errorMsg: `상품 구매 내역 조회 중 에러가 발생했습니다.`,
                    });
                    return;
                }

                setHistories(result.data);
                setType(usertype);
            }
        )()
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

    return (
        <CounselorConsultingHistoryPresenter
            histories={histories}

            usertype = {type}

            error={error}
            checkError={checkError}
        />
    )
}

export default CounselorConsultingHistoryContainer;