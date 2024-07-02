import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import cookie from '../cookie';

// 공통 페이지
import {
  Error,
  Main,
  Search,
  SearchResult,
  Review,
  SignIn,
  CounselorDetail,
  Sitemap,
  ConsultingForJitsi,
  ConsultingV1,
  ConsultingV2,
  AskAdmin,
  Answer,
  Terms,
  Policy,
  CounselorRequest,
  ConsultingList,
  CommonEvent,
  PayBridge,
} from './pages';
// 회원 페이지
import {
  UserProduct,
  UserUpdateReview,
  UserWriteReview,
  UserReview,
  UserProfile,
  UserMyMenu,
  UserDonation,
  UserSignUp,
  UserChargeCoin,
  UserFavorite,
  UserFavorite2,
  UserAsk,
  UserCoinHistory,
  UserLuckyHistory,
  UserInformation,
  UserCenter,
  UserNotice,
  UserNoticeDetail,
  UserToCounselor,
  UserToWrite,
  UserToDetail,
} from './pages';
// 상담사 페이지
import {
  CounselorSignUp,
  CounselorAddProduct,
  CounselorProfile,
  CounselorCoin,
  CounselorMain,
  CounselorConsultingHistory,
  CounselorAskHistory,
  CounselorProductionList,
  CounselorApply,
  CounselorLuckyPouchHistory,
} from './pages';
// 관리자 페이지
import { AdminMain, AdminSignIn, AdminSignUp, AdminRequestCounselor, AdminManageCounselor, AdminManageUser, AdminManagePayment, AdminManageSales, AdminManageCalculate, AdminManageAsk, AdminManageAll } from './pages';
import { RotateLeftOutlined } from '@ant-design/icons';

