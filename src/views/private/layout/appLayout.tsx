/* eslint-disable eqeqeq */
import React,{useEffect} from 'react';
import HeaderTopBar from '../common/header';
import { useNavigate,useLocation } from 'react-router-dom';
import styles from './appLayout.module.scss';
import {
    Route,
    Routes,
} from 'react-router-dom';
import routes from './routes';

function AppLayout() {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if(location && location.pathname == "/app"){
            navigate('/app/home');
        }
    }, [navigate,location])
    

    return (
        <div>
            <div className={styles.headerwrapper}>
                <HeaderTopBar/>
                <div className={styles.appBody}>
                    <Routes>
                        {routes.map((route, id) => {
                            return route.element && (
                                <Route
                                    key={id}
                                    path={route.path}
                                    element={route.element}
                                />
                            )
                        })}
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default AppLayout;
