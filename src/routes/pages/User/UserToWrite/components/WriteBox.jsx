import React from "react";
import { Input } from '../../../../../components/Layout/Input2/Input';
import './WriteBox.css';
import { Button } from "../../../../../components/Layout/Button/Button";

export const WriteBox = ({
    setTitle,
    setCounselorName,
    setContent,
    setIsSecret,

    onSubmit
}) => {
    return(
        <div className="writebox-container">
            <div className="writebox-counselor">
                <span>상담사</span>
                <Input 
                    placeholder = {'상담사 이름을 입력하세요.'}
                    onChange = {
                        (e) => setCounselorName(e)
                    }
                />
            </div>
            <div className="writebox-counselor">
                <span>제목</span>
                <Input 
                    placeholder = {'제목을 입력하세요.'}
                    onChange = {
                        (e) => setTitle(e)
                    }
                />
            </div>
            <div className="writebox-counselor">
                <span>내용</span>
                <textarea
                    placeholder="상담사에게 바라는 글을 입력하세요."
                    rows={10}
                    onChange={
                        (e) => setContent(e.target.value)
                    }
                />
            </div>
            <div className="writebox-check">
                <input type="checkbox" 
                    onClick={(e) => setIsSecret(e.target.checked)}
                />
                <span>익명글</span>
            </div>
            <div className="writebox-button">
                <Button
                    title={'등록'}
                    color={'black'}
                    backgroundColor={'#FEE140'}
                    borderColor={'#FEE140'}
                    
                    onClick={() => onSubmit()}
                />
            </div>
        </div>
    )
}