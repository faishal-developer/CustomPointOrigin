import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import siteConfig from '../../Config/siteConfig';
import useasideDropDown from '../AsideBar/asideDropDown/asideDropDown.presenter';
import FontAwesome, { iconList } from '../FontAwesome/FontAwesome';
import FooterUtils from './Footer.utils';
// import { Category } from '../AsideBar/UtilsAsideBar';
import './static/Footer.scss'
import { path } from '../../routes/path';
import { useSelector } from 'react-redux';
import SubCatSkeleton from '../skeleton/subCatSkeleton.view';

const paymentMethods=[{name:"paypal"}]
const delivary=[{}]
const Footer = () => {
    const Category = useSelector((state) => state.catSlice.cat);
    const SubCategories = useSelector((state) => state.SubcatSlice.SubCategories);
    const {t} = useTranslation();
    const { filterCategory } = useasideDropDown();
   
    const data=(activeId)=>{
        const newData = filterCategory(activeId, { SubCategories, setSubcats:()=>{}, setSubcat:()=>{} });
        // const newData= filterCategory(activeId, Category(t), ()=>{});
        return newData;
    }

    return (
        <footer id='footer' className='footer'>
            <div className='subscription'>
                <Link to={path.contactUs}>
                    <p>{t('footer.getIn')}</p>
                </Link>
            </div>
            <div className='three_sec'>
                <div className='section'>
                    <div>
                        <div><FontAwesome icon={iconList.Lock}/></div>
                        <h5>{t('footer.securePay')}</h5>
                        <ul>
                            {
                                paymentMethods.map((v,i)=>(
                                    <li key={i}>{v.img}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className='section'>
                    <div><FontAwesome icon={iconList.smily} /></div>
                    <h5>{t('footer.satisfiction')}</h5>
                    <p>{t('footer.madeWith')}</p>
                </div>
                <div className='section'>
                    <div><FontAwesome icon={iconList.truck} /></div>
                    <h5>{t("footer.delivery")}</h5>
                    <ul> 
                        {
                            delivary.map((v,i)=>(
                                <li key={i}>{v.img}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className='social_link'>
                <ul>
                    <li className='facebook'>
                        <a target='_blan' href='https://web.facebook.com/profile.php?id=100089740422511'>
                            <FontAwesome icon={iconList.facebook} />
                        </a>
                    </li>
                    <li className='twitter'>
                        <a href='https://twitter.com' target='_blan'>
                            <FontAwesome icon={iconList.twitter} />
                        </a>
                    </li>
                    <li className='linkedin'>
                        <a href='https://www.linkedin.com/in/md-faishal-4bb8b3219/' target='_blan'>
                            <FontAwesome icon={iconList.linkedin} />
                        </a>
                    </li>
                </ul>
            </div>
            <div className='sub_items'>
                <div className='foot_item items'>
                    <h6 className='company_name'>
                        <Link to={path.home}>
                            {siteConfig.company_name}
                        </Link>
                    </h6>
                    {
                        FooterUtils(t).map((v,i)=>(
                            <p key={i}>
                                <Link to={v.value}>{v.name}</Link>
                            </p>
                        ))
                    }
                </div>
                {
                    Category.length?(
                        Category.map((cat)=>(
                            <React.Fragment key={cat._id}>
                                <div className='sub_item items'>
                                    <h6 >{cat.name}</h6>
                                    {
                                        data(cat._id)?.splice(0, 10).map((v, i) => (
                                            <p key={i}>
                                                <Link to={path.home + `?s_cat=${v._id}`}>{v.name}</Link>
                                            </p>
                                        ))
                                    }
                                </div>
                                {
                                    data(cat._id).length>10 && (
                                        <div className='sub_item items'>
                                            <h6 >{cat.name}</h6>
                                            {
                                                data(cat._id)?.splice(10, 20).map((v, i) => (
                                                    <p key={i}>
                                                        <Link to={path.home+`?s_cat=${v._id}`}>{v.name}</Link>
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </React.Fragment>
                        ))
                    ):(
                        <SubCatSkeleton/>
                    )
                }
            </div>
            <div className='nav_items'>
                <p>{t('shop')}</p>
                <p>{t('design')}</p>
                <p>{t('d_library')}</p>
            </div>
            <div className='copy_right'>
                <p>{t("footer.copywright")}</p>
            </div>
        </footer>
    );
};

export default Footer;