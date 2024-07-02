import React from "react";
import "./CounselorTabContent.css";

const CounselorTabContent = ({
    title,
    content,
    read,
    icon,
    image,
}) => {

    return (
        <div className="counselor-tab-container">
            <div className="counselor-tab-wrap">
                <div className="tab-box">
                    <div className="tab-title-box">
                        {icon}
                        {title}
                        <span className="read">{read}</span>
                    </div>
                    <div className="tab-content-box">
                        {content}
                    </div>
                    {
                        image &&
                        <img src={image} alt="서비스 이미지" />
                    }
                </div>
            </div>
        </div>
    )
}

export default CounselorTabContent;