import React, { useEffect, useState } from "react";
import { CounselorProfilePresenter } from "./CounselorProfilePresenter";
import API from "../../../../api/API";
import cookie from "../../../../cookie";
import { useNavigate } from "react-router-dom";

const CounselorProfileContainer = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({
        isError: false,
        errorMsg: '',
    });

    const [enroll, setEnroll] = useState({
        isEnroll: false,
        enrollMsg: '',
    })

    const [time, setTime] = useState({
        startHour: 0,
        startMinute: 0,
        endHour: 0,
        endMinute: 0,
    })

    const [selectConsultingStatus, setSelectConsultingStatus] = useState(null);

    const [counselor, setCounselor] = useState({});

    const [page, setPage] = useState(true);

    const [imageFile, setImageFile] = useState(null);
    const [returnUrl, setReturnUrl] = useState([]);

    /* 이미지 관련 state */
    const [prevImageSrc, setPrevImageSrc] = useState(null);


    const [productImageFile, setProductImageFile] = useState(null);
    const [productReturnUrl, setProductReturnUrl] = useState([]);

    /* 이미지 관련 state */
    const [productPrevImageSrc, setProductPrevImageSrc] = useState(null);


    // 현재 상담사 프로필 정보 확인 함수
    useEffect(() => {
        (
            async () => {
                const counselor_id = await cookie.getCookie('id');
                if (!counselor_id) {
                    // 로그인 필요
                    setError({
                        isError: true,
                        errorMsg: '로그인이 필요합니다.',
                    });
                    return;
                }

                const getCounselorInfo = await API.getCounselor(counselor_id);
                if (getCounselorInfo.code === 500) {
                    // 서버 연결 안됨
                    setError({
                        isError: true,
                        errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
                    });
                    return;
                }

                if (getCounselorInfo.status === 404) {
                    // 회원 정보 없음
                    setError({
                        isError: true,
                        errorMsg: '회원 정보가 존재하지 않습니다.',
                    });
                    return;
                }

                if (getCounselorInfo.status === 500) {
                    // 에러 발생
                    setError({
                        isError: true,
                        errorMsg: '회원 정보를 불러오는 중 에러가 발생하였습니다.',
                    });
                    return;
                }

                setCounselor(getCounselorInfo.data);

                setSelectConsultingStatus(getCounselorInfo.data.consulting_status);
                const start_time = getCounselorInfo.data.consulting_start_time.split(':');
                const end_time = getCounselorInfo.data.consulting_end_time.split(':');

                setPrevImageSrc(getCounselorInfo.data.profile_img);
                setProductPrevImageSrc(getCounselorInfo.data.product_img);

                setTime({
                    startHour: start_time[0],
                    startMinute: start_time[1],
                    endHour: end_time[0],
                    endMinute: end_time[1],
                })
            }
        )();
    }, [])

    // 프로필 수정 함수
    const onSubmit = async () => {
        const counselor_id = await cookie.getCookie('id');
        if (!counselor_id) {
            // 로그인 필요
            setError({
                isError: true,
                errorMsg: '로그인이 필요합니다.',
            });
            return;
        }

        // const body = {
        //     ...counselor,
        //     consulting_start_time: `${time.startHour}:${time.startMinute}`,
        //     consulting_end_time: `${time.endHour}:${time.endMinute}`,
        // };

        const formData = new FormData();

        console.log(imageFile)

        for (const file in imageFile) {
            formData.append('image', imageFile[file]);
        }

        for (const url in returnUrl) {
            formData.append('imageUrl', returnUrl[url]);
        }

        formData.append('name', counselor.name ? counselor.name : '');
        formData.append('nickname', counselor.nickname ? counselor.nickname : '');
        formData.append('email', counselor.email ? counselor.email : '');
        formData.append('phone', counselor.phone ? counselor.phone : '');
        formData.append('price', counselor.price ? counselor.price : 0);
        formData.append('category', counselor.category ? counselor.category : '타로');
        formData.append('local', counselor.local ? counselor.local : '');
        formData.append('consulting_start_time', `${time.startHour}:${time.startMinute}`);
        formData.append('consulting_end_time', `${time.endHour}:${time.endMinute}`);
        formData.append('introduce_line', counselor.introduce_line ? counselor.introduce_line : '');
        formData.append('notice', counselor.notice ? counselor.notice : '');
        formData.append('introduce', counselor.introduce ? counselor.introduce : '');
        formData.append('product_intro', counselor.product_intro ? counselor.product_intro : '');
        formData.append('profile_img', counselor.profile_img);
        if (counselor.pw) formData.append('pw', counselor.pw);


        const postCounselorInfo = await API.multipartCounselorProfile(counselor_id, formData);
        // const postCounselorInfo = await API.multipartCounselorProfile(counselor_id, body);
        if (postCounselorInfo.code === 500) {
            // 서버 연결 안됨
            setError({
                isError: true,
                errorMsg: `서버 연결이 원활하지 않습니다.\n잠시만 기다려주시기 바랍니다.`
            });
            return;
        }

        if (postCounselorInfo.status === 409) {
            // 수정 실패
            setError({
                isError: true,
                errorMsg: '회원 정보 수정에 실패하였습니다.',
            });
            return;
        }

        if (postCounselorInfo.status === 500) {
            // 에러 발생
            setError({
                isError: true,
                errorMsg: '회원 정보 수정 중 에러가 발생하였습니다.',
            });
            return;
        }

        if (!submitProductImage(counselor_id)) {
            // 에러 발생
            setError({
                isError: true,
                errorMsg: '서비스 소개 이미지 업로드 중 에러가 발생하였습니다.',
            });
            return;
        }

        setEnroll({
            isEnroll: true,
            enrollMsg: '프로필 수정이 완료되었습니다.'
        });
    }

    const submitProductImage = async (counselor_id) => {
        const formData = new FormData();

        for (const file in productImageFile) {
            formData.append('image', productImageFile[file]);
        }

        for (const url in productReturnUrl) {
            formData.append('imageUrl', productReturnUrl[url]);
        }

        formData.append('product_img', counselor.product_img);

        const postCounselorInfo = await API.multipartCounselorProductImage(counselor_id, formData);
        if (postCounselorInfo.code === 500 || postCounselorInfo.status === 409 || postCounselorInfo.status === 500)
        if (postCounselorInfo.status === 500) {
            return false;
        }
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
        console.log('onChangeImage');
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
     * 제품 사진 미리보기
     */
    const previewProductImage = (image) => {
        console.log(image)
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = (e) => {
            setProductPrevImageSrc(e.target.result);
        }
    }

    /**
     * 제품 이미지 등록 함수
     */
    const onChangeProductImage = async (e) => {
        console.log('onChangeProudctImage')
        const images = e.target.files;
        if (images.length === 0) {
            return;
        }
        setProductImageFile(images);
        previewProductImage(images[0]);

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
            setProductReturnUrl(prev => [...prev, url]);
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
    }

    /**
     * 등록 처리 함수
     */
    const checkEnroll = () => {
        setEnroll({
            isEnroll: false,
            enrollMsg: '',
        })
        navigate(-1);
    }

    return (
        <CounselorProfilePresenter
            counselor={counselor}
            setCounselor={setCounselor}

            time={time}
            setTime={setTime}

            page={page}
            setPage={setPage}

            onSubmit={onSubmit}

            selectConsultingStatus={selectConsultingStatus}
            setSelectConsultingStatus={setSelectConsultingStatus}

            onChangeImage={onChangeImage}
            prevImageSrc={prevImageSrc}
            onChangeProductImage={onChangeProductImage}
            productPrevImageSrc={productPrevImageSrc}

            error={error}
            setError={setError}
            checkError={checkError}

            enroll={enroll}
            checkEnroll={checkEnroll}
        />
    )
}

export default CounselorProfileContainer;