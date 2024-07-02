import React, { useState } from 'react'
import { Modal, Button } from 'antd';
import { InputComponent } from '../Input/InputComponent';
import { ModalComponent } from '../Modal/Modal';
import { Link, useNavigate } from 'react-router-dom';
import './List.css'
import API from '../../../api/API';

export const List = ({
    counselors,
    moveCounselorDetail,

    favorites,
    addFavorite,
    deleteFavorite,

    // isModalOpen,
    // modalOpen,
    // handleOk,
    // handleCancel,
    // modalItems,
    // modalButtons,

    isCounselor,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectCounselor, setSelectCounselor] = useState('');



    /**
     * 모달 오픈
     */
    const modalOpen = (counselor) => {
        setSelectCounselor(counselor);
        setIsModalOpen(true);
        setModalItems([
            {
                text: '예명',
                value: counselor.nickname,
            },
            {
                text: '가격',
                value: counselor.price,
            },
        ])
    }

    /**
     * 모달 아이템
     */
    const [modalItems, setModalItems] = useState([
        {
            text: '',
            value: '',
        },
    ]);



    return (
        <div className='list-container'>
            {
                counselors &&
                counselors.map((counselor, idx) => {
                    return (
                        <div className={`list ${idx}`} key={`list ${idx}`}>
                            <div className='list-img' onClick={() => moveCounselorDetail(counselor.id, counselor.price)}>
                                <img src={counselor.img} alt='이미지'></img>
                            </div>
                            <div className='list-info'>
                                <span>{counselor.nickname}</span>
                                <span>{counselor.price}</span>
                                {/* <span>{counselor.tag}</span> */}
                                <ul>
                                    {
                                        counselor.tag &&
                                        counselor.tag.map((tag, idx) => {
                                            return (
                                                <span className={`tag ${idx}`} key={`tag ${idx}`}>{tag}</span>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {
                                !isCounselor &&
                                <div className="list-btns">
                                    <button className='list-btn' onClick={() => modalOpen(counselor)}>상담하기</button>
                                    {
                                        favorites &&
                                            favorites.filter(favorite => favorite.counselor_id === counselor.id).length ?
                                            <button className='list-btn' onClick={() => { deleteFavorite(counselor.id) }}>취소</button> :
                                            <button className='list-btn' onClick={() => { addFavorite(counselor.counselor_id) }}>좋아요</button>
                                    }
                                </div>
                            }
                        </div>
                    )
                })
            }
            <ModalComponent
                title={'상담하기'}
                open={isModalOpen} //열림 여부
                cancelText={'닫기'}
                items={modalItems}
                selectCounselor={selectCounselor}

                isShowCancel={true}
                handleCancel={() => setIsModalOpen(false)}
                setIsModalOpen={setIsModalOpen}
            >
            </ModalComponent>
        </div>
    )
}
