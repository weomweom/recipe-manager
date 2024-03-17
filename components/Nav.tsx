'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StyledNavigation, StyledNavLink } from './StyledComponents';
/*
interface NavLinks {
    links: {
        label: String,
        href: URL,
    }[];
}
*/
const Nav = (/*props: NavLinks*/) => {
    const pathname = usePathname();

    const links = [
        {
            label: 'Dashboard',
            href: '/',
        },
        {
            label: 'Recipes',
            href: '/recipes',
        },
        {
            label: 'Products',
            href: '/products',
        },
        {
            label: 'Menu',
            href: '/menu',
        },
        {
            label: 'Shopping list',
            href: '/shoppingList',
        }
    ]

    return (
        <StyledNavigation>
            <li><Link href='/'>logo</Link></li>
            <div className='flex gap-6'>
                {links.map(link => (
                <li key={link.href}>
                        {link.href === '/' 
                            ? <StyledNavLink href={link.href} $isActive={pathname !== null && pathname === (link.href)}>{link.label}</StyledNavLink>
                            : <StyledNavLink href={link.href} $isActive={pathname !== null && pathname.includes(link.href)}>{link.label}</StyledNavLink>
                        }
                </li>
                ))}
            </div>
        </StyledNavigation>
    )
}

export default Nav