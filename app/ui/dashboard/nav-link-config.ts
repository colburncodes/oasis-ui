'use client';
import {DocumentDuplicateIcon, HomeIcon, UserGroupIcon, BuildingStorefrontIcon, MapIcon } from "@heroicons/react/24/outline";

export const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
        name: 'Invoices',
        href: '/dashboard/invoices',
        icon: DocumentDuplicateIcon,
    },
    { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
    { name: 'Stores', href: '/dashboard/stores', icon: BuildingStorefrontIcon },
    { name: 'Routes', href: '/dashboard/routes', icon: MapIcon }
];