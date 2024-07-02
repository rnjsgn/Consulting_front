import React from "react";
import { Tabs } from "antd";
import { Empty } from "../../../../../components/Layout/Empty/Empty";
import { Ask } from "../../../../../components/Layout/Ask/Ask";
import './AskTab.css'
import { AskHistory } from "../../../../../components/Layout/AskHistory/AskHistory";

export const AskTab = ({
    setContent,
    asks,
    userType,

    selectTab,
    setSelectTab,

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
                        category={"관리자"}
                        onClick={onSubmit}

                        onChange={setContent}
                    />
                </div>
        },

        {
            key: '2',
            label: '문의내역',
            children:
                <div>
                    {
                        asks.length === 0
                            ?
                            <Empty />
                            :
                            <AskHistory
                                userType={userType}
                                asks={asks}
                                onClick={onDelete}
                            />
                    }
                </div>
        }
    ];

    return (
        <div className="asktab-container">
            <Tabs
                items={items}

                activeKey={selectTab}
                onChange={setSelectTab}
            />
        </div>
    )
}