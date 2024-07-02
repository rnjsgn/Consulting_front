import React, { useEffect, useState } from "react";
import { MainPresenter } from "./MainPresenter";
import API from "../../../../api/API";
import { useNavigate } from "react-router-dom";
import cookie from "../../../../cookie";

const MainContainer = ({
  setCookies
}) => {
  const navigate = useNavigate();

  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  });

  const [counselors, setCounselors] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [isSignIn, setIsSignIn] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isUser, setIsUser] = useState(false);


  useEffect(() => {
    (
      async () => {
        // 로그인 여부 판단
        const userData = cookie.getCookie('id');
        setIsSignIn(userData);

        const userType = cookie.getCookie('userType');
        setIsUser(userType === '고객');

        // 상품 전체 조회
        const result = await API.getCounselors();
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
            errorMsg: '상품 전체 조회 중 에러가 발생하였습니다.',
          });
          return;
        }

        setCounselors(result.data);

        /**
         * 상담사일 경우 즐겨찾기 조회 막기
         */
        if (userType === '상담사') {
          // console.log('상담사')
          return;
        }

        // 즐겨찾기 조회
        const favoriteResult = await API.getFavorite(userData);
        if (favoriteResult.code === 500) {
          // 서버 연결 안됨
          setError({
            isError: true,
            errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
          });
          return;
        }

        if (favoriteResult.status === 409) {
          // 즐겨찾기 정보 가져오기 실패
          setError({
            isError: true,
            errorMsg: '즐겨찾기 정보 조회에 실패하였습니다.',
          });
          return;
        }

        if (favoriteResult.status === 500) {
          // 에러 발생
          setError({
            isError: true,
            errorMsg: '즐겨찾기 정보 조회 중 에러가 발생하였습니다.',
          });
          return;
        }

        setFavorites(favoriteResult.data);
      }
    )();
  }, [isClick]);

  /**
   * 즐겨찾기 추가
   */
  const addFavorite = async (counselor_id) => {
    const id = cookie.getCookie('id');
    if (!id) {
      // 로그인 필요
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.',
      });
      return;
    }

    const body = {
      user_id: id,
      counselor_id: counselor_id,
    };

    // 즐겨찾기
    const result = await API.postFavorite(body);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }

    if (result.status === 401) {
      // 즐겨찾기 추가 이슈
      setError({
        isError: true,
        errorMsg: '즐겨찾기 추가에 실패하였습니다.'
      });
      return;
    }

    if (result.status === 500) {
      // 에러 발생
      setError({
        isError: true,
        errorMsg: '즐겨찾기 중 에러가 발생하였습니다.',
      });
      return;
    }

    setIsClick(!isClick);
  }

  /**
   * 즐겨찾기 취소
   */
  const deleteFavorite = async (counselor_id, favorite_id) => {
    console.log('call deleteFavorite');
    const user_id = cookie.getCookie('id');
    if (!user_id) {
      // 로그인 필요
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.'
      });
      return;
    }

    const body = {
      user_id,
      counselor_id
    };

    const result = await API.deleteFavorite(body);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }

    if (result.status === 401) {
      // 즐겨찾기 취소 실패
      setError({
        isError: true,
        errorMsg: '즐겨찾기 취소를 실패히였습니다.',
      });
      return;
    }

    if (result.status === 500) {
      // 에러 발생
      setError({
        isError: true,
        errorMsg: '즐겨찾기 취소 중 에러가 발생하였습니다.',
      });
      return;
    }

    setIsClick(!isClick);
  }


  /**
   * 상담사 상세 페이지로 이동
   * @params counselor_id => 상담사 아이디
   * @params product_id => 상품 아이디
   */
  const moveCounselorDetail = (counselor_id, production_price, productionInfo) => {
    navigate(`/counselor/${counselor_id}`, { state: { production_price, productionInfo: productionInfo } });
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
    <MainPresenter
      isSignIn={isSignIn}

      counselors={counselors}
      moveCounselorDetail={moveCounselorDetail}

      favorites={favorites}
      addFavorite={addFavorite}
      deleteFavorite={deleteFavorite}

      error={error}
      setError={setError}
      checkError={checkError}

      isUser={isUser}
    />
  )
}

export default MainContainer;