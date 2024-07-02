import React from "react";
import "./Ask.css";
import { Button } from "../../../../../components/Layout/Button/Button";

export const Ask = ({
    setAnswer,
    onAnswer
}) => {
    return(
        <div className="ask-container">
            <div className="ask-wrap">
                <div className="ask-form">
                    <div className="ask-ul">
                        <ul>    
                            <li>문의 답변하기</li>
                        </ul>  
                    </div>
                    <div className="ask-text">
                        <textarea
                        onChange={(e) => {setAnswer(e.target.value)}}
                        placeholder="가슴은 뜨겁게, 문의는 솔직하게 작성해주세요."
                        rows={20}
                        />
                    </div>
                </div>
                <div className="ask-button">
                    <Button onClick={onAnswer} title={'작성하기'}></Button>
                </div>
            </div>
        </div>
    )
}