import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import img from './JooyaJooya.png';

export const Footer = () => {
    const [isShow, setIsShow] = useState(false);

    const toggleClick = () => {
        setIsShow(!isShow);
    };

    const userInfo = [
        '상호명 : 주식회사 제론 코퍼레이션 | 사업자등록번호 :  880-86-03222',
        '주소 : 서울특별시 강남구 테헤란로 82길 15, 295호 (대치동)',
        '이메일 : help@jooyajooya.com  |  개인정보관리자 : 최연욱',
        '통신판매신고번호 : 제 2024-서울강남-01764 호',
        '대표자 : 송영석  |  전화번호 : 1555-1710 | 상담시간 : 오전 10시 ~ 오후 5시',
    ];

    return (
        <div className='footer-container'>
            <div className='footer-wrap'>
                <div className='footer-img'
                    onClick={toggleClick}
                >
                    <img src={img} />
                    <span className='footer-btn'>
                        <span>사업자 정보</span>
                        <FontAwesomeIcon icon={faChevronDown} className={`footer-btn-arrow ${isShow ? 'down' : 'up'}`} />
                    </span>
                </div>
                {/* <div className='company'>
                    <span>MDMD</span>
                </div> */}
                {/* <div className='ceo'>
                    <span>대표자명 : 임준오</span>
                </div> */}
                <div className='info' style={{ display: `${isShow ? 'block' : 'none'}` }}>
                    <ul>
                        {
                            userInfo.map((info, idx) => {
                                return (
                                    <li>
                                        <span>{info}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className='footer-copyright'>
                        <span>Copyright ⓒ JOOYAJOOYA. ALL RIGHTS RESERVED.</span>
                    </div>
                    <hr />
                    <div className='footer-companyinfo'>
                        <span>
                            (주) 제론코퍼레이션은 통신판매중개자로서 통신판매의 당사자가 아니며,
                            각 판매자(상담사)가 등록한 정보 및 거래에 대한 책임은 각 판매자(상담자)에게 있으며,
                            (주)제론 코퍼레이션은 책임을 지지 않습니다.
                        </span>
                    </div>
                    <div className='footer-terms'>
                        <Link to = '/terms' >
                            <span>이용약관</span>
                        </Link>
                        <Link to='/policy' >
                            <span>개인정보처리방침</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
