import React from "react";
import { NoticeBox } from "../../../../../components/Layout/NoticeBox/NoticeBox";
import { Link } from "react-router-dom";

export const WriteList = ({
    writes,
    userType
}) => {

    return (
        <div className="noticelist">
            {writes.map((write) => (
                write.secret_accept == 0 || userType == '관리자' ? (
                    <Link to={`/user/to/detail/${write.id}`} key={write.id}>
                        <NoticeBox write={write} />
                    </Link>
                ) : (
                    <NoticeBox write={write} />
                )
            ))}
        </div>
    )
}