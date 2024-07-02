import React, { useEffect, useState } from "react";
import { SignUpPresenter } from "./SignUpPresenter";
import API from "../../../../api/API";
import { useNavigate } from "react-router-dom";

const SignUpContainer = ({
  setCookies
}) => {
  // 이메일 정규식
  const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const navigate = useNavigate();

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
    email: '',
    pw: '',
    pw_check: '',
    name: '',
    nickname: '',
    phone: '',
    category: '타로',
    profile_img: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [returnUrl, setReturnUrl] = useState([]);

  /* 이미지 관련 state */
  const [prevImageSrc, setPrevImageSrc] = useState(null);


  useEffect(() => {
    setCanSignup(isCheckEmail && isCorrectPw && isDoubleCheckEmail && isDoubleCheckPhone && userInfo.name.length && userInfo.nickname.length && isPhone && isAgree);
  }, [isCheckEmail, isCorrectPw, isDoubleCheckEmail, isDoubleCheckPhone, userInfo.name, userInfo.nickname, isPhone, isAgree])

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
   * 중복확인 함수
   */
  const doubleCheck = async () => {
    const body = {
      email: userInfo.email,
      phone: userInfo.phone,
      nickname: userInfo.nickname
    }

    const result = await API.postCounselorDoublecheck(body);
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
        case 4092:
          message = '해당 전화번호가 존재합니다.';
          break;
        case 4093:
          message = '해당 예명이 존재합니다.';
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

    const result = await API.postCounselorDoublecheckEmail(body);
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

    const result = await API.postCounselorDoublecheckPhone(body);
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
   * 회원가입 함수
   */
  const SignUp = async () => {
    console.log(imageFile)
    const formData = new FormData();
    for (const file in imageFile) {
      formData.append('image', imageFile[file]);
    }

    for (const url in returnUrl) {
      formData.append('imageUrl', returnUrl[url]);
    }

    formData.append('title', userInfo.title);
    formData.append('email', userInfo.email);
    formData.append('pw', userInfo.pw);
    formData.append('name', userInfo.name);
    formData.append('nickname', userInfo.nickname);
    formData.append('local', userInfo.local);
    formData.append('introduce', userInfo.introduce);
    formData.append('phone', userInfo.phone);

    // const body = {
    //   email: userInfo.email,
    //   pw: userInfo.pw,
    //   name: userInfo.name,
    //   nickname: userInfo.nickname,
    //   phone: userInfo.phone,
    //   profile_img: formData,
    // };

    // const result = isUser ? await API.postSignUp(body) : await API.postCounselorSignUp(body);
    const result = await API.multipartCounselorSignup(formData);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }

    if (result.status === 409) {
      // 회원가입 실패
      // 실패 알림
      let message = '';

      switch (result.data) {
        case 4091:
          message = '해당 이메일이 존재합니다.';
          break;
        case 4092:
          message = '해당 전화번호가 존재합니다.';
          break;
        case 4093:
          message = '해당 예명이 존재합니다.';
          break;
        default:
          message = '회원가입에 실패하였습니다.';
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
        errorMsg: '회원가입 중 에러가 발생하였습니다.',
      });
      return;
    }


    setDone({
      isDone: true,
      doneMsg: '상담사 요청이 완료되었습니다.',
    });
    setIsSignup(true);
    // navigate('/signin', { state: { isCounselor: true } });
  }


  /**
   * 프로필 사진 미리보기
   */
  const previewImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = (e) => {
      setPrevImageSrc(e.target.result);
    }
  }

  /**
   * 이미지 등록 함수
   */
  const onChangeImage = async (e) => {
    const images = e.target.files;
    if (images.length === 0) {
      return;
    }
    setImageFile(images);
    previewImage(images[0]);

    const formData = new FormData();
    for (const file in images) {
      formData.append('image', images[file]);
    }

    const upload_result = await API.multipartRequestImage(formData);
    if (upload_result.code === 500) {
      setError({
        isError: true,
        errorMsg: '서버 연결이 원할하지 않습니다.'
      });
    }
    if (upload_result.status === 401) {
      setError({
        isError: true,
        errorMsg: '이미지 업로드를 실패하였습니다.'
      });
    }
    if (upload_result.status === 500) {
      setError({
        isError: true,
        errorMsg: '이미지 업로드 중 오류가 발생하였습니다.'
      });
    }

    upload_result.data.forEach(urlData => {
      const url = urlData.replace('[[', '').replace(']]', '');
      setReturnUrl(prev => [...prev, url]);
    });
  }


  /**
   * 작업 완료 함수
  */
  const checkDone = () => {
    setDone({
      isDone: false,
      doneMsg: '',
    });

    if (isSignup) {
      setIsSignup(false);
      navigate('/signin', { state: { isCounselor: true } });
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

      onChangeImage={onChangeImage}
      prevImageSrc={prevImageSrc}

      done={done}
      checkDone={checkDone}

      error={error}
      checkError={checkError}

      setIsAgree={setIsAgree}
    />
  )
}

export default SignUpContainer;