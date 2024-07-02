import React from "react";
import { Tabs } from "antd";
// import { Tabs } from "../../../../../components/Layout/Tabs/Tabs";
import './CounselorIntro.css';
import CounselorReview from "./Tabs/CounselorReview";
import CounselorTabContent from "./Tabs/CounselorTabContent";

import { IntroduceIcon, NoticeIcon, ProductIcon } from '../../../../../assets/navImg';
import { Button } from "../../../../../components/Layout/Button/Button";

export const CounselorIntro = ({
  userType,

  counselor,
  counselor_id,

  productionInfos,

  reviews,
  isShowReviews,
  toggleShowReviews,

  // isClick,
  // setIsClick,
  clickEvent
}) => {
  const items = [
    /**
     * 상담원 소개
     */
    {
      key: '1',
      label: '상담원 소개',
      children:
        <div className="content-br">
          <CounselorTabContent
            icon={
              (() => {
                const Icon = IntroduceIcon
                return (
                  <Icon />
                )
              })()
            }
            title={'상담원 소개'}
            read={'(약력)'}
            content={counselor.introduce}
          />
        </div>
    },

    /**
     * 서비스공지
     */
    {
      key: '2',
      label: '상담사 공지',
      children:
        <div className="content-br">
          <CounselorTabContent
            icon={
              (() => {
                const Icon = NoticeIcon
                return (
                  <Icon />
                )
              })()
            }
            title={'상담사 공지'}
            read={'(상담 전 읽어주세요)'}
            content={counselor.notice}
          />
        </div>
    },
    /**
     * 서비스소개
     */
    {
      key: '3',
      label: '서비스 소개',
      children:
        <div className="content-br">
          <CounselorTabContent
            icon={
              (() => {
                const Icon = ProductIcon
                return (
                  <Icon />
                )
              })()
            }
            title={'서비스 소개'}
            content={counselor.product_intro}
            image={counselor.product_img}
          />
        </div>
    },
    /**
     * 후기
     */
    // {
    //   key: '4',
    //   label: '후기',
    //   children:
    //     <div>
    //       <CounselorReview
    //         userType={userType}

    //         counselor_id={counselor_id}

    //         reviews={reviews}
    //         isShowReviews={isShowReviews}
    //         toggleShowReviews={toggleShowReviews}

    //         // isClick={isClick}
    //         // setIsClick={setIsClick}
    //         clickEvent={clickEvent}
    //       />
    //     </div>
    // },
    /**
     * 상담 상품
     */
    // {
    //   key: '5',
    //   label: '상담 상품',
    //   children:
    //     <div>
    //       asdf
    //     </div>
    // }
  ];

  const scrollButton1 = () => {
    document.getElementById('intro1').scrollIntoView({ behavior: 'smooth' })
  };

  const scrollButton2 = () => {
    document.getElementById('intro2').scrollIntoView({ behavior: 'smooth' })
  };

  const scrollButton3 = () => {
    document.getElementById('intro3').scrollIntoView({ behavior: 'smooth' })
  };

  return (
    <div className="counselor-intro-container">
      <div className="counselor-intro-button">
        <Button
          title={'상담사 소개'}
          color={'black'}
          backgroundColor={'white'}
          borderColor={'white'}
          onClick={scrollButton1}
        />
        <Button
          title={'상담사 공지'}
          color={'black'}
          backgroundColor={'white'}
          borderColor={'white'}
          onClick={scrollButton2}
        />
        <Button
          title={'서비스 소개'}
          color={'black'}
          backgroundColor={'white'}
          borderColor={'white'}
          onClick={scrollButton3}
        />

      </div>
      <div className="counselor-intro-info" id="intro1">
        <div className="counselor-intro-title">
          {
            (() => {
              const Icon = IntroduceIcon
              return (
                <Icon />
              )
            })()
          }
          <span> 상담원 소개 (약력)</span>
        </div>
        <div className="counselor-intro-content">
          <span className="content-br">{counselor.introduce}</span>
        </div>
      </div>
      <div className="counselor-intro-info" id="intro2">
        <div className="counselor-intro-title">
          {
            (() => {
              const Icon = NoticeIcon
              return (
                <Icon />
              )
            })()
          }
          <span> 상담원 공지 (상담 전 읽어주세요)</span>
        </div>
        <div className="counselor-intro-content">
          <span className="content-br">{counselor.notice}</span>
        </div>
      </div>
      <div className="counselor-intro-info" id="intro3">
        <div className="counselor-intro-title">
          {
            (() => {
              const Icon = ProductIcon
              return (
                <Icon />
              )
            })()
          }
          <span> 서비스 소개</span>
        </div>
        <div className="counselor-intro-content">
          <span className="content-br">{counselor.product_intro}</span>
          {
            counselor?.product_img &&
            <img src={counselor.product_img} alt="서비스 이미지" />
          }
        </div>
      </div>
      {/* <Tabs items={items} /> */}
    </div>
  )
}