import React from "react";
import { AskHistoryBox } from "../AskHistoryBox/AskHistoryBox";
import { Collapse } from "antd";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import "./AskHistory.css";

export const AskHistory = (props) => {

    const { asks, userType, onClick } = props

    const { Panel } = Collapse;

    return(
        <div className="askhistory-container">
            <Collapse>
                {
                    asks.map((ask) => (
                        <Panel key={ask.id} header={
                            <AskHistoryBox
                            onClick={onClick}
                            ask = {ask}
                            userType={userType}
                            />}>
                                <div className="panel">
                                    <div className="panel-content">
                                        {ask.content}

                                        {
                                        ask.answer.length ?
                                            <div className="panel-answer">
                                                {
                                                    ask.answer.map((answer, index) => (
                                                        <div className="panel-answer-content" key={`${ask.id} ${index}`}>
                                                            {answer.content}
                                                        </div>
                                                    ))
                                                }
                                            </div> : <></>
                                        }
                                    </div>
                                    <div className="panel-button">
                                        {
                                            (ask.category === "상담사문의" && userType === "상담사") &&
                                            <Link to={`/answer/${ask.id}`} >
                                                <Button title={"답변"}></Button>
                                            </Link>
                                        }
                                    </div>
                                </div>
                        </Panel>  
                    ))
                }
            </Collapse>
        </div>
    )
}