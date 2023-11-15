'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        }
    ]

    return (
        <ul className='flex items-center sticky z-10 top-0 space-x-3 px-5 h-16'>
            <li><Link href='/'>logo</Link></li>
            {links.map(link => (
            <li key={link.href}>
                <Link 
                    className={`${pathname === link.href ? 'text-orange-400 font-medium' : 'text-gray-500'} transition-all text-xl`} 
                    href={link.href}>
                        {link.label}
                </Link>
            </li>
            ))}
        </ul>
    )
}

export default Nav