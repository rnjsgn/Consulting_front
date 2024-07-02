import React, { useEffect, useState } from "react";
import { SignUpPresenter } from "./SignUpPresenter";
import API from "../../../../api/API";
import { useLocation, useNavigate } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";

const SignUpContainer = ({
  setCookies
}) => {
  // 이메일 정규식
  const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const navigate = useNavigate();
  const location = useLocation();

  const [done, setDone] = useState({
    isDone: false,
    doneMsg: '',
  });
  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  });
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [isCorrectPw, setIsCorrectPw] = useState(false);
  const [isCheckPw, setIsCheckPw] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isDoubleCheck, setIsDoubleCheck] = useState(false);
  const [isDoubleCheckEmail, setIsDoubleCheckEmail] = useState(false);
  const [isDoubleCheckPhone, setIsDoubleCheckPhone] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [canSignup, setCanSignup] = useState(false);

  const [userInfo, setUserInfo] = useState({
    social_id: null,
    email: '',
    pw: '',
    pw_check: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (!location.state) return;

    const info = location.state;

    console.log(info)

    setUserInfo(prev => {
      setIsCheckEmail(true);
      return { ...prev, email: info.email, name: info.name, social_id: info.social_id, phone: info.phone }
    });
  }, []);

  useEffect(() => {
    if (userInfo.social_id) {
      setCanSignup(isCheckEmail && isDoubleCheckEmail && isDoubleCheckPhone && userInfo.name.length && isPhone && isAgree);
      return;
    }

    setCanSignup(isCheckEmail && isCorrectPw && isCheckPw && isDoubleCheckEmail && isDoubleCheckPhone && userInfo.name.length && isPhone && isAgree);
  }, [isCheckEmail, isCorrectPw, isCheckPw, isDoubleCheckEmail, isDoubleCheckPhone, userInfo.name, isPhone, isAgree])


  useEffect(() => {
    checkPhone();
  }, [userInfo.phone]);

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

  /**
   * 비밀번호 확인 함수
   */
  const checkPw = () => {
    if (userInfo.pw !== userInfo.pw_check) {
      setIsCheckPw(false);
      return;
    }

    setIsCheckPw(true);
  }

  /**
   * 전화번호 확인 함수
   */
  const checkPhone = () => {
    if (userInfo.phone.length !== 11) {
      setIsPhone(false);
      return;
    }

    setIsPhone(true);
  }


  /**
   * 중복확인 함수
   */
  const doubleCheck = async () => {
    const body = {
      email: userInfo.email,
      phone: userInfo.phone,
    }

    const result = await API.postUserDoublecheck(body);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }

    if (result.status === 409) {
      // 중복확인 실패
      // 실패 알림
      let message = '';
      switch (result.data) {
        case 4091:
          message = '해당 이메일이 존재합니다.';
          break;
        case 4093:
          message = '해당 전화번호가 존재합니다.';
          break;
        default:
          message = '중복확인에 실패하였습니다.';
          break;
      }

      setError({
        isError: true,
        errorMsg: message,
      });
      return;
    }

    if (result.status === 500) {
      // 에러 발생
      setError({
        isError: true,
        errorMsg: '중복확인 중 에러가 발생하였습니다.',
      });
      return;
    }

    // 중복확인 성공
    setIsDoubleCheck(true);
  };

  /**
   * 이메일 중복확인 함수
   */
  const doubleCheckEmail = async () => {
    if (!isCheckEmail) {
      setError({
        isError: true,
        errorMsg: '이메일 형식에 맞게 입력해주시기 바랍니다.',
      });
      return;
    }

    const body = {
      email: userInfo.email,
    }

    const result = await API.postUserDoublecheckEmail(body);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }
    if (result.status === 409) {
      // 중복확인 실패
      // 실패 알림
      setError({
        isError: true,
        errorMsg: '해당 이메일이 존재합니다.',
      });
      return;
    }
    if (result.status === 500) {
      // 에러 발생
      setError({
        isError: true,
        errorMsg: '중복확인 중 에러가 발생하였습니다.',
      });
      return;
    }

    // 중복확인 성공
    setIsDoubleCheckEmail(true);
    setDone({
      isDone: true,
      doneMsg: '사용 가능한 이메일입니다.',
    });
  };

  /**
   * 전화번호 중복확인 함수
   */
  const doubleCheckPhone = async () => {
    if (!isCheckEmail) {
      setError({
        isError: true,
        errorMsg: '올바른 전화번호를 입력해주시기 바랍니다.',
      });
      return;
    }

    const body = {
      phone: userInfo.phone,
    }

    const result = await API.postUserDoublecheckPhone(body);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }
    if (result.status === 409) {
      // 중복확인 실패
      // 실패 알림
      setError({
        isError: true,
        errorMsg: '해당 전화번호가 존재합니다.',
      });
      return;
    }
    if (result.status === 500) {
      // 에러 발생
      setError({
        isError: true,
        errorMsg: '중복확인 중 에러가 발생하였습니다.',
      });
      return;
    }

    // 중복확인 성공
    setIsDoubleCheckPhone(true);
    setDone({
      isDone: true,
      doneMsg: '전화번호 인증이 완료되었습니다.',
    });
  };


  /**
   * 회원가입 함수
   */
  const SignUp = async () => {
    const body = {
      social_id: userInfo.social_id,
      email: userInfo.email,
      pw: userInfo.pw,
      name: userInfo.name,
      phone: userInfo.phone,
    };

    // const result = isUser ? await API.postSignUp(body) : await API.postCounselorSignUp(body);
    const result = userInfo.social_id ? await API.postSocialSignup(body) : await API.postSignup(body);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }

    if (result.status === 500) {
      // 에러 발생
      setError({
        isError: true,
        errorMsg: '회원가입 중 에러가 발생하였습니다.',
      });
      return;
    }

    // 회원가입 성공
    // setIsDone(true);
    setDone({
      isDone: true,
      doneMsg: '회원가입을 축하드립니다!',
    });

    setIsSignup(true);
    // navigate('/signin', { state: { isUser: true } });
  }

  /**
   * 확인 모달 함수
  */
  const checkDone = () => {
    // setIsDone(false);
    setDone({
      isDone: false,
      doneMsg: '',
    });

    if (isSignup) {
      setIsSignup(false);
      navigate('/signin');
    }
  }

  /**
   * 에러 처리 함수
   */
  const checkError = () => {
    setError({
      isError: false,
      errorMsg: '',
    });
  }

  return (
    <SignUpPresenter
      isCheckEmail={isCheckEmail}
      isCheckPw={isCheckPw}

      canSignup={canSignup}

      userInfo={userInfo}
      setUserInfo={setUserInfo}
      setIsCorrectPw={setIsCorrectPw}

      checkEmail={checkEmail}
      checkPw={checkPw}
      checkPhone={checkPhone}

      doubleCheck={doubleCheck}
      doubleCheckEmail={doubleCheckEmail}
      doubleCheckPhone={doubleCheckPhone}

      SignUp={SignUp}

      done={done}
      setDone={setDone}
      checkDone={checkDone}

      error={error}
      checkError={checkError}

      setIsAgree={setIsAgree}
    />
  )
}

export default SignUpContainer;