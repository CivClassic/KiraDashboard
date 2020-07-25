import Vue, { Component } from 'vue';
import VueRouter from 'vue-router';
import Error from '@/views/error';
import General from '@/views/general';
import Groups from '@/views/groups';
import Settings from '@/views/settings';
import Snitches from '@/views/snitches';

Vue.use(VueRouter);

export interface RouteConfig {
  icon: string;
  caption: string;
  path: string;
  component: Component;
}

export interface RouteGroup {
  icon: string;
  caption: string;
  pages: RouteConfig[];
}

export const Routing: RouteGroup[] = [
  // General
  {
    icon: 'mdi-tune',
    caption: 'General',
    pages: [
      // Dashboard
      {
        icon: 'mdi-view-dashboard',
        caption: 'Dashboard',
        path: '/',
        component: General.Dashboard,
      },
    ],
  },
  // Groups
  {
    icon: 'mdi-account-group',
    caption: 'Groups',
    pages: [
      // My Groups
      {
        icon: 'mdi-account',
        caption: 'My Groups',
        path: '/groups/me',
        component: Groups.MyGroups,
      },
    ],
  },
  // Snitches
  {
    icon: 'mdi-bell',
    caption: 'Snitches',
    pages: [
      // Live Snitches
      {
        icon: 'mdi-bell-alert',
        caption: 'Live Snitches',
        path: '/snitches/live',
        component: Snitches.Live,
      },
    ],
  },
  // Settings
  {
    icon: 'mdi-wrench',
    caption: 'Settings',
    pages: [
      {
        icon: 'mdi-cogs',
        caption: 'General',
        path: '/settings/general',
        component: Settings.General,
      },
    ],
  },
];

export default new VueRouter({
  routes: [
    ...Routing.map((category) => category.pages).reduce((a, b) => a.concat(b)),
    {
      path: '*',
      component: Error.Error404,
    },
  ],
});
