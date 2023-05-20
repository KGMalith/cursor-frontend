import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

import Signin from '../views/public/signin/index'
import Signup from '../views/public/signup/index';
import PageNotFound from '../views/public/pagenotfound/index';
import AppLayout from '../views/private/layout/appLayout';


const MainRoutes:React.FC = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Signin/>} />
                    <Route path="/signup" element={<Signup/>} />
                    {/* Private Routes */}
                    <Route path="/app/*" element={<AppLayout/>} />
                    {/* <PrivateRoutes element={AppLayout} path={`/app`} /> */}

                    {/* 404 error page */}
                    <Route path="*" element={<PageNotFound/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainRoutes;

