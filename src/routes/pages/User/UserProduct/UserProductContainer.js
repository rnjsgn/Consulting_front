import React, { useEffect, useState } from "react";
import { UserProductPresenter } from './UserProductPresenter';
import { API } from "../../../../api";
import cookie from "../../../../cookie";
import { useNavigate } from "react-router-dom";

/**
 * 상품 구매 내역
 */
const UserProductContainer = () => {
    const navigate = useNavigate();

    const [ type, setType ] = useState('')

    /**
     * 에러 처리
     */
    const [error, setError] = useState({
        isError: false,
        errorMsg: ''
    });

    /**
     * 상품 구매 내역
     */
    const [histories, setHistories] = useState([]);



    useEffect(() => {
        (
            async () => {

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

                const result = await API.getUserCoinHistory();
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
                setType(usertype)
            }
        )()
    }, [])

    /**
     * 상담사 상세 페이지로 이동
     */
    const moveCounselorDetail = (counselor_id) => {
        navigate(`/counselor/${counselor_id}`);
    }

    /**
     * 에러 처리 함수
     */
    const checkError = () => {
        setError({
            isError: false,
            errorMsg: '',
        });

        cookie.getCookie('id') ? navigate(-1) : navigate('/signin');
    }

    return (
        <UserProductPresenter
            histories={histories}
            moveCounselorDetail={moveCounselorDetail}

            usertype = {type}

            error={error}
            checkError={checkError}
        />
    )
}

export default UserProductContainer;