const Router = () => {
  const navigate = useNavigate();

  const [hasCookies, setHasCookies] = useState(false);

  const setCookies = (data) => {
    // console.log(data);
    cookie.setCookie('id', data.data.id, {
      path: '/',
      // secure: '/',
    });

    cookie.setCookie('token', data.token, {
      path: '/',
      // secure: '/',
    });

    cookie.setCookie('userType', data.data.userType, {
      path: '/',
      // secure: '/',
    });

    cookie.setCookie('ACCESS_TYPE', data.ACCESS_TYPE, {
      path: '/',
      // secure: '/',
    });

    cookie.setCookie('ACCESS_TYPE', data.ACCESS_TYPE, {
      path: '/',
      secure: '/',
    });

    setHasCookies(true);
  };

  const removeCookies = () => {
    cookie.remove('id', { path: '/' }, 1000);
    cookie.remove('token', { path: '/' }, 1000);

    setHasCookies(false);
  };

  return (
    <div className="App">
      {/* <Header hasCookies={hasCookies} removeCookies={removeCookies} /> */}
      <Routes>
        {/* 공통 */}
        <Route
          exact
          path="/"
          element={<Main />}
        />
        <Route
          exact
          path="/*"
          element={<Error />}
        />
        <Route
          exact
          path="/signin"
          element={<SignIn setCookies={setCookies} />}
        />
        <Route
          exact
          path="/counselor/:counselor_id"
          element={<CounselorDetail setCookies={setCookies} />}
        />
        <Route
          exact
          path="/sitemap"
          element={<Sitemap setCookies={setCookies} />}
        />
        <Route
          exact
          path="/review"
          element={<Review setCookies={setCookies} />}
        />
        <Route
          exact
          path="/search"
          element={<Search setCookies={setCookies} />}
        />
        <Route
          exact
          path="/search/result"
          element={<SearchResult setCookies={setCookies} />}
        />
        <Route
          exact
          path='/search/category/result'
          element={<SearchResult setCookies={setCookies} />}
        />
        <Route
          exact
          path='/consultingv1/:counselor_id'
          element={<ConsultingV1 setCookies={setCookies} />}
        />
        <Route
          exact
          path="/consultingv1"
          element={<ConsultingForJitsi setCookies={setCookies} />}
        />
        <Route
          exact
          path='/consultingv2'
          element={<ConsultingV2 setCookies={setCookies} />}
        />
        <Route
          exact
          path='/askadmin/:params'
          element={<AskAdmin />}
        />
        <Route
          exact
          path='/answer/:ask_id'
          element={<Answer />}
        />
        <Route
          exact
          path='/terms'
          element={<Terms />}
        />
        <Route
          exact
          path='/policy'
          element={<Policy />}
        />
        <Route
          exact
          path='/counselor/request'
          element={<CounselorRequest />}
        />
        <Route
          exact
          path='/consulting/list'
          element={<ConsultingList />}
        />
        <Route
          exact
          path='/event'
          element={<CommonEvent />}
        />
        <Route
          exact
          path="/counselor/apply"
          element={<CounselorApply />}
        />
        <Route 
          exact
          path="/paybridge"
          element={<PayBridge />}
        />


        {/* 회원 */}
        <Route
          exact
          path="/user/signup"
          element={<UserSignUp setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/charge/coin"
          element={<UserChargeCoin setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/favorite"
          element={<UserFavorite setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/favorite2"
          element={<UserFavorite2 setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/donation"
          element={<UserDonation setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/mymenu"
          element={<UserMyMenu setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/profile"
          element={<UserProfile setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/review"
          element={<UserReview setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/review/write/:counselor_id"
          element={<UserWriteReview setCookies={setCookies} />}
        />
        <Route
          exact
          path="/user/review/update"
          element={<UserUpdateReview setCookies={setCookies} />}
        />
        <Route exact path="/user/ask/:counselor_id" element={<UserAsk />} />
        <Route
          exact
          path="/user/product"
          element={<UserProduct setCookies={setCookies} />}
        />
        <Route
          exact path='/user/coinHistory'
          element={<UserCoinHistory setCookies={setCookies} />}
        />
        <Route
          exact path='/user/LuckyHistory'
          element={<UserLuckyHistory setCookies={setCookies} />}
        />
        <Route 
          exact path='/user/information'
          element={<UserInformation />}
        />
        <Route
          exact path='/user/servicecenter'
          element={<UserCenter />}
        />
        <Route
          exact path='/user/notice'
          element={<UserNotice />}
        />
        <Route 
          exact path='/user/notice/detail/:counselor_id'
          element={<UserNoticeDetail />}
        />
        <Route 
          exact path='/user/tocounselor'
          element={<UserToCounselor />}
        />
        <Route 
          exact path='/user/towrite'
          element={<UserToWrite />}
        />
        <Route
          exact path='/user/to/detail/:write_id'
          element={<UserToDetail />}
        />


        {/* 상담사 */}
        <Route
          exact
          path="/counselor"
          element={<CounselorMain />}
        />
        <Route
          exact
          path="/counselor/signup"
          element={<CounselorSignUp />}
        />
        <Route
          exact
          path="/counselor/addproduct"
          element={<CounselorAddProduct />}
        />
        <Route
          exact
          path="/counselor/coin"
          element={<CounselorCoin />}
        />
        <Route
          exact
          path="/counselor/profile"
          element={<CounselorProfile />}
        />
        <Route
          exact
          path="/counselor/consultinghistory"
          element={<CounselorConsultingHistory />}
        />
        <Route
          exact
          path="/counselor/ask/history"
          element={<CounselorAskHistory />}
        />
        <Route
          exact
          path="/counselor/productions"
          element={<CounselorProductionList />}
        />
        <Route
          exact
          path="/counselor/luckypouchhistroy"
          element={<CounselorLuckyPouchHistory />}
        />


        {/* 관리자 */}
        <Route
          exact
          path='/admin'
          element={<AdminSignIn setCookies={setCookies} />}
        />
        <Route
          exact
          path='/admin/main'
          element={<AdminMain />}
        />
        <Route
          exact
          path='/admin/request/conuselors'
          element={<AdminRequestCounselor />}
        />
        <Route
          exact
          path='/admin/manage/counselors'
          element={<AdminManageCounselor />}
        />
        <Route
          exact
          path='/admin/manage/users'
          element={<AdminManageUser />}
        />
        <Route
          exact
          path='/admin/manage/payments'
          element={<AdminManagePayment />}
        />
        <Route
          exact
          path='/admin/manage/sales'
          element={<AdminManageSales />}
        />
        <Route
          exact
          path='/admin/manage/calculates'
          element={<AdminManageCalculate />}
        />
        <Route
          exact
          path='/admin/manage/ask'
          element={<AdminManageAsk />}
        />
        <Route
          exact
          path='/admin/manage/all'
          element={<AdminManageAll />}
        />
      </Routes>
    </div>
  );
};

export default Router;
