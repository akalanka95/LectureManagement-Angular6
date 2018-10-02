import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/view-profile/students', title: 'View Profile',  icon: 'person', class: '' },
    { path: '/schedule', title: 'Schedule',  icon: 'content_paste', class: '' },
    { path: '/attendance', title: 'Attendance',  icon: 'notifications', class: '' },
    { path: '/timeTable/view/semester', title: 'Time Schedule',  icon: 'bubble_chart', class: '' },
    { path: '/search/form', title: 'Adding/Canceling',  icon: 'content_paste', class: '' },
    { path: '/chat/message', title: 'Chat',  icon: 'library_books', class: '' },
    { path: '/event', title: 'Event Schedule',  icon: 'dashboard', class: '' },
    { path: '/notice-board', title: 'Notice Board',  icon: 'library_books', class: '' },
    { path: '/report', title: 'Report',  icon: 'person', class: '' },
    { path: '/reset', title: 'Reset',  icon: 'content_paste', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon: 'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    /*{ path: '/upgrade', title: 'Upgrade to PRO',  icon: 'unarchive', class: 'active-pro' },
*/];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
