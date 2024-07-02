import React, { useEffect } from "react";
import Layout from '../../../../components/Layout/Layout';
import { Banner } from '../../../../components/Layout/Banner/Banner';
import { List } from '../../../../components/Layout/List2/List2';
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import './Main.css';
import styled from "styled-components";
import { Tabs } from "antd";
import { Empty } from "../../../../components/Layout/Empty/Empty";
import { CategoryButton } from "./components/CategoryButton";
import { ModalBox } from "../../../../components/Layout/ModalBox/ModalBox";
import { LuckyPouchCard } from "../../../../components/Layout/LuckyPouchCard/LuckyPouchCard";
import { Popup } from "../../../../components/Layout/Popup/Popup";

import { loading } from "../../../../assets/navImg";

export const MainPresenter = ({
    isSignIn,

    counselors,
    moveCounselorDetail,

    favorites,
    addFavorite,
    deleteFavorite,

    error,
    setError,
    checkError,

    isUser,
}) => {
    console.log(favorites)    

    const items = [
        {
            key: 1,
            label: '전체',
            children:
                <>
                    {
                        counselors.length === 0
                            ?
                            <>
                                {
                                    (() => {
                                        const Icon = loading;
                                        return (
                                            <Icon />
                                        )
                                    })()
                                }
                            </>
                            :
                            <List
                                counselors={counselors}
                                moveCounselorDetail={moveCounselorDetail}

                                favorites={favorites}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}

                                isUser={isUser}

                                setError={setError}
                            />
                    }
                </>
        },
        {
            key: 2,
            label: '상담중',
            children:
                <>
                    {
                        counselors.length === 0
                            ?
                            <>
                                {
                                    (() => {
                                        const Icon = loading;
                                        return (
                                            <Icon />
                                        )
                                    })()
                                }
                            </>
                            :
                            <List
                                counselors={counselors}
                                moveCounselorDetail={moveCounselorDetail}

                                favorites={favorites}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}

                                category = {'상담'}

                                isUser={isUser}

                                setError={setError}
                            />
                    }
                </>
        },
        {
            key: 3,
            label: '대기중',
            children:
                <>
                    {
                        counselors.length === 0
                            ?
                            <>
                                {
                                    (() => {
                                        const Icon = loading;
                                        return (
                                            <Icon />
                                        )
                                    })()
                                }
                            </>
                            :
                            <List
                                counselors={counselors}
                                moveCounselorDetail={moveCounselorDetail}

                                favorites={favorites}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}

                                category = {'대기'}

                                isUser={isUser}

                                setError={setError}
                            />
                    }
                </>
        },
        {
            key: 4,
            label: '부재중',
            children:
                <>
                    {
                        counselors.length === 0
                            ?
                            <>
                                {
                                    (() => {
                                        const Icon = loading;
                                        return (
                                            <Icon />
                                        )
                                    })()
                                }
                            </>
                            :
                            <List
                                counselors={counselors}
                                moveCounselorDetail={moveCounselorDetail}

                                favorites={favorites}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}

                                isUser={isUser}

                                category = {'부재'}

                                setError={setError}
                            />
                    }
                </>
        },
    ]

    return (
        <Layout nav={1} isMain={true}>
            <div className="main-container">
                {
                    !isSignIn &&
                    <div className="notice">로그인을 하셔야 상담 서비스를 이용하실 수 있습니다.</div>
                }
                <Banner isSignIn={isSignIn} />
                <CategoryButton />
                <Tabs items={items} style={{ position: 'sticky' }} />


                <Popup
                    type={'error'}

                    isModalOpen={error.isError}
                    onClose={checkError}

                    content={error.errorMsg}
                />

                {/* <ModalComponent
                    open={error.isError}

                    isShowText={true}
                    text={error.errorMsg}

                    isShowOk={true}
                    handleOk={checkError}
                /> */}
            </div>
        </Layout>
    )
}