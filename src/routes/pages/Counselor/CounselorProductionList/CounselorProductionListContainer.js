import React, { useEffect, useState } from "react";
import { CounselorProductionListPresenter } from "./CounselorProductionListPresenter";
import API from "../../../../api/API";
import { useNavigate } from "react-router-dom";
import cookie from "../../../../cookie";

const CounselorProductionListContainer = ({
  setCookies
}) => {
  const navigate = useNavigate();

  const [done, setDone] = useState({
    isDone: false,
    doneMsg: '',
  });
  const [error, setError] = useState({
    isError: false,
    errorMsg: ''
  });

  const [isClick, setIsClick] = useState(false);

  const [productions, setProductions] = useState([]);

  useEffect(() => {
    (
      async () => {
        const id = cookie.getCookie('id');
        if (!id) {
          setError({
            isError: true,
            errorMsg: '로그인이 필요합니다.',
          });
          return;
        }

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
            errorMsg: '상품 목록 조회 중 오류가 발생했습니다.',
          });
          return;
        }

        setProductions(result.data);
      }
    )();
  }, [isClick]);

  /**
   * 상품 삭제
   */
  const removeProduction = async (production_id) => {
    console.log(production_id)
    const id = cookie.getCookie('id');
    if (!id) {
      setError({
        isError: true,
        errorMsg: '로그인이 필요합니다.',
      });
      return;
    }

    const body = {
      product_id: production_id
    }

    const result = await API.deleteProduction(id, body);
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
        errorMsg: '상품 삭제에 실패했습니다.',
      });
      return;
    }
    if (result.status === 500) {
      setError({
        isError: true,
        errorMsg: '상품 삭제 중 오류가 발생했습니다.',
      });
      return;
    }

    setDone({
      isDone: true,
      doneMsg: '상품을 삭제했습니다.',
    });

    setIsClick(prev => !prev);
  }


  /**
   * 작업 완료 함수
  */
  const checkDone = () => {
    setDone({
      isDone: false,
      doneMsg: '',
    });
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
    <CounselorProductionListPresenter
      productions={productions}
      removeProduction={removeProduction}

      done={done}
      checkDone={checkDone}

      error={error}
      checkError={checkError}
    />
  )
}

export default CounselorProductionListContainer;