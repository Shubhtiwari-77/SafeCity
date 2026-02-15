"use client"
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

export default function SessionWrapper({ children }) {
return (
    <SessionProvider>{children}</SessionProvider>
)}