import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/dashboard', title: 'DashBoard', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/ticket', title: 'Tickets', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/createticket', title: 'Create Ticket', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'My Tickets', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '/ticket/personal', title: 'All Tickets', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/ticket/pending', title: 'Pending', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // { path: '/ticket/open', title: 'Working', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/ticket/closed', title: 'Completed', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    }
    // {
    //     path: '/changelog', title: 'ChangeLog', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    // { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    // { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

];
