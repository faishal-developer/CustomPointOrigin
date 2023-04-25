import './static/card.scss'
import { cal_discounted_price, changeRoute, stringSlicer } from '../../helper/CommonFunction';
import { useTranslation } from 'react-i18next';
import LazyLoader from '../LazyLoader/LazyLoader.view';
import { useNavigate } from "react-router-dom";
import TableSkeleton from '../skeleton/Skeleton';
import FontAwesome, { iconList } from '../FontAwesome/FontAwesome';
import useCardLogic from './card.presenter';
import { path } from '../../routes/path';
import Commonbutton from '../Button/Button.view';

// todo:make full card clickable . But when click on wish or cart button stop propagation will work
function CardView(props) {
    const { name, images,price,discount,_id } = props.product;
    const { t } = useTranslation();
    const history = useNavigate();

    return (
        <div className={`custom_card ${props.border}`}>
            <div className='card_body'>
                <figure>
                    {
                        discount?(
                            <div className='discount'>
                                <p>{discount}%</p>
                                <p>{t('singleProduct.off')}</p>
                            </div>
                        ) : null
                    }
                    <div className='wish'>
                        <FontAwesome icon={iconList.heart} />
                    </div>
                    <LazyLoader placeholder={<TableSkeleton count={1} height={120}/>}>
                        <img onClick={()=>changeRoute(history,path.single_products+`/${_id}`)} src={images[0]} alt={name} />
                    </LazyLoader>
                </figure>
                <div className='data'>
                    <div>
                        <span onClick={() => changeRoute(history, path.single_products+`/${_id}`)}>
                            <p className='title'>{stringSlicer(name, 40)}</p>
                            <p className='price'>
                                {t("money")}
                                {cal_discounted_price(price, discount)}
                                {Number(discount) ? <del className='del'>{t("money")}{price}</del> : null}
                            </p>
                        </span>
                        <Commonbutton
                            type="button"
                            onClick={props.onClick}
                            className="button"
                            btnText={t('singleProduct.addToCart')}
                            isLoading={false}
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardView;