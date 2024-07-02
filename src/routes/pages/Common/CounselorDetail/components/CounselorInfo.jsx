import React from "react";
import { Link } from "react-router-dom";
import { ModalComponent } from "../../../../../components/Layout/Modal/Modal";
import { faHeart as fullHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as hollowHeart } from "@fortawesome/free-regular-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '../../../../../components/Layout/Button/Button';
import { LuckyPouchCard } from "../../../../../components/Layout/LuckyPouchCard/LuckyPouchCard";
import { ModalBox } from "../../../../../components/Layout/ModalBox/ModalBox";
import { Skeleton } from "antd";

import example from './example.png';

import { CrownIcon, MoneyIcon, ShareIcon, mainLikeIcon, mainLikeEmptyIcon, mainSubscribeIcon, mainLuckyMoneyIcon, loading } from '../../../../../assets/navImg';

import './CounselorInfo.css';

export const CounselorInfo = ({
    counselor,

    userType,

    isModalOpen,
    modalOpen,
    handleCancel,
    modalItems,
    modalButtons,
    productionInfos,

    openDonationDrawer,

    counselorFavoriteList,
    favoriteInfo,
    addFavorite,
    deleteFavorite,

    reviews,

    goToAsk,

    enroll,
    setEnroll,
    checkEnroll,

    error,
    setError,
    checkError,

    isOpenPresent,
    setIsOpenPresent,
}) => {
    return (
        <div className="counselor-info-container">
            <div className="counselor-image">
                {
                    counselor.profile_img ?
                        <img src={counselor.profile_img} alt="상담사 이미지" /> :
                        <>
                            {
                                (() => {
                                    const Icon = loading
                                    return (
                                        <Icon />
                                    )
                                })()
                            }
                        </>
                }
                <div className="counselor-detail">
                    <div className="first-form">
                        <span className="partner">
                            {
                                (() => {
                                    const Icon = CrownIcon
                                    return (
                                        <Icon />
                                    )
                                })()
                            } 파트너
                        </span>
                        <div className="first-form-right">
                            {
                                counselor.consulting_status === "부재"
                                ?
                                <span className='status-on1'>⦁ 부재중</span>
                                :
                                counselor.consulting_status === "상담" && "진행" && "일시정지"
                                ?
                                <span className='status-on'>⦁ 상담중</span>
                                :
                                <span className='status-on2'>⦁ 대기중</span>
                            }
                            {/* <span className="nickname">{counselor.nickname}</span> */}
                            <span className="favorite">
                                {
                                    favoriteInfo ?
                                        // <FontAwesomeIcon className="cancel" icon={fullHeart} onClick={() => { deleteFavorite(counselor.id) }} /> :
                                        // <FontAwesomeIcon icon={hollowHeart} onClick={() => { addFavorite(counselor.id) }} />
                                        (
                                            () => {
                                                const Icon = mainLikeIcon;
                                                return <Icon onClick={() => { deleteFavorite(counselor.id) }} />
                                            }
                                        )() :
                                        (
                                            () => {
                                                const Icon = mainLikeEmptyIcon;
                                                return <Icon onClick={() => { addFavorite(counselor.id) }} />
                                            }
                                        )()
                                }
                            </span>
                            <span className="instagram">
                                {
                                    (() => {
                                        const Icon = ShareIcon
                                        return (
                                            <Icon />
                                        )
                                    })()
                                }
                            </span>
                        </div>
                    </div>
                    <div className="second-form">
                        <div className="second-form-right">
                            <span className="counselor-name">
                                {counselor.name}
                            </span>
                            <span className="counselor-category">
                                전화{counselor.category}
                            </span>
                        </div>
                        <div className="second-form-left">
                            <span className="counselor-coin">
                                {
                                    (() => {
                                        const Icon = MoneyIcon
                                        return (
                                            <Icon />
                                        )
                                    })()
                                } {counselor.price}원
                                <span className="counselor-time">( 10초 )</span>
                            </span>
                        </div>
                    </div>
                    <div className="third-form">
                        <span className='subscribe'>
                            {
                                (() => {
                                    const MainIcon = mainSubscribeIcon
                                    return (
                                        <MainIcon />
                                    )
                                })()
                            } 구독
                            <span className='count'> ({counselorFavoriteList.length})</span>
                        </span>
                        <span className='like'>
                            {
                                (() => {
                                    const MainIcon = mainLikeIcon
                                    return (
                                        <MainIcon />
                                    )
                                })()
                            } 좋아요
                            <span className='count'> ({counselorFavoriteList.length})</span>
                        </span>
                        <span className='luckymoney'>
                            {
                                (() => {
                                    const MainIcon = mainLuckyMoneyIcon
                                    return (
                                        <MainIcon />
                                    )
                                })()
                            } 복머니
                            <span className='count'> ({counselor.lucky_pouch})</span>
                        </span>
                    </div>
                    <div className="forth-form">
                        <span className="special">전문분야</span>
                        <div className="tag-zip">
                            <span className='tag'>#속마음</span>
                            <span className='tag'>#애정</span>
                            <span className='tag'>#재회</span>
                        </div>
                        <span className="special">스타일</span>
                        <div className="tag-zip">
                            <span className='tag'>#소통</span>
                            <span className='tag'>#편안한</span>
                            <span className='tag'>#목소리</span>
                        </div>
                    </div>
                    <div className="five-form">
                        {
                            userType === "고객"
                                ?
                                (
                                    <Button
                                        className="present"
                                        title={"선물하기"}
                                        backgroundColor={"#FEE140"}
                                        borderColor={"#FEE140"}
                                        color={'black'}
                                        onClick={() => { setIsOpenPresent(true); }}
                                    />
                                ) : (
                                    <></>
                                )
                        }
                    </div>
                </div>
            </div>

            <div className="counselor-info-box">
                {/* <div className="counselor-info">
                    <span className="counselor-category">분류</span>
                    <span className="counselor-nickname">{counselor.nickname}</span>
                    <span className="counselor-rating">등급</span>
                </div> */}

                {/* <div className="counselor-links">
                    <Link to={'/user/donation'}>선물하기</Link>
                    <Button title={'후원'} type={'basic'} onClick={openDonationDrawer} />
                    <Button title={'문의'} type={'basic'} onClick={goToAsk} />
                    <button className="consulting-button" onClick={modalOpen}>상담</button>
                    <ModalComponent
                        title={'상담하기'}
                        open={isModalOpen}

                        handleCancel={handleCancel}
                        isShowCancel={true}
                        cancelText="닫기"

                        items={modalItems}
                        buttons={modalButtons}
                        selectCounselor={productionInfos[0]}

                        setIsModalOpen={modalOpen}
                    />
                </div> */}
            </div>
        </div>
    )
}