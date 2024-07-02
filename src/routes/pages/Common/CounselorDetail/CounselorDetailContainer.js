import React, { useEffect, useState } from "react";
import { CounselorDetailPresenter } from "./CounselorDetailPresenter";
import API from "../../../../api/API";
import cookie from "../../../../cookie";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const CounselorDetailContainer = ({
  setCookies
}) => {
  const navigate = useNavigate();
  const { counselor_id } = useParams();
  const location = useLocation();

  const [isOpenPresent, setIsOpenPresent] = useState(false);

  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  });

  /**
   * 등록
   */
  const [enroll, setEnroll] = useState({
    isEnroll: false,
    enrollMsg: ''
  })

  const [done, setDone] = useState({
    isDone: false,
    doneMsg: '',
  });

  // 상품 정보
  // const [production_price, setProduction_price] = useState(0);
  // const [productionInfo, setProductionInfo] = useState({});

  const [productionInfos, setproductionInfos] = useState([{
    price: 0,
  }]);

  // 상담사
  const [counselor, setCounselor] = useState({
    nickname: '불러오는 중..',
    lucky_pouch: 0,
  });

  // 후기
  const [reviews, setReviews] = useState([{
    count: -1,
    total_score: 0,
  }]);

  // 서비스공지
  const [notice, setNotice] = useState([]);

  // 서비스소개
  const [introduce, setIntroduce] = useState('');

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  /**
     * 모달 아이템
     */
  const [modalItems, setModalItems] = useState([
    {
      text: '',
      value: '',
    },
  ]);

  /* 후원 Drawer */
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  /* 후기 관련 state */
  const [isShowReviews, setIsShowReviews] = useState(false);

  const [favoriteInfo, setFavoriteInfo] = useState(null);
  const [counselorFavoriteList, setCounselorFavoriteList] = useState([]);

  const [userType, setUserType] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isClick, setIsClick] = useState(false);


  useEffect(() => {
    (
      async () => {
        // if (location.state) {
        //   setProductionInfo(location.state.productionInfo);
        //   setProduction_price(location.state.production_price);
        // }

        const user = cookie.getCookie('userType');
        setUserType(user);

        if (user) {
          const id = cookie.getCookie('id');
          const info = user === '고객' ? await API.getUser(id) : await API.getCounselor(id);

          if (info.status === 200) setUserInfo(info.data);
        }

        /**
         * 상담사 단일 정보 조회
         */
        const counselorData = await API.getCounselor(counselor_id);
        if (counselorData.code === 500) {
          // 서버 연결 안됨
          setError({
            isError: true,
            errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
          });
          return;
        }

        if (counselorData.status === 404) {
          // 상담사 정보 조회 실패
          setError({
            isError: true,
            errorMsg: '상담사 정보 조회에 실패하였습니다.',
          });
          return;
        }

        if (counselorData.status === 500) {
          // 에러 발생
          setError({
            isError: true,
            errorMsg: '상담사 정보 조회 중 에러가 발생하였습니다.',
          });
          return;
        }

        setCounselor(counselorData.data);

        if (counselorData.data.status === '탈퇴') {
          setError({
            isError: true,
            errorMsg: '존재하지 않는 상담사입니다.',
          });
          return;
        }

        // 상품 정보 가져오기
        // const productionData = await API.getCounselorProduct(counselor_id);
        // if (productionData.code === 500) {
        //   // 서버 연결 안됨
        //   setError({
        //     isError: true,
        //     errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
        //   });
        //   return;
        // }

        // if (productionData.status === 404) {
        //   // 상품 정보 조회 실패
        //   setError({
        //     isError: true,
        //     errorMsg: '상품 정보 조회에 실패하였습니다.',
        //   });
        //   return;
        // }

        // if (productionData.status === 500) {
        //   // 에러 발생
        //   setError({
        //     isError: true,
        //     errorMsg: '상품 정보 조회 중 에러가 발생하였습니다.',
        //   });
        //   return;
        // }
        // console.log(productionData.data)
        // setproductionInfos(productionData.data);


        // setModalItems([
        //   {
        //     text: '예명',
        //     value: counselorData.data.nickname,
        //   },
        //   {
        //     text: '가격',
        //     value: productionData.data[0]?.price,
        //     // value: production_price,
        //   },
        // ]);

        /**
         * 상담사 단일 후기
         */
        const reviewsData = await API.getReview(counselor_id);
        if (reviewsData.code === 500) {
          // 서버 연결 안됨
          setError({
            isError: true,
            errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
          });
          return;
        }

        if (reviewsData.status === 409) {
          // 후기 조회 실패
          setError({
            isError: true,
            errorMsg: '상담사 후기 조회에 실패하였습니다.',
          });
          return;
        }

        if (reviewsData.status === 500) {
          // 에러 발생
          setError({
            isError: true,
            errorMsg: '상담사 후기 조회 중 에러가 발생하였습니다.',
          });
          return;
        }

        setReviews(reviewsData.data);

        if (!user || user !== '고객') {
          // 로그인 하지 않은 경우 구독 조회는 불가능
          return;
        }

        /**
         * 구독 정보 가져오기
         */
        /**
         * 해당 상담사의 구독 정보
         */
        const counselorFavoriteData = await API.getCounselorFavoriteAll(counselor_id);
        if (counselorFavoriteData.code === 500) {
          // 서버 연결 안됨
          setError({
            isError: true,
            errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
          });
          return;
        }
        if (counselorFavoriteData.status === 500) {
          // 에러 발생
          setError({
            isError: true,
            errorMsg: '상담사 전체 구독 조회 중 에러가 발생하였습니다.',
          });
          return;
        }
        setCounselorFavoriteList(counselorFavoriteData.data);

        /**
         * 해당 유저와 상담사 간의 구독 정보
         */
        console.log(user)
        if (user !== '고객') return;

        const favoriteData = await API.getCounselorFavorite(counselor_id);
        if (favoriteData.code === 500) {
          // 서버 연결 안됨
          setError({
            isError: true,
            errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
          });
          return;
        }

        if (favoriteData.status === 500) {
          // 에러 발생
          setError({
            isError: true,
            errorMsg: '상담사 구독 조회 중 에러가 발생하였습니다.',
          });
          return;
        }

        setFavoriteInfo(favoriteData.data);
      }
    )();
  }, [isClick])

  const clickEvent = () => {
    setIsClick(prev => { return !isClick });
  }

  const goBack = () => {
    navigate(-1);
  }

  const goToAsk = () => {
    if (!userType) {
      // 로그인 필요
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.'
      });
      return;
    }

    if (userType === '상담사') {
      // 상담사 문의는 고객만 가능
      setError({
        isError: true,
        errorMsg: '상담사 문의는 고객만 이용할 수 있습니다.'
      });
      return;
    }

    navigate(`/user/ask/${counselor.id}`);
  }

  /**
   * 상담 연결 (V1)
   */
  const connectConsultingV1 = (counselor_id) => {
    __closeModal();

    // Consulting V1 이동
    navigate('/consultingv1');
  }

  /**
   * 상담 연결 (V2)
   */
  const connectConsultingV2 = (counselor_id) => {
    __closeModal();

    // Consulting V2 이동
    navigate('/consultingv2');
  }


  /* ======================= */
  /*          모달           */
  /* ======================= */
  // 모달 닫기
  const __closeModal = () => {
    setIsModalOpen(false);
  }

  /**
    * 모달 버튼
  */
  const modalButtons = [
    {
      text: '상담 V1 연결',
      onClick: connectConsultingV1,
    },
    {
      text: '상담 V2 연결',
      onClick: connectConsultingV2,
    },
  ];

  /**
   * 모달 오픈
   */
  const modalOpen = () => {
    if (!userType) {
      // 로그인 필요
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.'
      });
      return;
    }

    setIsModalOpen(true);
  }

  /**
   * 모달 확인 버튼 
  */
  const handleOk = () => {
    __closeModal();
  }

  /**
   * 모달 취소 버튼 
  */
  const handleCancel = () => {
    __closeModal();
  }

  /**
   * 후원 Drawer 관련 함수
   */
  const openDonationDrawer = () => {
    if (!userType) {
      // 로그인 필요
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.'
      });
      return;
    }

    setIsDonationOpen(true);
  }

  const closeDonationDrawer = () => {
    setIsDonationOpen(false);
  }

  /**
   * 후기 관련 함수
   */
  const toggleShowReviews = () => {
    setIsShowReviews(!isShowReviews);
  }

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
   * 확인 창 종료 함수
  */
  const checkDone = () => {
    setDone({
      isDone: false,
      doneMsg: '',
    })
    // closeDonationDrawer();
    setIsClick(prev => !prev);
  }

  /**
   * 에러 처리 함수
   */
  const checkError = () => {
    setError({
      isError: false,
      errorMsg: '',
    });

    if (counselor.status === '탈퇴') {
      navigate(-1);
    }
  }
  
  /**
     * 등록 함수
     */
  const checkEnroll = () => {
    setEnroll({
      isEnroll: false,
      enrollMsg: ''
    });

    // navigate("/user/product")
    setIsOpenPresent(false);
  }

  return (
    <CounselorDetailPresenter
      userInfo={userInfo}
      userType={userType}

      counselor={counselor}
      counselor_id={counselor_id}
      reviews={reviews}

      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      
      modalOpen={modalOpen}
      handleCancel={handleCancel}
      modalItems={modalItems}
      modalButtons={modalButtons}

      isDonationOpen={isDonationOpen}
      openDonationDrawer={openDonationDrawer}
      closeDonationDrawer={closeDonationDrawer}

      done={done}
      setDone={setDone}
      checkDone={checkDone}

      error={error}
      setError={setError}
      checkError={checkError}

      enroll={enroll}
      setEnroll={setEnroll}
      checkEnroll={checkEnroll}

      isOpenPresent={isOpenPresent}
      setIsOpenPresent={setIsOpenPresent}

      // productionInfo={productionInfo}
      productionInfos={productionInfos}

      isShowReviews={isShowReviews}
      toggleShowReviews={toggleShowReviews}

      counselorFavoriteList={counselorFavoriteList}
      favoriteInfo={favoriteInfo}
      addFavorite={addFavorite}
      deleteFavorite={deleteFavorite}

      isClick={isClick}
      // setIsClick={setIsClick}
      clickEvent={clickEvent}

      goToAsk={goToAsk}
      goBack={goBack}
    />
  )
}

export default CounselorDetailContainer;