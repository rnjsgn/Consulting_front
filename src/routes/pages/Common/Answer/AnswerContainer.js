import React, { useState } from "react";
import { AnswerPresenter } from "./AnswerPresenter";
import { API } from "../../../../api";
import { useParams, useNavigate } from "react-router-dom";

const AnswerContainer = () => {
    const { ask_id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });

    const [enroll, setEnroll] = useState({
        isEnroll: false,
        enrollMsg: '',
    });

    const [answer, setAnswer] = useState();

    const onAnswer = async () => {
        const body = {
            ask_id,
            content: answer
        };

        if (!answer.trim()) {
            setError({
                isError: true,
                errorMsg: '작성된 내용이 없습니다.'
            })
        }

        const postAnswerInfo = await API.postAnswerCounselor(body);
        if (postAnswerInfo.code === 500) {
            // 서버 연결 안됨
            setError({
                isError: true,
                errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
            })
            return;
        };

        if (postAnswerInfo.status === 409) {
            // 문의 수정 실패
            setError({
                isError: true,
                errorMsg: `문의 답변에 실패했습니다.`
            })
            return;
        };

        if (postAnswerInfo.status === 500) {
            // 에러 발생
            setError({
                isError: true,
                errorMsg: `문의 답변 중 에러가 발생했습니다.`
            })
            return;
        }

        setEnroll({
            isEnroll: true,
            enrollMsg: '문의 답변을 하셨습니다.'
        });

        setAnswer('');
    }

    /**
     * 에러 처리 함수
     */
    const checkError = () => {
        setError({
            isError: false,
            errorMsg: '',
        });

        // 에러 처리 기능
    }

    const checkEnroll = () => {
        setEnroll({
            isEnroll: false,
            enrollMsg: '',
        });

        navigate(-1);
    }

    return (
        <AnswerPresenter
            setAnswer={setAnswer}
            onAnswer={onAnswer}

            error={error}
            checkError={checkError}

            enroll={enroll}
            checkEnroll={checkEnroll}
        />
    )
}

export default AnswerContainer;