import React from 'react';

import Home from '../views/home';
import UserProfile from '../views/profile';


const routes = [
    { path: '/profile/*', element: <UserProfile/>},
    { path: '/home', element: <Home/> },
];

export default routes;

