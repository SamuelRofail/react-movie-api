import Header from '../header/Header'
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import instance from '../../axiosConfig/instance';

const AppLayout = () => {
    


    return (
        <>
        <Header/>
        <div className="container m-0 p-2 mx-auto">
            <Outlet />
        </div>
       
        </>
    );
}

export default AppLayout;
