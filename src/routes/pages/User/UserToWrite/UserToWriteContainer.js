import React, { useEffect, useState } from "react";
import { UserToWritePresenter } from "./UserToWritePresenter";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../../api";
import cookie from "../../../../cookie";

const UserToWriteContainer = () => {

    const [ title, setTitle ] = useState();
    const [ counselorName, setCounselorName ] = useState();
    const [ content, setContent ] = useState();
    const [ isSecret, setIsSecret ] = useState(false);
    const navigate = useNavigate()

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });

    const [enroll, setEnroll] = useState({
        isEnroll: false,
        enrollMsg: '',
    });

    const onSubmit = async () => {
        const body = {
            counselorName,
            title,
            content,
            isSecret
        };

        const writeInfo = await API.postToCounselor(body);

        if (writeInfo.code === 500) {
            // 서버 연결 안됨
            setError({
                isError: true,
                errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
            });
            return;
        }

        if (writeInfo.status === 409) {
            // 문의 등록 실패
            setError({
                isError: true,
                errorMsg: '글쓰기 등록에 실패하였습니다.',
            });
            return;
        }

        if (writeInfo.status === 500) {
            // 에러 발생
            setError({
                isError: true,
                errorMsg: '글쓰기 등록 중 에러가 발생하였습니다.',
            });
            return;
        }

        setEnroll({
            isEnroll: true,
            enrollMsg: '글쓰기를 등록하셨습니다.'
        })

        console.log(body)
    }


    /**
     * 에러 처리 함수
     */
    const checkError = () => {
        setError({
            isError: false,
            errorMsg: '',
        });
    }

    const checkEnroll = () => {
        setEnroll({
            isEnroll: false,
            enrollMsg: '',
        })

        navigate(-1)
    }


    return(
        <UserToWritePresenter 
            setTitle = {setTitle}
            setCounselorName = {setCounselorName}
            setContent = {setContent}
            setIsSecret = {setIsSecret}

            onSubmit = {onSubmit}

            error={error}
            checkError={checkError}

            enroll={enroll}
            checkEnroll={checkEnroll}
        />
    )
}

export default UserToWriteContainer;