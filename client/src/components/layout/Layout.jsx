import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
    <div className="flex h-screen bg-light">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
        </main>
    </div>
);

export default Layout;