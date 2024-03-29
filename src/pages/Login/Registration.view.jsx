import React, { useState } from 'react';
import BP from '../../scss/CommonClass';
import InputField from '../../Components/InputFeild/InputFeild.view';
import { pagetitle } from '../../helper/CommonFunction';
import { useTranslation } from 'react-i18next';
import Commonbutton from '../../Components/Button/Button.view';
import FontAwesome, { iconList } from '../../Components/FontAwesome/FontAwesome';
import { path } from '../../routes/path';
import { Link } from 'react-router-dom';
import './auth.scss';
import { useLogin } from './Login.logic';
import useFireBase from '../../Config/useFireBase';
import PasswordStrengthMeter from '../../Components/passWordStrength/passwordStrength';


//todo: after registration reset Form
const Registration = (props) => {
    const [googleSigninLoader,setGoogleSigninLoader] = useState();
    pagetitle(props.pageTitle);
    const { t } = useTranslation();
    const {googleSignin} = useFireBase();
    const {registrationFormik,registrationLoader} = useLogin()

    return (
        <div className={`${BP.card} auth-layout animate`}>
            <form onSubmit={(v)=>{registrationFormik.handleSubmit(v);console.log(v)}}>
                <div className='login'>
                    <InputField
                        placeHolder={t('placeorder.fullName')}
                        textType="name"
                        inputName="name"
                        asterisk={true}
                        whiteSpace={false}
                        onBlur={registrationFormik.handleBlur}
                        value={registrationFormik.values.name}
                        onchangeCallback={registrationFormik.handleChange}
                        inputClassName={registrationFormik.touched.name && registrationFormik.errors.name ? " is-invalid" : ""}
                        requiredMessage={registrationFormik.touched.name && registrationFormik.errors.name}
                        requiredMessageLabel={registrationFormik.touched.name || registrationFormik.isSubmitting ? registrationFormik.errors.name : ""}
                    />
                    <InputField
                        placeHolder={t('placeorder.email')}
                        textType="email"
                        inputName="email"
                        asterisk={true}
                        whiteSpace={false}
                        onBlur={registrationFormik.handleBlur}
                        value={registrationFormik.values.email}
                        onchangeCallback={registrationFormik.handleChange}
                        inputClassName={registrationFormik.touched.email && registrationFormik.errors.email ? " is-invalid" : ""}
                        requiredMessage={registrationFormik.touched.email && registrationFormik.errors.email}
                        requiredMessageLabel={registrationFormik.touched.email || registrationFormik.isSubmitting ? registrationFormik.errors.email : ""}
                    />
                    <InputField
                        placeHolder={t('auth.password')}
                        textType="password"
                        inputName="password"
                        asterisk={true}
                        whiteSpace={false}
                        onBlur={registrationFormik.handleBlur}
                        value={registrationFormik.values.password}
                        onchangeCallback={registrationFormik.handleChange}
                        inputClassName={registrationFormik.touched.password && registrationFormik.errors.password ? " is-invalid" : ""}
                        requiredMessage={registrationFormik.touched.password && registrationFormik.errors.password}
                        requiredMessageLabel={registrationFormik.touched.password || registrationFormik.isSubmitting ? registrationFormik.errors.password : ""}
                    />
                    <InputField
                        placeHolder={t('auth.re_password')}
                        textType="password"
                        inputName="re_password"
                        asterisk={true}
                        whiteSpace={false}
                        onBlur={registrationFormik.handleBlur}
                        value={registrationFormik.values.re_password}
                        onchangeCallback={registrationFormik.handleChange}
                        inputClassName={registrationFormik.touched.re_password && registrationFormik.errors.re_password ? " is-invalid" : ""}
                        requiredMessage={registrationFormik.touched.re_password && registrationFormik.errors.re_password}
                        requiredMessageLabel={registrationFormik.touched.re_password || registrationFormik.isSubmitting ? registrationFormik.errors.re_password : ""}
                    />
                </div>
                {
                    registrationFormik.values.password && (
                        <span className='slow_animation'>
                            <PasswordStrengthMeter password={registrationFormik.values.password} />
                        </span>
                    )
                }
                <Commonbutton
                    type="submit"
                    // onClick={() => { }}
                    className="button login-btn"
                    disabled_className="btn-disabled login-btn"
                    btnText={` ${t('auth.register')}`}
                    isLoading={registrationLoader}
                    disabled={registrationLoader}
                />
            </form>
            <div className='social'>
                <Commonbutton
                    type="button"
                    onclickCallback={() => {googleSignin(setGoogleSigninLoader) }}
                    className="button login-btn google-btn"
                    disabled_className="btn-disabled"
                    btnText={(
                        <span >
                            <span className='google'><FontAwesome icon={iconList.google} /></span>
                            <span> {t('auth.r_google')}</span>
                        </span>
                    )}
                    isLoading={googleSigninLoader}
                    disabled={googleSigninLoader}
                />
                {/* <Commonbutton
                    type="button"
                    onClick={() => { }}
                    className="button login-btn"
                    btnText={(
                        <span >
                            <span className='google'><FontAwesome icon={iconList.facebook} /></span>
                            <span> {t('auth.r_facebook')}</span>
                        </span>
                    )}
                    isLoading={false}
                    disabled={false}
                /> */}
            </div>
            <Link to={path.login}>{t('auth.allReady_R')}</Link>
        </div>
    );
};

export default Registration;