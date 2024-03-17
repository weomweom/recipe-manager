import React from 'react';
import Nav from "./Nav";

type ChildrenProps = {
    children: React.ReactNode;
}

function Layout({children} : ChildrenProps) {
    return (
        <>
            <Nav/>
            <div className='p-6'>
                {children}
            </div>
        </>
    );
}

export default Layout;