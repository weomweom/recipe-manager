import React from 'react';
import Nav from "./Nav";
import { StyledLayout } from './StyledComponents';

type ChildrenProps = {
    children: React.ReactNode;
}

function Layout({children} : ChildrenProps) {
    return (
        <>
            <Nav/>
            <StyledLayout>
                {children}
            </StyledLayout>
        </>
    );
}

export default Layout;