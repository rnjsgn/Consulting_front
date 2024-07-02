/**
 *
 *
 */
import React, { useEffect, useState } from 'react';
import Routes from '../routes';
import './App.css';
import { Button, notification, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { PhoneTwoTone, AlertTwoTone, PhoneOutlined } from '@ant-design/icons';
import { guidGenerator, getCookie } from '../utils';
import SocketManager from '../utils/SocketManager';
import MessageAlert from '../utils/MessageAlert';
import queryString from 'query-string';
// import 'assets/styles/bootstrap.min.css';

let Socket = null;
let socket = null;

/**
 * App
 * --
 */
const App = () => {
  /* ===== Init ===== */
  const navigate = useNavigate();
  const { search } = useLocation();
  const qs = queryString.parse(search);

  /* ===== state ===== */
  const cookie_id = getCookie('id');
  const [callReceivingSet, setCallReceivingSet] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const ACCESS_TYPE = `${getCookie('ACCESS_TYPE')}`;
  const counselorId = cookie_id ? `counselor_${cookie_id}` : null;
  const [roomId, setRoomId] = useState(null);
  /*  
  counselorId + userId
  `counselor_${상담사아이디}-customer_${접속자아이디}` => 화상접속주소
  */

  /**
   * 전화수신 리시버 오픈
   * --
   */
  const openNotification = () => {
    const key = `open${guidGenerator()}`;
    const btn = (
      <Space>
        <Button type="primary" block onClick={onConnectComplete}>
          연결하기 <PhoneOutlined />
        </Button>
      </Space>
    );
    api.open({
      message: '상담전화 알림',
      description:
        '고객의 상담요청입니다. 상담을 시작하려면 전화받기 버튼을 눌러 접속해주세요.',
      btn,
      key,
      duration: null,
      placement: 'top',
      icon: <AlertTwoTone style={{ fontSize: '1.17em' }} />,
      onClose: close,
    });
  };

  /**
   * 전화수신 닫기
   * --
   */
  const close = (isRefuseCall = true) => {
    setCallReceivingSet(false);
    if (isRefuseCall && socket) {
      socket.emit('refuseCall', counselorId);
    }
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.'
    );
  };

  /**
   * 연결 접속하기
   * --
   */
  const onConnectComplete = () => {
    close(false);
    socket.emit('acceptCall', counselorId, roomId);
    // navigate(`/consultingv1?roomId=${roomId}`);
    // navigate(`/consultingv1?roomId=${roomId}`);
  };

  /* ===== HOOK ===== */
  /**
   * 소켓 연결
   * --
   */
  useEffect(() => {
    const call = async () => {
      try {
        Socket = new SocketManager();
        Socket.onConnet();
        socket = Socket.getSocket();
        socket.emit('joinRoom', counselorId, {
          sender: '',
          recipient: '',
        });
      } catch (err) {
        console.log('Socket connection Error: ', err);
        MessageAlert.error('연결이 불안정합니다. 네트워크 상태를 확인해주세요');
      }
    };

    counselorId && ACCESS_TYPE === 'COUNSELOR' && call();
  }, [counselorId]);

  /**
   * 소켓 수신 리스너
   * --
   */
  useEffect(() => {
    const call = () => {
      /*  */
      socket.on('joinRoom', (receiveMsg) => {
        const {
          status, // 상태
          sender, // 고객
          recipient, // 상담사
        } = receiveMsg;
        // 전화접속 주소 생성
        const connectionURL = `${recipient}-${sender}`;

        if (status !== 'CONNECTED') {
          MessageAlert.error(
            '연결이 불안정합니다. 네트워크 상태를 확인해주세요'
          );
          return;
        }

        // 접속 주소 저장
        setRoomId(connectionURL);
        if (sender) {
          setCallReceivingSet(true);
          // openNotification();
        }
      });

      /* leaveRoom */
      socket.on('leaveRoom', (receiveMsg) => {
        console.log('[leaveRoom] 채팅방 나가기:', receiveMsg);
        setCallReceivingSet(false);
      });

      /* acceptCall */
      socket.on('acceptCall', (receiveMsg) => {
        // 상담사
        navigate(`/consultingv1?roomId=${receiveMsg}`);
      });
    };

    socket && call();

    /* Component leave */
    return () => {
      if (counselorId) {
        socket.emit('leaveRoom', counselorId, 'newData');
      }
      Socket = null;
      socket = null;
    };
  }, []);

  /*  */
  useEffect(() => {
    if (callReceivingSet) {
      openNotification();
    } else {
      close(false);
    }
  }, [callReceivingSet]);

  /* ===== RENDER ===== */
  return (
    // {/* Router */ }
    <>
      {callReceivingSet && !qs.roomId && contextHolder}
      {/* {contextHolder} */}
      <Routes />
    </>
  );
};

export default App;
