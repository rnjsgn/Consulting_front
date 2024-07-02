import React, { useEffect, useState } from "react";
import { ProfilePresenter } from "./ProfilePresenter";
import API from "../../../../api/API";
import { useNavigate } from "react-router-dom";
import cookie from '../../../../cookie';

const ProfileContainer = ({
  setCookies
}) => {
  const navigate = useNavigate();

  // 이메일 정규식
  const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const [isCheckEmail, setIsCheckEmail] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const [showPhone, setShowPhone] = useState('');

  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  });

  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: '',
  });

  /**
   * 이메일 형식 확인 함수
   */
  const checkEmail = () => {
    if (emailRegex.test(userInfo.email) === false) {
      // 이메일 형식 맞지 않음
      setIsCheckEmail(false);
      return;
    }
    setIsCheckEmail(true);
  }

  const autoHyphenPhoneNumber = (e, setValue) => {
    const rawPhone = e.replace(/-/g, '')
    let formattedPhone = ''

    if (rawPhone.length < 4) {
      formattedPhone = rawPhone
    } else if (rawPhone.length < 8) {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(3)}`
    } else if (rawPhone.length < 11) {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
        3,
        7,
      )}-${rawPhone.slice(7)}`
    } else {
      formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
        3,
        7,
      )}-${rawPhone.slice(7, 11)}`
    }

    const displayPhone = formattedPhone.length > 0 ? formattedPhone : ''
    setShowPhone(displayPhone)
  }

  useEffect(() => {
    if (userInfo.phone.length === 11) {
      setShowPhone(
        userInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      );
    } else if (userInfo.phone.length === 13) {
      setShowPhone(
        userInfo.phone
          //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      );
    }
  }, [userInfo.phone]);

  useEffect(() => {
    (
      async () => {
        // 유저 정보 가져오는 API 연결
        const id = cookie.getCookie('id');
        if (!id) {
          // 로그인 필요
          setError({
            isError: true,
            errorMsg: '로그인이 필요합니다.',
          });
          return;
        }

        const result = await API.getUser(id);
        if (result.code === 500) {
          // 서버 연결 안됨
          setError({
            isError: true,
            errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
          });
          return;
        }

        if (result.status === 404) {
          // 회원 정보 없음
          setError({
            isError: true,
            errorMsg: '회원 정보가 존재하지 않습니다.',
          });
          return;
        }

        if (result.status === 500) {
          // 에러 발생
          setError({
            isError: true,
            errorMsg: '회원 정보를 불러오는 중 에러가 발생하였습니다.',
          });
          return;
        }

        setUserInfo(result.data);
      }
    )();
  }, []);


  /**
   * 회원 정보 수정
   */
  const onModify = async () => {
    // 수정하는 API 연결
    const id = cookie.getCookie('id');
    if (!id) {
      // 로그인 필요
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.',
      });
      return;
    }

    const result = await API.putUser(id, userInfo);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }

    if (result.status === 409) {
      // 수정 실패
      setError({
        isError: true,
        errorMsg: '회원 정보 수정에 실패하였습니다.',
      });
      return;
    }

    if (result.status === 500) {
      // 에러 발생
      setError({
        isError: true,
        errorMsg: '회원 정보 수정 중 에러가 발생하였습니다.',
      });
      return;
    }

    // 수정 성공
    // navigate('/user/mymenu');
    setIsDone(true);
  }
  
  /**
   * 확인 창 종료 함수
  */
 const checkDone = () => {
   setIsDone(false);
   navigate('/user/mymenu');
  }


  /**
   * 에러 처리 함수
   */
  const checkError = () => {
    setError({
      isError: false,
      errorMsg: '',
    });
    navigate(-1);
  }

  return (
    <ProfilePresenter
      userInfo={userInfo}
      setUserInfo={setUserInfo}

      onModify={onModify}

      isCheckEmail={isCheckEmail}
      checkEmail={checkEmail}

      showPhone={showPhone}
      autoHyphenPhoneNumber={autoHyphenPhoneNumber}

      isDone={isDone}
      checkDone={checkDone}

      error={error}
      checkError={checkError}
    />
  )
}

export default ProfileContainer;