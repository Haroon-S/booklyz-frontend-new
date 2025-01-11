'use client';

import { Box, Paper, List, ListItem, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const layout = ({ children }) => {
    const { palette: { primary: { main } } } = useTheme();
    const pathname = usePathname();

    // List 
    const journalSidebarLinks = [
        {
            id: 1,
            title: 'Overview',
            link: '/portal/owner/journals/overview',
        },
        {
            id: 2,
            link: '/portal/owner/journals/patients',
            title: 'Patients',
        },
        {
            id: 3,
            link: '/portal/owner/journals/user',
            title: 'User',
        },
        {
            id: 4,
            link: '/portal/owner/journals/notices',
            title: 'Notices',
        },
        {
            id: 5,
            link: '/portal/owner/journals/setting',
            title: 'Setting',
        },
        {
            id: 6,
            link: '/portal/owner/journals/log-history',
            title: 'Log History',
        },
    ];

    // Common Stylings
    const commonPaperStyles = {
        borderRadius: '10px',
    };

    return (
        <Box className="flex gap-4">
            <Paper sx={{ ...commonPaperStyles, minHeight: 'calc(100vh - 160px)', minWidth: '350px', padding: '20px 30px' }}>
                <Typography variant="h4">Journal</Typography>

                <List sx={{ marginTop: 3 }}>
                    {journalSidebarLinks.map(item => (
                        <ListItem key={item.id} sx={{ padding: '0px', marginTop: 1 }}>
                            <Link
                                href={item.link}
                                style={{
                                    ...(pathname.startsWith(item.link)
                                        ? { backgroundColor: main, color: 'white' }
                                        : {}),
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}
                            >
                                <Typography variant="body1">{item.title}</Typography>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {children}
        </Box>
    );
};

export default layout;
