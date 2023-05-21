import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signin from '../views/public/signin/index'
import Signup from '../views/public/signup/index';
import PageNotFound from '../views/public/pagenotfound/index';
import AppLayout from '../views/private/layout/appLayout';
import ProtectedRoute from './ProtectedRoute';


const MainRoutes: React.FC = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* Private Routes */}
                    <Route path='/app/*' element={
                        <ProtectedRoute >
                            <AppLayout />
                        </ProtectedRoute>
                    } />

                    {/* 404 error page */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MainRoutes;

