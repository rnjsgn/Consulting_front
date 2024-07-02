import React, { useEffect, useState } from "react";
import { AddProductPresenter } from "./AddProductPresenter";
import API from "../../../../api/API";
import { useNavigate } from "react-router-dom";
import cookie from '../../../../cookie';

const AddProductContainer = ({
  setCookies
}) => {
  const navigate = useNavigate();

  const [done, setDone] = useState({
    isDone: false,
    doneMsg: '',
  })
  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  });

  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    explain: '',
  });

  const [haveProduct, setHaveProduct] = useState(false);

  useEffect(() => {
    (
      async () => {
        const userType = cookie.getCookie('userType');
        if (!userType && userType !== '상담사') {
          setError({
            isError: true,
            errorMsg: '상담사 로그인이 필요합니다.',
          });
        }
        const id = cookie.getCookie('id');

        const result = await API.getCounselorProduct(id);
        if (result.code === 500) {
          setError({
            isError: true,
            errorMsg: '서버 연결이 원할하지 않습니다.',
          });
          return;
        }
        if (result.status === 500) {
          setError({
            isError: true,
            errorMsg: '상품 조외 중 오류가 발샘했습니다.',
          });
          return;
        }

        setHaveProduct(result.data.length);
        if (result.data.length) {
          setError({
            isError: true,
            errorMsg: '이미 상품이 존재합니다.',
          });
          return;
        }
      }
    )();
  }, []);

  const addProduct = async () => {
    if (haveProduct) {
      setError({
        isError: true,
        errorMsg: '이미 상품이 존재합니다.',
      });
    }

    // 상품 등록
    const counselor_id = cookie.getCookie('id');
    if (!counselor_id) {
      // 로그인 필요
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.',
      });
      return;
    }

    const result = await API.postProduct(counselor_id, productInfo);
    if (result.code === 500) {
      // 서버 연결 안됨
      setError({
        isError: true,
        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
      });
      return;
    }

    if (result.status === 500) {
      // 오류 발생
      setError({
        isError: true,
        errorMsg: '상품 등록 중 에러가 발생하였습니다.',
      });
      return;
    }

    // FIXME: 경로 수정 요망
    setDone({
      isDone: true,
      doneMsg: '상품을 등록하였습니다!',
    });
    // navigate('/');
  }


  /**
   * 작업 완료 함수
   */
  const checkDone = () => {
    setDone({
      isDone: false,
      doneMsg: '',
    });

    navigate(-1);
  }

  /**
   * 에러 처리 함수
   */
  const checkError = () => {
    setError({
      isError: false,
      errorMsg: '',
    });

    if (haveProduct) {
      navigate(-1);
    }
  }

  return (
    <AddProductPresenter
      productInfo={productInfo}
      setProductInfo={setProductInfo}

      addProduct={addProduct}

      done={done}
      checkDone={checkDone}

      error={error}
      checkError={checkError}
    />
  )
}

export default AddProductContainer;