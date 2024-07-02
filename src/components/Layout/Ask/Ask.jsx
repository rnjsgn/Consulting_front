import React from "react";
import { Button } from "../Button/Button";
import "./Ask.css"

export const Ask = props => {
    const {onChange, onClick, category } = props

    return(
        <div className="ask-container">
            <div className="ask-wrap">
                <div className="ask-info">
                    <h3>무슨 일이신가요?</h3>
                    <span>문의하고 싶은 내용을 입력해주세요.</span>
                    <div className="select">
                    {
                        category === "상담사" ? 
                        <select>
                            <option value="ask1">포인트환불</option>
                            <option value="ask2">이슈사항</option>
                        </select> 
                        :
                        <></>
                    }
                    </div>
                </div>
                <div className="ask-form">
                    <div className="ask-ul">
                        <ul>    
                            <li>{category} 문의하기</li>
                        </ul>  
                    </div>
                    <div className="ask-text">
                        <textarea onChange={(e) => {onChange(e.target.value)}}
                        placeholder="가슴은 뜨겁게, 문의는 솔직하게 작성해주세요."
                        rows={20}
                        />
                    </div>
                </div>
                <div className="ask-button">
                    <Button title={'작성하기'} onClick={onClick}></Button>
                </div>
            </div>
        </div>
    )
}