import { Button } from '../../Button/Button';
import './BoxHead.css';

export const BoxHead = ({
    counselor,
    setIsOpenPresent,
}) => {
    return (
        <div className="box-head">
            <img className="head-img" src={counselor?.profile_img ? counselor.profile_img : counselor?.profile_img} alt="상담사 이미지" />
            <div className="head-info">
                <div className="head-info-item">
                    <div className="info-counselor-name">{counselor?.name}</div>
                    <div className="info-counselor-category">{`전화${counselor?.category}`}</div>
                </div>
                <div className="head-info-item">
                    <Button
                        title={'선물하기'}
                        backgroundColor={'#FEE140'}
                        borderColor={'#FEE140'}
                        onClick={() => { setIsOpenPresent(true) }}
                    />
                </div>
            </div>
        </div>
    )
}