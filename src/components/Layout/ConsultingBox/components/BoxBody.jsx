import { Button } from '../../Button/Button';
import { MoneyIcon } from '../../../../assets/navImg';
import { Link, useNavigate } from 'react-router-dom';
import { PayInfoBox } from './PayInfoBox';
import cookie from '../../../../cookie';
import API from '../../../../api/API';

import './BoxBody.css';

export const BoxBody = ({
    counselor,
    isSignin,
    userInfo,

    setIsModalOpen,
    setError,
}) => {
    const navigate = useNavigate();

    /**
     * 상담 연결 (V1)
     */
    const connectConsultingV1 = async () => {
        const user = cookie.getCookie('id');
        if (!user) {
            setError({
                isError: true,
                errorMsg: '로그인이 필요합니다.',
            });
            return;
        }

        console.log(counselor);
        const params = {
            counselor_id: counselor.counselor_id ? counselor?.counselor_id : counselor?.id,
            price: counselor.price,
        };

        //1차 요청
        const response = await API.getCounsultRequest({ params });

        //상담 db에 요청 실패 로그
        if (response.status === 401) {
            //유효하지 않은 고객 또는 상담사
            console.log('유효하지 않은 고객 또는 상담사');
            return;
        }
        if (response.status === 402) {
            // 고객 코인부족
            console.log('고객 코인부족');
            setError({
                isError: true,
                errorMsg: '코인이 부족합니다.'
            })
            return;
        }
        if (response.status === 403) {
            // 현재 상담사 대기상태 아님
            console.log('현재 상담사 대기상태 아님');
            setError({
                isError: true,
                errorMsg: '현재 상담사가 부재중입니다.'
            })
            return;
        }

        console.log(response);

        const body = {
            counselor_id: response.status.is_counselor.id,
            roomId: response.status.roomId,
        };

        //요청 성공
        // 상담 생성 1차 대기상태
        const createRoom = await API.postConsultingCreate(body);
        console.log(createRoom);
        console.log(createRoom);

        /**
         *  요청 검증 후 소켓 연결부분
         *  host, guest, roomid 정보는 response변수에 담겨있음
         */

        //consulting api 연동 부분

        setIsModalOpen(false);
        // Consulting V1 이동
        navigate(`/consultingv1/${createRoom.status.counselor_id}`, {
            state: {
                roomId: response.status.roomId,
                counselorId: createRoom.status.counselor_id,
                userId: createRoom.status.user_id,
            },
        });
    };

    return (
        <div className="box-body">
            <div className="consulting-info">
                <div className="consulting-info-item">
                    {
                        (
                            () => {
                                const Money = MoneyIcon;
                                return (
                                    <Money />
                                )
                            }
                        )()
                    }
                    <span className='info-bold'>전화상담 (선불)</span>
                </div>
                <div className="consulting-info-item">
                    <span className='info-bold'>{counselor?.price} 코인</span>
                    <span style={{ color: '#8E8E8E' }}> ( 10초 )</span>
                </div>
            </div>
            <div className="consulting-pay-info">
                {
                    isSignin ?
                        <div className="pay-info-item user">
                            <PayInfoBox
                                isCoin={true}
                                userInfo={userInfo}
                            />

                            <PayInfoBox
                                isCoin={false}
                                userInfo={userInfo}
                            />
                        </div>
                        :
                        <div className="pay-info-item non-user">
                            <div className="info-item">
                                코인상담은 로그인 후 이용 가능합니다.
                            </div>
                            <div className="info-item">
                                <Link to={'/signin'}>
                                    {`로그인 >`}
                                </Link>
                            </div>
                        </div>
                }
                <span className="info-text">
                    상담 버튼 클릭 시, 지정 상담사와 자동으로 연결됩니다.
                </span>
            </div>
            <Button
                title={'상담하기'}
                backgroundColor={'#FA709A'}
                borderColor={'#FA709A'}
                color={'white'}

                onClick={connectConsultingV1}
            />
        </div>
    )
}