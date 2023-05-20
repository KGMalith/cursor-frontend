import React, { useState, useEffect } from 'react'
import { Col } from 'react-bootstrap';
import { CustomLoading } from '../../../../../components/CustomLoadingComponent';
import UserPassword from './user password card';
import UserProfile from './user profile card';
import { getProfileData } from '../../../../../services/utils/auth';

export default function UserProfileView() {
    let [values, setValues] = useState();
    const [isLoading, setLoading] = useState(true);

    const loadProfilePage = async () => {
        let respond:any = await getProfileData();
        if (respond.success) {
            setValues(respond.data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfilePage();
    }, []);

    return (
        <div>
            {isLoading ?
                (
                    <CustomLoading />
                )
                :
                <Col lg={{ span: 10, offset: 1 }} className="mb-4">
                    <UserProfile profileValues={values} loadUserProfile={loadProfilePage}/>
                    <UserPassword />
                </Col>
            }
        </div>
    )
}
