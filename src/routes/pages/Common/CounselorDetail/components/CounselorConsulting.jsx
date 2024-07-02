import React from "react";
import { Button } from "../../../../../components/Layout/Button/Button";
import { ModalComponent } from "../../../../../components/Layout/Modal/Modal";
import { ModalBox } from "../../../../../components/Layout/ModalBox/ModalBox";
import { ConsultingBox } from "../../../../../components/Layout/ConsultingBox/ConsultingBox";
import { SubscribeEmpty } from "../../../../../assets/counselorImg";
import { SubscribeFill } from "../../../../../assets/counselorImg";

import "./CounselorConsulting.css";

import { CallIcon, PhoneIcon, StopCallIcon } from '../../../../../assets/navImg';

export const CounselorConsulting = ({
    counselor,

    favoriteInfo,
    deleteFavorite,
    addFavorite,

    isModalOpen,
    setIsModalOpen,
    modalOpen,
    handleCancel,
    modalItems,
    modalButtons,
    productionInfos,
    productionInfo
}) => {
    return (
        <div className="counselorconsulting-container">
            <span className="subscribe" onClick={() => {
                favoriteInfo ? deleteFavorite(counselor.id) : addFavorite(counselor.id)
            }}>
                {
                    favoriteInfo ?
                        < SubscribeFill /> :
                        < SubscribeEmpty />
                }
                구독설정
            </span>
            {
                counselor.consulting_status === "부재" ? (
                    <Button
                        className="consulting-btn"
                        title={"자리비움"}
                        icon={
                            (() => {
                                const Icon = StopCallIcon
                                return (
                                    <Icon />
                                )
                            })()
                        }
                        backgroundColor={"#EFEFEF"}
                        color={"#8E8E8E"}
                        borderColor={"#EFEFEF"}
                        width={'80%'}
                        onClick={e => e.preventDefault()}
                    />
                ) : (
                    counselor.consulting_status === "상담" && "진행" && "일시정지" ? (
                        <Button
                            className="consulting-btn"
                            title={"상담중"}
                            icon={
                                (() => {
                                    const Icon = PhoneIcon
                                    return (
                                        <Icon />
                                    )
                                })()
                            }
                            backgroundColor={"white"}
                            color={"#FA709A"}
                            borderColor={"#FA709A"}
                            width={'80%'}
                            onClick={e => e.preventDefault()}
                        />
                    ) : (
                        <Button
                            className="consulting-btn"
                            title={'상담하기'}
                            icon={
                                (() => {
                                    const Icon = CallIcon
                                    return (
                                        <Icon />
                                    )
                                })()
                            }
                            backgroundColor={'#FA709A'}
                            borderColor={'#FA709A'}
                            color={'white'}
                            width={'80%'}
                            onClick={modalOpen}
                        />
                    )
                )
            }


            {/* <ModalComponent
                title={'상담하기'}
                open={isModalOpen}

                handleCancel={handleCancel}
                isShowCancel={true}
                cancelText="닫기"

                items={modalItems}
                buttons={modalButtons}
                selectCounselor={productionInfos[0]}

                setIsModalOpen={modalOpen}
            /> */}
            <ModalBox
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={'상담하기'}
            >
                <ConsultingBox
                    counselor={counselor}
                    setIsModalOpen={setIsModalOpen}
                />
            </ModalBox>
        </div>
    )
}