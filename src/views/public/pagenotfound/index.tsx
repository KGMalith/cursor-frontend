import React from 'react';
import styles from './pagenotfound.module.scss';
import { CustomButton } from '../../../components/CustomButtons';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PublicCommonHeader from '../public common header';
const {Helmet} = require('react-helmet');


function PageNotFound() {
    return (
        <div>
            <Helmet>
                <title>404 Page Not Found</title>
            </Helmet>
            <PublicCommonHeader />
            <div className={`${styles.main_section}`}>
                <Image src="/images/404 Not Found.png" alt="Page not found image goes here" fluid className='w-6'/>
                <p className={`${styles.title}`}>Page Not Found</p>
                <p className={`${styles.desc}`}>Sorry, the page you’re looking for isn’t here. This can happen because of typos in the web<br/> address or outdated links.</p>
                <Col xs={8} md={4} lg={2} className='mt-4'>
                    <Link to="/">
                        <CustomButton
                            classType="secondaryBtn"
                            type="button"
                            label="Go to homepage"
                        />
                    </Link>
                </Col>
            </div>
        </div>

    )
}

export default PageNotFound
