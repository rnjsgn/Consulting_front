import styled from "styled-components";
import { Button } from "../../Button/Button";
import './PayInfoBox.css';
import { useNavigate } from "react-router-dom";

const PayInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    width: 100%;

    padding: 1rem;

    border-radius: 5px;

    background-color: ${(props) => props.isCoin ? '#FA709A51' : '#FEE14051'};
`;

export const PayInfoBox = ({
    isCoin,
    userInfo,
}) => {
    const navigate = useNavigate();

    return (
        <PayInfoContainer isCoin={isCoin} className="pay-info-container">
            {
                isCoin ?
                    <>
                        <div className="pay-info-title">
                            보유코인
                        </div>
                        <div className="pay-info-count">
                            {userInfo?.total_coin} 코인
                        </div>
                        <Button
                            className="pay-info-button"

                            title={'충전'}
                            width={'fit-content'}
                            padding={'0.25rem 1rem'}
                            backgroundColor={'#FA709A'}
                            borderColor={'#FA709A'}
                            color={'white'}

                            onClick={() => {
                                navigate('/user/charge/coin')
                            }}
                        />
                    </>
                    :
                    <>
                        <div className="pay-info-title">
                            보유복머니
                        </div>
                        <div className="pay-info-count">
                            {userInfo?.lucky_pouch} 개
                        </div>
                        <Button
                            className="pay-info-button"

                            title={'충전'}
                            width={'fit-content'}
                            padding={'0.25rem 1rem'}
                            backgroundColor={'#FEE140'}
                            borderColor={'#FEE140'}

                            onClick={() => {
                                navigate('/user/charge/coin', {
                                    state: {
                                        isCoin: isCoin ? 1 : 2
                                    }
                                })
                            }}
                        />
                    </>
            }
        </PayInfoContainer>
    )
}