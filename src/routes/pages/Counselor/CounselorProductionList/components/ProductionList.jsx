import { Button } from '../../../../../components/Layout/Button/Button';

import './ProductionList.css';

export const ProductionList = ({
    productions,
    removeProduction,
}) => {
    return (
        <div className="production-list-box">
            {
                productions.map((production, idx) => {
                    const counselor = {
                        name: production['counselor.name'],
                        profile_img: production['counselor.profile_img'],
                    }

                    return (
                        <div className="production-box">
                            <div className="production-image">
                                <img src={counselor.profile_img} alt="상담사 이미지" />
                            </div>

                            <div className="production-info">
                                <span className="production-name">
                                    {production.name}
                                </span>
                                <span className="production-explain">
                                    {production.explain}
                                </span>
                            </div>

                            <div className="production-remove-button">
                                <Button
                                    title={'상품 삭제'}
                                    onClick={() => { removeProduction(production.id) }}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}