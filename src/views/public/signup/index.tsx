import React, { useState } from 'react';
import styles from './signup.module.scss';
import { Lock, Mail, User } from 'react-feather';
import { Col, Container, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../../components/CustomButtons';
import { CommonTextBox } from '../../../components/CustomTextBox';
import * as yup from 'yup';
import { Formik } from 'formik';
import { signUp } from '../../../services/utils/auth';
import { SignUpParameters } from '../../../services/interfaces';
const {Helmet} = require('react-helmet');


function Signup(props:any) {
    const [isLoading, setLoading] = useState(false);

    const schema = yup.object({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required')
    });

    const onSubmit = async (values:SignUpParameters) => {
        setLoading(true);
        const respond:any = await signUp(values, setLoading);
        if (respond && respond.success){
            setLoading(false);
            props.history.push('/');
        }
    }

    return (
        <div>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <div className={`${styles.header} d-flex align-items-center`}>
                <div className="container d-flex align-items-center">
                    <div className={`${styles.logo} me-auto`}>
                        <Link to="/"><img src='/images/logo.png' alt='logo' /></Link>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className={`${styles.headerQuestion} d-none d-md-block`}>Already have an account ?</span>
                        <Link to="/">
                            <CustomButton
                                label="Sign in"
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
                                <p className={styles.pageTitle}>Signup</p>
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={(values) => onSubmit(values)}
                                    initialValues={{
                                        firstName:'',
                                        lastName:'',
                                        email:'',
                                        password:'',
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
                                                    controlId="firstName"
                                                    label="First Name"
                                                    type="text"
                                                    name="firstName"
                                                    handleOnChange={handleChange}
                                                    errorMessage={submitCount > 0 && errors.firstName}
                                                    isInvalid={submitCount > 0 && errors.firstName}
                                                    frontIcon={
                                                        <User strokeWidth={1} width={18} height={18} color='#C4C4C4' />
                                                    }
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <CommonTextBox
                                                    controlId="lastName"
                                                    label="Last Name"
                                                    type="text"
                                                    name="lastName"
                                                    handleOnChange={handleChange}
                                                    errorMessage={submitCount > 0 && errors.lastName}
                                                    isInvalid={submitCount > 0 && errors.lastName}
                                                    frontIcon={
                                                        <User strokeWidth={1} width={18} height={18} color='#C4C4C4' />
                                                    }
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <CommonTextBox
                                                    controlId="email"
                                                    label="Email"
                                                    type="email"
                                                    name="email"
                                                    handleOnChange={handleChange}
                                                    errorMessage={errors.email}
                                                    isInvalid={submitCount > 0 && errors.email}
                                                    frontIcon={
                                                        <Mail strokeWidth={1} width={18} height={18} color='#C4C4C4' />
                                                    }
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <CommonTextBox
                                                    controlId="password"
                                                    label="Password"
                                                    type="password"
                                                    name="password"
                                                    handleOnChange={handleChange}
                                                    errorMessage={errors.password}
                                                    isInvalid={submitCount > 0 && errors.password}
                                                    frontIcon={
                                                        <Lock strokeWidth={1} width={18} height={18} color='#C4C4C4' />
                                                    }
                                                />
                                            </div>
                                            <Col className='mt-4'>
                                                <CustomButton
                                                    classType="secondaryBtn"
                                                    buttonType="submit"
                                                    label="Sign up"
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
                        <Image src='/images/signup.png' alt='Signup page' fluid />
                    </Col>
                </div>
            </section>
        </div>
    )
}

export default Signup
