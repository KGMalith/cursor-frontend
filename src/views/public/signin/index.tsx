import React,{useState,useRef} from 'react';
import styles from './signin.module.scss';
import { Lock, Mail } from 'react-feather';
import { Col, Container, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../../components/CustomButtons';
import { CommonTextBox } from '../../../components/CustomTextBox';
import * as yup from 'yup';
import { Formik } from 'formik';
import { signIn } from '../../../services/utils/auth';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setEmailAction,setImageAction,setUserFirstNameAction,setUserLastNameAction} from '../../../redux/userSlice';
const {Helmet} = require('react-helmet');

interface SubmitValue {
    email: string;
    password:string;
}

function Signin() {
    const [isLoading, setLoading] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const signinFormRef = useRef<any>();

    const schema = yup.object({
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required')
    });

    const onSubmit = async (values:SubmitValue) => {
        setLoading(true);
        const respond:any = await signIn(values, setLoading);
        if (respond && respond.success) {
            console.log(respond)
            dispatch(setEmailAction(respond.data.email));
            dispatch(setImageAction(respond.data.image));
            dispatch(setUserFirstNameAction(respond.data.first_name));
            dispatch(setUserLastNameAction(respond.data.last_name));
            signinFormRef.current?.resetForm();
            navigate('/app');
        }
    }

    return (
        <div>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <div className={`${styles.header} d-flex align-items-center`}>
                <div className="container d-flex align-items-center">
                    <div className={`${styles.logo} me-auto`}>
                        <Link to="/"><img src='/images/logo.png' alt='logo' /></Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className={`${styles.headerQuestion} d-none d-md-block`}>Don't have an account ?</span>
                        <Link to="/signup">
                            <CustomButton
                                label="Sign Up"
                                classType="primaryBtn"
                                buttonType="button"
                                />
                        </Link>
                    </div>
                </div>
            </div>
            <section>
                <div className="row ms-0 me-0">
                    <Col md={6} className='align-self-center'>
                        <Container>
                            <Col lg={{ span: 8, offset: 2 }}>
                                <p className={styles.pageTitle}>Sign In</p>
                                <Formik
                                    innerRef={signinFormRef}
                                    validationSchema={schema}
                                    onSubmit={(values:SubmitValue) => onSubmit(values)}
                                    initialValues={{
                                        email:'',
                                        password:''
                                    }}>
                                    {({
                                        errors,
                                        handleChange,
                                        handleSubmit,
                                        submitCount
                                    }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <div className='mt-2'>
                                                <CommonTextBox
                                                    controlId="email"
                                                    label="Email"
                                                    type="email"
                                                    name="email"
                                                    handleOnChange={handleChange}
                                                    frontIcon={
                                                        <Mail strokeWidth={1} width={18} height={18} color='#C4C4C4' />
                                                    }
                                                    errorMessage={submitCount > 0 && errors.email}
                                                    isInvalid={submitCount > 0 && errors.email}
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <CommonTextBox
                                                    controlId="password"
                                                    label="Password"
                                                    type="password"
                                                    name="password"
                                                    handleOnChange={handleChange}
                                                    frontIcon={
                                                        <Lock strokeWidth={1} width={18} height={18} color='#C4C4C4' />
                                                    }
                                                    errorMessage={submitCount > 0 && errors.password}
                                                    isInvalid={submitCount > 0 && errors.password}
                                                />
                                            </div>
                                            <Col className='mt-4'>
                                                <CustomButton
                                                    classType="secondaryBtn"
                                                    buttonType="submit"
                                                    label="Sign In"
                                                    isButtonDisabled={isLoading}
                                                    isLoading={isLoading}
                                                />
                                            </Col>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Container>
                    </Col>
                    <Col md={6} className='d-none d-md-block text-center'>
                        <Image src='/images/signin.png' alt='Sign In page' fluid />
                    </Col>
                </div>
            </section>
        </div>

    )
}

export default Signin
