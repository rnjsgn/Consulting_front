import React from "react";
import Layout from "../../../../components/Layout/Layout";
import { CounselorBodyLayout } from "../../../../components/Layout/CounselorBody/CounselorBodyLayout";
import { Calendar } from "../../../../components/Layout/Calendar/Calendar";
import { ModalComponent } from "../../../../components/Layout/Modal/Modal";
import { Button } from '../../../../components/Layout/Button/Button';
import { Popup } from "../../../../components/Layout/Popup/Popup";
import { CouneslorRequest } from '../../../../assets/mymenuImg';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CounselorMyInfo } from "./components/CounselorMyInfo";
import { MenuList } from "./components/MenuList";

const CounselorMainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
`;

const CounselorMainWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;

    width: 100%;
    max-width: 500px;
    min-width: 360px;
`;

export const CounselorMainPresenter = ({
    counselor,

    myMenuItems,

    logOut,

    error,
    setError,
    checkError,
}) => {
    return (
        <Layout nav={0} title={'상담사 마이메뉴'}>
            <CounselorMainContainer>
                <CounselorMainWrap>
                    <CounselorMyInfo 
                        counselor={counselor}
                    />
                    <Calendar
                        setError={setError}
                        counselor={counselor}
                    />
                    <MenuList
                        myMenuItems={myMenuItems}
                    />  
                    {/* <CounselorBodyLayout /> */}
                    {
                        <Link style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }} to={'/counselor/request'}>
                            <CouneslorRequest />
                        </Link>
                    }
                    <Button
                        title={'로그아웃'}
                        onClick={logOut}
                    />
                    {/* {counselor.name} */}
                </CounselorMainWrap>
            </CounselorMainContainer>

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
        </Layout>
    )
}