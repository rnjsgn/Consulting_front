import React, { useEffect, useState } from "react";
import { AskAdminPresenter } from "./AskAdminPresenter";
import API from "../../../../api/API";
import cookie from "../../../../cookie";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const tabList = {
    '문의하기': '1',
    '': '1',
    '문의내역': '2',
}

const AskAdminContainer = () => {
    const navigate = useNavigate();
    const { params } = useParams();
    const [searchParams] = useSearchParams();

    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });

    const [enroll, setEnroll] = useState({
        isEnroll: false,
        enrollMsg: '',
    });

    const [content, setContent] = useState();
    const [asks, setAsks] = useState([]);
    const [isClick, setIsClick] = useState(false);
    const [selectTab, setSelectTab] = useState('1');

    const [userType, setUserType] = useState('');

    useEffect(() => {
        (
            async () => {
                const tab = searchParams.get('ask');
                setSelectTab(tabList[tab]);
                const id = cookie.getCookie('id');
                if (!id) {
                    // 로그인 필요
                    setError({
                        isError: true,
                        errorMsg: '로그인이 필요합니다',
                    });
                    return;
                }

                const type = cookie.getCookie('userType');
                setUserType(type)

                const getAdminHistory =
                    type === "상담사" ?
                        await API.getAskForCounselor(id) :
                        await API.getUserForAdmin(id);

                if (getAdminHistory.code === 500) {
                    // 서버 연결 안됨
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
                    });
                    return;
                }
                if (getAdminHistory.status === 404) {
                    // 문의 조회 실패
                    setError({
                        isError: true,
                        errorMsg: '문의 조회에 실패하였습니다.',
                    });
                    return;
                }

                if (getAdminHistory.status === 500) {
                    // 문의 조회 실패
                    setError({
                        isError: true,
                        errorMsg: '문의 조회 중 에러가 발생하였습니다.',
                    });
                    return;
                }

                const askData = [];
                console.log(getAdminHistory.data)
                /**
                 * 문의와 답변 나누기
                 */
                getAdminHistory.data.map(askHistory => {
                    askHistory.answer = [];

                    if (!askHistory.user && !askHistory.counselor) {
                        // 답변일 경우
                        // 답변 배열에 추가
                        const index = askData.findIndex(e => e.id === askHistory.reply_id);
                        askData[index]?.answer.push(askHistory);
                        return;
                    }

                    askData.push(askHistory);
                })

                setAsks(askData);
            }
        )();
    }, [isClick])

    const onSubmit = async () => {
        const body = {
            content
        }

        if (!content.trim()) {
            setError({
                isError: true,
                errorMsg: '작성된 내용이 없습니다.'
            });
            return;
        }

        if (content.length < 10) {
            setError({
                isError: true,
                errorMsg: '최소 10자 이상 작성해주세요.'
            });
            return;
        }

        const askadmininfo = await API.postAskAdmin(body);

        if (askadmininfo.code === 500) {
            // 서버 연결 안됨
            setError({
                isError: true,
                errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
            });
            return;
        }

        if (askadmininfo.status === 409) {
            // 문의 등록 실패
            setError({
                isError: true,
                errorMsg: '문의 등록에 실패하였습니다.',
            });
            return;
        }

        if (askadmininfo.status === 500) {
            // 에러 발생
            setError({
                isError: true,
                errorMsg: '문의 등록 중 에러가 발생하였습니다.',
            });
            return;
        }


        setEnroll({
            isEnroll: true,
            enrollMsg: '문의를 등록하셨습니다.'
        });

        setContent('')
        setIsClick(!isClick)
    }
    /**
     * 문의 삭제하기
     */
    const onDelete = async (ask_id) => {
        const deleteAskInfo = await API.deleteAsk(ask_id);
        if (deleteAskInfo.code === 500) {
            // 서버 연결 안됨
            setError({
                isError: true,
                errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
            });
            return;
        }

        if (deleteAskInfo.status === 404) {
            // 문의 삭제 실패
            setError({
                isError: true,
                errorMsg: '문의 삭제에 실패하였습니다.'
            });
            return;
        }

        if (deleteAskInfo.status === 500) {
            // 에러 발생
            setError({
                isError: true,
                errorMsg: '문의 삭제 중 에러가 발생하였습니다.'
            });
            return;
        }

        setEnroll({
            isEnroll: true,
            enrollMsg: '문의를 삭제하셨습니다.'
        });

        setContent('')
        setIsClick(!isClick);
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

    const checkEnroll = () => {
        setEnroll({
            isEnroll: false,
            enrollMsg: '',
        });
    }

    return (
        <AskAdminPresenter
            onSubmit={onSubmit}
            onDelete={onDelete}

            setContent={setContent}
            asks={asks}
            userType={userType}

            selectTab={selectTab}
            setSelectTab={setSelectTab}

            error={error}
            checkError={checkError}

            enroll={enroll}
            checkEnroll={checkEnroll}
        />
    )
}

export default AskAdminContainer;