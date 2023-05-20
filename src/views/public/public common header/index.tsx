import React from 'react';
import styles from './publiccommonheader.module.scss';
import { Link } from 'react-router-dom';

function PublicCommonHeader() {
    return (
        <div>
            <div className={`${styles.header} d-flex align-items-center`}>
                <div className="container d-flex align-items-center">
                    <div className={`${styles.logo} me-auto`}>
                        <Link to="/"><img src='/images/logo.png' alt='logo' /></Link>
                    </div>
                    <div className="d-flex align-items-center">
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PublicCommonHeader;
