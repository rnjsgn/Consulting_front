import React, { useEffect, useState } from "react";
import "./RequestBox.css";

export const RequestBox = ({
    requests
}) => {
    const [visible, setVisible] = useState([]);
    const [show, setShow] = useState(false);

    console.log(requests);

    useEffect(() => {
        // 처음 3개의 리스트만 보여주기
        setVisible(requests?.slice(0, 3));

        // 요청의 개수가 3개 이상인 경우 "더보기" 버튼 표시
        setShow(requests.length > 3);

    }, [requests])

    const handleShowMore = () => {
        if (requests.length <= visible.length) {
            setShow(false);
        } else {
            setVisible(requests?.slice(0, visible.length + 3));
        }

        if (show === false) {
            setVisible(requests?.slice(0, 3));
            setShow(true)
        }
    };

    useEffect(() => {
        if (requests.length <= visible.length) {
            setShow(false);
        }
    }, [visible])

    // 날짜 변환
    const convertIsoToCustomFormat = function (isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear().toString().slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    return (
        <div className="requestbox-container">
            <div className="requestbox-title">
                <span>신청 목록</span>
            </div>
            <div className="requestbox-table">
                <table>
                    <tr>
                        <th>상담분야</th>
                        <th className="center">제목</th>
                        <th>작성일</th>
                    </tr>
                    {
                        visible.map((request, idx) => (
                            <>
                                <tr key={idx}>
                                    <td>{request.category}</td>
                                    <td className="center">{request.title}</td>
                                    <td>{convertIsoToCustomFormat(request.createdAt)}</td>
                                </tr>
                            </>
                        ))
                    }
                </table>
                {
                    requests.length < 3
                        ?
                        <></>
                        :
                        (
                            show
                                ?
                                <div className="add">
                                    <span onClick={handleShowMore}>더보기</span>
                                </div>
                                :
                                <div className="add">
                                    <span onClick={handleShowMore} className="add">접기</span>
                                </div>
                        )
                }
            </div>
        </div>
    )
}