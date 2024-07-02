import ApiManager from './ApiManager';
const $http = new ApiManager();

const parameterToPath = (path, params = {}) => {
  const keys = Object.keys(params);
  let newStr = path;
  for (let key of keys) {
    newStr = newStr.replace(`:${key}`, params[key]);
  }
  return newStr;
};

const API = {
  /**
   * ========================
   *        상  담  사
   * ========================
   */
  /**
   * 상담사 정보 조회
   * --
   */
  getCounselors: () => $http.get('/counselor'),

  /**
   * 선택 상담사 정보 조회
   * --
   */
  getCounselor: (counselor_id) => $http.get(parameterToPath('/counselor/:counselor_id', { counselor_id })),

  /**
   * 상담사 등록하기
   * --
   */
  postCounselorSignup: (body) => $http.post('/counselor/signup', body),
  multipartCounselorSignup: (body) => $http.multipart('/counselor/signup', body),

  /**
   * 상담사 로그인
   * --
   */
  postCounselorSignin: (body) => $http.post('/counselor/signin', body),

  /**
   * 상담사 프로필 수정
   * --
   * (일단 개인공지만)
   */
  putCounselorProfile: (counselor_id, body) => $http.put(parameterToPath('/counselor/:counselor_id', { counselor_id }), body),

  /**
   * 상담사 프로필 수정 => 이미지 포함
   * --
   */
  multipartCounselorProfile: (counselor_id, body) => $http.multipart(parameterToPath('/counselor/update/:counselor_id', { counselor_id }), body),

  /**
   * 상담사 프로필 수정 => 이미지 포함
   * --
   */
  multipartCounselorProductImage: (counselor_id, body) => $http.multipart(parameterToPath('/counselor/update/product_image/:counselor_id', { counselor_id }), body),

  /**
   * 상담사 회원가입 중복확인
   * --
   */
  postCounselorDoublecheck: (body) => $http.post('/counselor/doublecheck', body),

  /**
   * 상담사 회원가입 중복확인
   * --
   */
  postCounselorDoublecheckEmail: (body) => $http.post('/counselor/doublecheck/email', body),

  /**
   * 상담사 회원가입 중복확인
   * --
   */
  postCounselorDoublecheckPhone: (body) => $http.post('/counselor/doublecheck/phone', body),

  /**
   * 상품 등록하기
   * --
   */
  postProduct: (counselor_id, body) => $http.post(parameterToPath('/counselor/production/add/:counselor_id', { counselor_id }), body),

  /**
   * 이미지 등록하기
   */
  postImage: (body) => $http.post('/counselor/addtemp', body),

  /**
   * 상담사 신청
   * --
   */
  multipartCounselorRequest: (body) => $http.multipart('/counselor/request', body),

  /**
   * 상품 조회
   * --
   */
  getProduction: (production_id) => $http.get(parameterToPath('/counselor/get/production/:production_id', { production_id })),

  /**
   * 상담사 별 상품 조회
   * --
   */
  getCounselorProduct: (counselor_id) => $http.get(parameterToPath('/counselor/production/:counselor_id', { counselor_id })),

  /**
   * 상담사 별 상품 전체 조회
   * --
   */
  getCounselorProducts: () => $http.get('/counselor/all/product'),

  /**
   * 상담사 별 상품 전체 조회
   * --
   */
  getCategoryAllCounselors: (category) => $http.get(parameterToPath('/counselor/all/:category', { category })),

  /**
   * 상담사 별 상품 전체 조회
   * --
   */
  getCategoryCounselorProducts: (category) => $http.get(parameterToPath('/counselor/all/product/:category', { category })),

  /**
   * 상품 삭제
   * --
   */
  deleteProduction: (counselor_id, body) => $http.delete(parameterToPath('/counselor/production/:counselor_id', { counselor_id }), body),

  /**
   * 상담사 일정 등록
   * --
   */
  postSchedule: (body) => $http.post(parameterToPath('/counselor/add/schedule'), body),

  /**
   * 상담사 일정 조회
   * --
   */
  getSchedule: (day) => $http.get(parameterToPath('/counselor/schedule/:day', { day })),

  /**
   * 상담사 일정 등록 => 근무, 휴무 (일정 정보 수정)
   * --
   */
  postScheduleWork: (body) => $http.post('/counselor/add/schedule/work', body),

  /**
   * 상담사 일정 등록 => 대기, 부재 (상담사 정보 수정)
   * --
   */
  postScheduleStatus: (body) => $http.post('/counselor/add/schedule/status', body),

  /**
   * 상담사 이미지 등록
   * --
   */
  multipartRequestImage: (body) => $http.multipart('/counselor/addtemp', body),

  /**
   * 상담사 프로필 등록
   * --
   */
  multipartRequestAddProfile: (body) => $http.multipart('/counselor/addprofile', body),

  /**
   * 상담사 삭제
   * --
   */
  deleteCounselor: (counselor_id) => $http.delete(parameterToPath('/admin/counselor/:counselor_id', { counselor_id })),

  /**
   * 상담사 삭제
   * --
   */
  putDeleteCounselor: (counselor_id) => $http.put(parameterToPath('/admin/counselor/delete/:counselor_id', { counselor_id })),



  /**
   * ========================
   *          회  원
   * ========================
   */
  /**
   * 회원가입
   * --
   */
  postSignup: (body) => $http.post('/user/signup', body),

  /**
   * 소셜 회원가입
   * --
   */
  postSocialSignup: (body) => $http.post('/user/social/signup', body),

  /**
   * 회원 로그인
   * --
   */
  postSignin: (body) => $http.post('/user/signin', body),

  /**
   * 회원 소셜 로그인
   * --
   */
  postSocialSignin: (body) => $http.post('/user/social/signin', body),

  /**
   * 회원 소셜 로그인
   * --
   */
  postOauthKakao: (body) => $http.post('/user/oauth/kakao', body),

  /**
   * 회원 정보 수정
   */
  putUser: (user_id, body) => $http.put(parameterToPath('/user/:user_id', { user_id }), body),

  /**
   * 회원 회원가입 유무 확인
   * --
   */
  getUserCheckSignUp: (user_email) => $http.get(parameterToPath('/user/check/signup/:user_email', { user_email })),

  /**
   * 사용자 정보 조회
   * --
   */
  getUser: (user_id) => $http.get(parameterToPath('/user/:user_id', { user_id })),

  /**
   * 전제 사용자 정보 조회
   * --
   */
  getUsers: () => $http.get('/user'),

  /**
   * 프로필 수정
   * --
   */
  putProfile: (user_id, body) => $http.put(parameterToPath('/user/:user_id', { user_id }), body),

  /**
   * 고객 회원가입 중복확인
   * --
   */
  postUserDoublecheck: (body) => $http.post('/user/doublecheck', body),

  /**
   * 고객 회원가입 이메일 중복확인
   * --
   */
  postUserDoublecheckEmail: (body) => $http.post('/user/doublecheck/email', body),

  /**
   * 고객 회원가입 전화번호 중복확인(인증번호)
   * --
   */
  postUserDoublecheckPhone: (body) => $http.post('/user/doublecheck/phone', body),

  /**
   * 고객 삭제
   */
  deleteUser: (user_id) => $http.delete(parameterToPath('/admin/user/:user_id', { user_id })),

  /** 
  * 고객 결제 내역 조회
  */
  getCashHistory: (user_id) => $http.get(parameterToPath('/user/cash_history/:user_id', {user_id})),

  /** 
  * to counselor 글 등록(POST) 
  */
  postToCounselor: (body) => $http.post('/to/write', body),

  /** 
   * to 상담사 글 조회(Get)
  */
  getToCounselor: () => $http.get('/to/counselor'),

  /** 
   * to 상담사 글 단일 조회 (GET)
  */
  getToCounselorOne: (write_id) => $http.get(parameterToPath('/to/counselor/:write_id', {write_id})),



  /**
   * ========================
   *          캐  쉬
   * ========================
   */

  postPay: (body) => $http.post('/payments/req_toss_accept', body),

  /**
   * 포트원
   */
  postPortOne: (body) => $http.post('/payments/req_portone_accept', body),

  /** 
   * 나이스
   */
  postNice: (body) => $http.post('/payments/nicepay_accept', body),



  /**
   * ========================
   *          코  인
   * ========================
   */
  /**
   * 선물하기
   * --
   */
  postDonation: (body) => $http.post('/coin/buyproduct', body),

  /**
   * 결제 내역
   * --
   */
  getPricedetail: (user_id) => $http.get(parameterToPath('/coin', { user_id })),

  /**
   * 결제 내역 전체 조회
   */
  getCoinHistorys: () => $http.get('/coin'),

  /**
   * 상품 구매하기
   * --
   */
  postBuyProduct: (body) => $http.post('/coin/buyproduct', body),

  /**
   * 상품 구매 내역 조회
   * --
   */
  getUserCoinHistory: () => $http.get(parameterToPath('/coin/user/all')),

  /**
   * 메소드별 구매 내역 조회
   * 
   */
  getUserMethodHistoy: (method) => $http.get(parameterToPath('/coin/user/:method', { method })),

  /**
   * 상품 구매 내역 조회(상담사)
   * --
   */
  getCounselorCoinHistory: () => $http.get(parameterToPath('/coin/counselor/all')),



  /**
   * ========================
   *      복  주  머  니
   * ========================
   */
  /**
   * 복머니 선물하기
   * --
   */
  postPresentLuckyPouch: (counselor_id, body) => $http.post(parameterToPath('/lucky_pouch/present/:counselor_id', { counselor_id }), body),





  /**
   * ========================
   *          문  의
   * ========================
   */
  /**
   * 상담 문의
   * --
   * 경로 수정 필요
   */
  postQuestion: (body) => $http.post('/ask', body),

  /**
   * 상담사 문의
   * --
   */
  postQuestionToCounselor: (counselor_id, body) => $http.post(parameterToPath('/ask/add/:counselor_id', { counselor_id }), body),

  /**
   * 관리자에게 문의하기
   * --
   */
  postAskAdmin: (body) => $http.post('/ask/addadmin', body),

  /**
   * 문의 전체 조회
   * --
   */
  getAsks: () => $http.get('/ask'),

  /**
   * 고객별 문의 조회
   * --
   */
  getAskForUser: (user_id) => $http.get(parameterToPath('/ask/user/:user_id', { user_id })),

  /**
   * 상담사별 문의 조회
   * --
   */
  getAskForCounselor: (counselor_id) => $http.get(parameterToPath('/ask/counselor/:counselor_id', { counselor_id })),

  /**
   * 상담사별 상세페이지 문의 조회
   * --
   */
  getAskListForCounselor: (counselor_id) => $http.get(parameterToPath('/ask/detail/:counselor_id', { counselor_id })),

  /**
   * 문의사항 수정
   * --
   */
  putAsks: (ask_id, body) => $http.put(parameterToPath('/ask/:ask_id', { ask_id }), body),

  /**
   * 문의사항 삭제
   * --
   */
  deleteAsk: (ask_id) => $http.delete(parameterToPath('/ask/:ask_id', { ask_id })),

  /**
   * 고객 관리자 문의 조회
   * --
   */
  getUserForAdmin: (user_id) => $http.get(parameterToPath('/ask/user/admin/:user_id', { user_id })),

  /**
   * 고객 선택 상담사 문의 조회
   * --
   */
  getUserForCounselor: (counselor_id) => $http.get(parameterToPath('/ask/write/user/counselor/:counselor_id', { counselor_id })),

  /**
   * 상담사 답변 등록
   * --
   */
  postAnswerCounselor: (body) => $http.post(parameterToPath('/ask/answercounselor'), body),



  /**
   * ========================
   *          검  색
   * ========================
   */
  /**
   * 검색
   * --
   */
  getSearch: (searchword) => $http.get(parameterToPath('/search/:searchword', { searchword })),

  /**
   * 태그 검색
   */
  getTagSearch: (searchWord) => $http.get(parameterToPath('/search/tag/:searchWord', { searchWord })),

  /**
   * 상담사 카테고리 별 전체 조회
   * --
   */
  getCategoryCounselors: (category) => $http.get(parameterToPath('/search/category/:category', { category })),



  /**
   * ========================
   *          구  독
   * ========================
   */
  /**
   * 구독 전체조회 (메인)
   * --
   */
  getFavorites: () => $http.get('/favorite'),

  /**
   * 구독 단일조회 (구독)
   * --
   */
  getFavorite: (user_id) => $http.get(parameterToPath('/favorite/:user_id', { user_id })),

  /**
   * 구독 추가
   * --
   */
  postFavorite: (body) => $http.post('/favorite/add', body),

  /**
   * 구독 삭제
   * --
   */
  deleteFavorite: (body) => $http.delete('/favorite/delete', body),

  /**
   * 구독 단일조회 (해당 상담사)
   * --
   */
  getCounselorFavorite: (counselor_id) => $http.get(parameterToPath('/favorite/counselor/:counselor_id', { counselor_id })),

  /**
   * 상담사 구독 단일조회 (해당 상담사)
   * --
   */
  getCounselorFavoriteAll: (counselor_id) => $http.get(parameterToPath('/favorite/counselor/all/:counselor_id', { counselor_id })),



  /**
   * ========================
   *          후  기
   * ========================
   */
  /**
   * 후기 작성
   * --
   */
  postReview: (body) => $http.post('/review/write', body),

  /**
   * 후기 삭제
   * --
   */
  deleteReview: (review_item_id) => $http.delete(parameterToPath('/review/:review_item_id', { review_item_id })),

  /**
   * 후기 수정
   * --
   */
  putReview: (review_item_id, body) => $http.put(parameterToPath('/review/:review_item_id', { review_item_id }), body),

  /**
   * 단일 후기 조회
   * --
   */
  getReview: (counselor_id) => $http.get(parameterToPath('/review/:counselor_id', { counselor_id })),

  /**
   * 전체 후기 조회
   * --
   */
  getReviews: () => $http.get('/review'),

  /**
   * 회원 단일 후기 조회
   * --
   */
  getUserReviews: (user_id) => $http.get(parameterToPath('/review/user/:user_id', { user_id })),



  /**
   * ========================
   *          상  담
   * ========================
   */
  /**
   * 상담 요청
   * --
   */
  getCounsultRequest: ({ params }) => $http.get(parameterToPath('/consulting/request/:counselor_id/:price', params)),

  /**
   * 상담 생성
   * --
   */
  postConsultingCreate: (body) => $http.post(parameterToPath('/consulting/create'), body),

  /**
   * 상담 시작
   * --
   */
  putConsultingStart: (body) => $http.put(parameterToPath('/consulting/start'), body),

  /**
   * 상담 일시정지
   */
  putConsultingPause: (body) => $http.put(parameterToPath('/consulting/pause'), body),

  /**
   * 상담 종료
   * --
   */
  putConsultingEnd: (body) => $http.put(parameterToPath('/consulting/end'), body),

  /**
   * 상담 단일 조회
   * --
   */
  getConsultingRoom: () => $http.get(parameterToPath('/consulting/findone')),



  /**
   * ========================
   *        관  리  자
   * ========================
   */
  /**
   * 상담사 회원가입 목록 확인
   * --
   */
  getRegisterCounselors: () => $http.get(parameterToPath('/admin/regitser/counselor/all')),
  /**
   * 상담사 요청 목록 확인
   * --
   */
  getRequestCounselors: () => $http.get(parameterToPath('/admin/request/counselor/all')),

  /**
   * 상담사 요청 승인
   */
  postAcceptCounselor: (counselor_id) => $http.post(parameterToPath('/admin/accept/counselor/:counselor_id', { counselor_id })),

  /**
   * 상담사 요청 거절
   */
  postRejectCounselor: (counselor_id) => $http.post(parameterToPath('/admin/reject/counselor/:counselor_id', { counselor_id })),

  /**
   * 상담사 회원가입 승인
   */
  postAcceptCounselorRegister: (request_id) => $http.post(parameterToPath('/admin/accept/counselor/register/:request_id', { request_id })),

  /**
   * 상담사 회원가입 거절
   */
  postRejectCounselorRegister: (request_id) => $http.delete(parameterToPath('/admin/reject/counselor/register/:request_id', { request_id })),

  /**
   * 관리자 로그인
   * --
   */
  postAdminSignIn: (body) => $http.post(parameterToPath('/admin/signin'), body),

  /**
   * 관리자 회원가입
   * --
   */
  postAdminSignUp: (body) => $http.post(parameterToPath('/admin/signup'), body),

  /**
   * 관리자 복머니 전달
   * --
   */
  postAdminGiveLuckyPouch: (id, body) => $http.post(parameterToPath('/admin/give/lucky_pouch/:id', { id }), body),

  /**
   * 관리자 코인 전달
   * --
   */
  postAdminGiveCoin: (id, body) => $http.post(parameterToPath('/admin/give/coin/:id', { id }), body),

  /**
   * 관리자 복머니 회수
   * --
   */
  postAdminTakeLuckyPouch: (id, body) => $http.post(parameterToPath('/admin/take/lucky_pouch/:id', { id }), body),

  /**
   * 관리자 코인 회수
   * --
   */
  postAdminTakeCoin: (id, body) => $http.post(parameterToPath('/admin/take/coin/:id', { id }), body),

  /**
   * 관리자 문의 답변
   * --
   */
  postAddAskAdmin: (body) => $http.post('/ask/answeradmin', body),
};

export default API;