/* eslint-disable eqeqeq */
import React,{useEffect} from 'react';
import {
    Route,
    Routes,
    NavLink
} from 'react-router-dom';
import UserProfileView from './user-profile';
import { useNavigate,useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { User } from 'react-feather';
import './profile.scss';

export default function UserProfile() {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if(location && location.pathname == "/app/profile"){
            navigate('/app/profile/user-profile');
        }
    }, [navigate,location])

    return (
        <Col>
            <Row className='user-profile-container'>
                <Col sm={3} className="navigation-column pt-5">
                    <ul>
                        <NavLink to="/app/profile/user-profile" className={({ isActive })=>isActive?"active-nav":"default-nav"}>
                            <div className="sidebar-menu-profile">
                                <span>
                                    <User strokeWidth={1} width={18} height={18} color='#3F4249' />
                                </span>
                                <span>
                                    Profile
                                </span>
                            </div>
                        </NavLink>
                    </ul>
                </Col>
                <Col className='pt-5' style={{ overflowY: 'auto', height: 'calc(100vh - 75px)' }}>
                    <Routes>
                        <Route path="/user-profile" element={<UserProfileView/>} />
                    </Routes>
                </Col>
            </Row>
        </Col>

    )
}
