import React from "react";
import { Tabs } from "antd";
import { Ask } from "../../../../../components/Layout/Ask/Ask";
import './AskTab.css'
import { AskHistory } from "../../../../../components/Layout/AskHistory/AskHistory";

export const AskTab = ({
    setContent,
    asks,
    userType,

    onSubmit,
    onDelete
}) => {
    const items = [
        /**
         * 문의하기
         */
        {
            key: '1',
            label: '문의하기',
            children:
                <div>
                    <Ask
                        onChange={setContent}
                        category={"상담사"}

                        onClick={onSubmit}
                    />
                </div>
        },

        {
            key: '2',
            label: '문의내역',
            children:
                <div>
                    <AskHistory
                        asks={asks}
                        userType={userType}
                        
                        onClick={onDelete}
                    />
                </div>
        }
    ];

    return (
        <div className="asktab-container">
            <Tabs items={items} />
        </div>
    )
}