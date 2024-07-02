import React, { useEffect, useState } from "react";
import { Input } from "../../../../../../components/Layout/Input2/Input";
import { Button } from '../../../../../../components/Layout/Button/Button';
import { Select } from "antd";
import { RadioBox } from "../../../../../../components/Layout/Calendar/components/RadioBox";
import { ImageBox } from '../../../../../../components/Layout/SignUpBox/ImageBox';
import API from "../../../../../../api/API";
import "./MyInfo.css";

export const MyInfo = ({
    counselor,
    setCounselor,

    time,
    setTime,

    onSubmit,

    selectConsultingStatus,
    setSelectConsultingStatus,

    onChangeImage,
    prevImageSrc,
    onChangeProductImage,
    productPrevImageSrc,

    setError,
}) => {
    console.log(counselor)
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const hourOptions = hours.map((hourOption) => ({
        value: hourOption,
        label: hourOption,
    }));

    const minuteOptions = minutes.map((minuteOption) => ({
        value: minuteOption,
        label: minuteOption,
    }));

    const workStatusRadio = [
        {
            id: 'status',
            value: '상담',
            name: '상담중',
            // onChange: setWorkStatus
            onChange: async (e) => {
                if (counselor.status !== '회원') {
                    return;
                }
                const body = {
                    status: e.target.value
                };

                const result = await API.postScheduleStatus(body);
                if (result.code === 500) {
                    // 서버 에러
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`,
                    });
                    return;
                }

                if (result.status === 401) {
                    // 상태 변경 실패
                    setError({
                        isError: true,
                        errorMsg: '상태 변경에 실패하였습니다.',
                    });
                    return;
                }

                if (result.status === 500) {
                    // 에러 발생
                    setError({
                        isError: true,
                        errorMsg: '상태 변경 중 에러가 발생하였습니다.',
                    });
                    return;
                }

                setSelectConsultingStatus(e.target.value);

                // 완료 알림 띄우기

            }
        },
        {
            id: 'status',
            value: '대기',
            name: '대기중',
            // onChange: setWorkStatus
            onChange: async (e) => {
                if (counselor.status !== '회원') {
                    return;
                }
                const body = {
                    status: e.target.value
                };

                const result = await API.postScheduleStatus(body);
                if (result.code === 500) {
                    // 서버 에러
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`,
                    });
                    return;
                }

                if (result.status === 401) {
                    // 상태 변경 실패
                    setError({
                        isError: true,
                        errorMsg: '상태 변경에 실패하였습니다.',
                    });
                    return;
                }

                if (result.status === 500) {
                    // 에러 발생
                    setError({
                        isError: true,
                        errorMsg: '상태 변경 중 에러가 발생하였습니다.',
                    });
                    return;
                }

                setSelectConsultingStatus(e.target.value);

                // 완료 알림 띄우기

            }
        },
        {
            id: 'status',
            value: '부재',
            name: '부재중',
            // onChange: setWorkStatus
            onChange: async (e) => {
                if (counselor.status !== '회원') {
                    return;
                }
                const body = {
                    status: e.target.value
                };

                const result = await API.postScheduleStatus(body);
                if (result.code === 500) {
                    // 서버 에러
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`,
                    });
                    return;
                }

                if (result.status === 401) {
                    // 상태 변경 실패
                    setError({
                        isError: true,
                        errorMsg: '상태 변경에 실패하였습니다.',
                    });
                    return;
                }

                if (result.status === 500) {
                    // 에러 발생
                    setError({
                        isError: true,
                        errorMsg: '상태 변경 중 에러가 발생하였습니다.',
                    });
                    return;
                }

                setSelectConsultingStatus(e.target.value);

                // 완료 알림 띄우기

            }
        }
    ]

    return (
        <div className="myinfo-container">
            <div className="myinfo-title">
                <h4>내 정보</h4>
            </div>
            <div className="myinfo-form">
                <div className="myinfo-input">
                    {/* <span>이름</span> */}
                    <Input
                        label={'이름'}
                        // direction={'row'}
                        type="text"
                        value={counselor.name}
                        placeholder={'이름을 입력하세요'}
                        onChange={(e) => {
                            const name = e;
                            setCounselor(info => {
                                return { ...info, name };
                            })
                        }}
                    />
                </div>

                <div className="myinfo-input">
                    {/* <span>예명</span> */}
                    <Input
                        label={'예명'}
                        // direction={'row'}
                        type="text"
                        value={counselor.nickname}
                        placeholder={'예명을 입력하세요'}
                        onChange={(e) => {
                            const nickname = e;
                            setCounselor(info => {
                                return { ...info, nickname };
                            })
                        }}
                    />
                </div>

                <div className="myinfo-input">
                    {/* <span>이메일</span> */}
                    <Input
                        label={'이메일'}
                        // direction={'row'}
                        type="text"
                        value={counselor.email}
                        placeholder={'이메일을 입력하세요'}
                        onChange={(e) => {
                            const email = e;
                            setCounselor(info => {
                                return { ...info, email };
                            })
                        }}
                    />
                </div>

                <div className="myinfo-input">
                    {/* <span>휴대전화</span> */}
                    <Input
                        label={'휴대전화'}
                        // direction={'row'}
                        type="text"
                        value={counselor.phone}
                        placeholder={'휴대전화 번호를 입력하세요'}
                        onChange={(e) => {
                            const phone = e;
                            setCounselor(info => {
                                return { ...info, phone };
                            })
                        }}
                    />
                </div>

                <div className="myintro-input">
                    <Input
                        label='요금(10초)'
                        type='number'
                        value={counselor.price}
                        placeholder='요금을 입력하세요'
                        onChange={(e) => {
                            const price = e;
                            setCounselor(info => {
                                return { ...info, price };
                            })
                        }}
                    />
                </div>

                <div className="myintro-input">
                    <span className="category-label">
                        분야
                    </span>
                    <select
                        className="counselor-category-select"
                        name="category"
                        onChange={(e) => {
                            const category = e.target.value;
                            setCounselor(info => {
                                return { ...info, category };
                            });
                        }}
                        value={counselor.category}
                    >
                        <option value="타로">타로</option>
                        <option value="신점">신점</option>
                        <option value="사주">사주</option>
                    </select>
                </div>

                <div className="myintro-input">
                    <span className="item-label">상담 상태</span>
                    <RadioBox datas={workStatusRadio} selectValue={selectConsultingStatus} />
                </div>

                <div className="myintro-input">
                    <span>상담 시간</span>
                    <div className='schedule-option-box'>
                        <span>시작 :</span>
                        <Select
                            value={time.startHour}
                            onChange={(startHour) => {
                                setTime(prev => {
                                    return { ...prev, startHour }
                                })
                            }}
                            listHeight={120}
                            options={hourOptions}
                        />

                        <Select
                            value={time.startMinute}
                            onChange={(startMinute) => {
                                setTime(prev => {
                                    return { ...prev, startMinute }
                                })
                            }}
                            listHeight={120}
                            options={minuteOptions}
                        />
                    </div>
                    <div className='schedule-option-box'>
                        <span>종료 :</span>
                        <Select
                            value={time.endHour}
                            onChange={(endHour) => {
                                setTime(prev => {
                                    return { ...prev, endHour }
                                })
                            }}
                            listHeight={120}
                            options={hourOptions}
                        />

                        <Select
                            value={time.endMinute}
                            onChange={(endMinute) => {
                                setTime(prev => {
                                    return { ...prev, endMinute }
                                })
                            }}
                            listHeight={120}
                            options={minuteOptions}
                        />
                    </div>
                </div>

                <ImageBox
                    onChangeImage={onChangeImage}
                    prevImageSrc={prevImageSrc}

                    title={'프로필 사진 등록'}
                    content={'프로필 사진 선택'}

                    name="profile-image"
                />

                <div className="myintro-input">
                    <span>한줄 소개</span>
                    <textarea
                        rows={1}
                        value={
                            counselor.introduce_line &&
                                counselor.introduce_line === 'null' ?
                                '' : counselor.introduce_line
                        }
                        onChange={(e) => {
                            const introduce_line = e.target.value;
                            setCounselor(info => {
                                return { ...info, introduce_line }
                            })
                        }}
                        style={{ resize: 'none' }}
                    />
                </div>

                <div className="myintro-input">
                    <span>상담원 소개</span>
                    <textarea
                        rows={5}
                        value={
                            counselor.introduce &&
                                counselor.introduce === 'null' ?
                                '' : counselor.introduce
                        }
                        onChange={(e) => {
                            const introduce = e.target.value;
                            setCounselor(info => {
                                return { ...info, introduce }
                            })
                        }}
                    />
                </div>

                <div className="myintro-input">
                    <span>상담사 공지</span>
                    <textarea
                        rows={5}
                        value={
                            counselor.notice &&
                                counselor.notice === 'null' ?
                                '' : counselor.notice
                        }
                        onChange={(e) => {
                            const notice = e.target.value;
                            setCounselor(info => {
                                return { ...info, notice }
                            })
                        }}
                    />
                </div>

                <div className="myintro-input">
                    <span>서비스 소개</span>
                    <textarea
                        rows={5}
                        value={
                            counselor.product_intro &&
                                counselor.product_intro === 'null' ?
                                '' : counselor.product_intro
                        }
                        onChange={(e) => {
                            const product_intro = e.target.value;
                            setCounselor(info => {
                                return { ...info, product_intro }
                            })
                        }}
                    />
                </div>
                
                <ImageBox
                    onChangeImage={onChangeProductImage}
                    prevImageSrc={productPrevImageSrc}

                    title={'서비스 소개 사진 등록'}
                    content={'서비스 소개 사진 선택'}

                    name="product-image"
                />

                <div className="myinfo-button">
                    <Button
                        title={'수정하기'}
                        type={'basic'}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </div >
    )
}