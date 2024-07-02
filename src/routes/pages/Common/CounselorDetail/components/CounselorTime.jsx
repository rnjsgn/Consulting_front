import React from "react";
import "./CounselorTime.css";

import { TimeIcon } from '../../../../../assets/navImg';

export const CounselorTime = ({
    counselor
}) => {
    return(
        <div className="counselortime-container">
            {
                counselor.introduce_line === "null"
                ?
                <span className='content'>혜안으로 꿰뚫어보는 상대 속마음</span>
                :
                <span className='content'>{counselor.introduce_line}</span>
            }
            <span className="time">
                <span className="time-title">주 상담시간</span>
                {
                    (() => {
                        const Icon = TimeIcon
                        return (
                            <Icon />
                        )
                    })()
                }<span className="during-time">
                    {counselor.consulting_start_time} ~ {counselor.consulting_end_time}
                </span>
            </span>
        </div>
    )
}