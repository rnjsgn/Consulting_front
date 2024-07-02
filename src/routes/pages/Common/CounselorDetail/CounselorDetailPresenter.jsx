import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from '../../../../components/Layout/Layout';
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { CounselorInfo } from './components/CounselorInfo';
import { CounselorIntro } from './components/CounselorIntro';
import { CounselorTime } from './components/CounselorTime';
import { Donation } from "./components/Donation/Donation";
// import { Drawer } from "antd";
import { Drawer } from "../../../../components/Layout/Drawer/Drawer";
import { Alert } from "../../../../components/Layout/Alert/Alert";
import './CounselorDetail.css';
import { CounselorConsulting } from "./components/CounselorConsulting";
import { ModalBox } from "../../../../components/Layout/ModalBox/ModalBox";
import { LuckyPouchCard } from "../../../../components/Layout/LuckyPouchCard/LuckyPouchCard";
import { Popup } from "../../../../components/Layout/Popup/Popup";
import { LuckyPouchHead } from "../../../../components/Layout/LuckyPouchCard/LuckyPouchHead";

const CounselorDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    // 패딩 추가함
    // padding: 0 1rem 0 1rem;
`;

export const CounselorDetailPresenter = ({
    userInfo,
    userType,

    counselor,
    counselor_id,
    reviews,

    isModalOpen,
    setIsModalOpen,
    modalOpen,
    handleCancel,
    modalItems,
    modalButtons,

    isDonationOpen,
    openDonationDrawer,
    closeDonationDrawer,

    done,
    setDone,
    checkDone,

    error,
    setError,
    checkError,

    enroll,
    setEnroll,
    checkEnroll,

    onBuy,

    isOpenPresent,
    setIsOpenPresent,

    productionInfo,
    productionInfos,

    isShowReviews,
    toggleShowReviews,

    counselorFavoriteList,
    favoriteInfo,
    addFavorite,
    deleteFavorite,

    // isClick,
    // setIsClick,
    clickEvent,

    goBack,
    goToAsk,
}) => {
    return (
        <Layout nav={1} title={`${counselor.nickname}`}>
            <CounselorDetailContainer>
                {
                    counselor ?
                        <>
                            <CounselorInfo
                                counselor={counselor}

                                userType={userType}

                                // isModalOpen={isModalOpen}
                                modalOpen={modalOpen}
                                handleCancel={handleCancel}
                                modalItems={modalItems}
                                modalButtons={modalButtons}
                                productionInfos={productionInfos}

                                openDonationDrawer={openDonationDrawer}

                                counselorFavoriteList={counselorFavoriteList}
                                favoriteInfo={favoriteInfo}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}

                                reviews={reviews}
                                goToAsk={goToAsk}

                                isModalOpen={isOpenPresent}

                                setIsOpenPresent={setIsOpenPresent}

                                setError={setError}
                                setEnroll={setEnroll}
                            />
                            <CounselorTime 
                                counselor={counselor}
                            />
                            <CounselorIntro
                                userType={userType}

                                counselor={counselor}
                                counselor_id={counselor_id}

                                productionInfos={productionInfos}

                                reviews={reviews}
                                isShowReviews={isShowReviews}
                                toggleShowReviews={toggleShowReviews}

                                // isClick={isClick}
                                // setIsClick={setIsClick}
                                clickEvent={clickEvent}
                            />
                            <CounselorConsulting
                                counselor={counselor}

                                favoriteInfo={favoriteInfo}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}

                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                modalOpen={modalOpen}
                                handleCancel={handleCancel}
                                modalItems={modalItems}
                                modalButtons={modalButtons}
                                productionInfos={productionInfos}
                                productionInfo={productionInfo}
                            />
                        </> :
                        <div className="non-counselor">
                            해당 상담사가 존재하지 않습니다.
                            <button onClick={goBack}>돌아가기</button>
                        </div>
                }
            </CounselorDetailContainer>

            <ModalBox
                isModalOpen={isOpenPresent}
                title={<LuckyPouchHead counselorInfo={counselor}/>}

                onClose={() => {
                    setIsOpenPresent(false);
                }}
            >
                <LuckyPouchCard
                    counselor={counselor}

                    setError={setError}
                    setDone={setDone}
                />
            </ModalBox>

            {/* 완료 알림 */}
            <Popup
                type={'done'}

                isModalOpen={done.isDone}
                onClose={checkDone}

                content={done.doneMsg}
            />

            {/* 후원 드로어 */}
            {/* <Drawer
                open={isDonationOpen}
                onClose={closeDonationDrawer}
                placement="bottom"
            >
                <Donation
                    userInfo={userInfo}
                    counselor={counselor}
                    productionInfo={productionInfos[0]}

                    closeDonationDrawer={closeDonationDrawer}

                    // setIsClick={setIsClick}
                    clickEvent={clickEvent}
                    setIsDone={setIsDone}
                    setError={setError}
                />
            </Drawer> */}

            {/* 에러 모달 */}
            <Popup
                type={'error'}

                isModalOpen={error.isError}
                onClose={checkError}

                content={error.errorMsg}
            />
        </Layout>
    )
}