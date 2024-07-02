
import React from 'react'
import './CommonBox.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


/* options -> height(높이), color(테두리,배경색), data: 내용 및 이미지 데이터 */
const CommonBoxContainer = styled.div`
    display: flex;

    width: 100%;
    height: ${(props) => props.height ? props.height : '12vh'} ;

    padding: 0.5rem;
    border: 1px solid ${(props) => props.color ? props.color : '#FFFFFF'};
    border-radius: 5px;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);

    background-color:${(props) => props.color ? props.color : '#ffffff'};
`

const CommonBoxLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    font-size: 1rem;
    font-weight: bold;  
`
const CommonBoxTitle = styled.span`
    
`


export const CommonBox = (props) => {
    // const item = {
    //     name: 'detail',
    //     title: '상세 페이지',
    //     url: '/counselor/detail',
    //     img: ''
    // }
    
    const {url, title} = props

    return (
        <CommonBoxContainer>
            <CommonBoxLink to={url}>
                <CommonBoxTitle>
                    {title}
                </CommonBoxTitle>
            </CommonBoxLink>
        </CommonBoxContainer>
        // <div className={`common-box ${item.name}`}>
        //     <Link to={item.url}>
        //         <span>
        //             {item.title}
        //         </span>
        //     </Link>
        // </div>
    )
}
