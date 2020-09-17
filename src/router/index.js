import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
import Simple from '@/containers/Simple'

import Dashboard from '@/views/Dashboard'
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Index from '@/views/pages/index'
import Login from '@/views/pages/login'
import Register from '@/views/pages/Register'
import Forgotpassword from '@/views/pages/ForgotPassword'
import Resetpassword from '@/views/pages/ResetPassword'
import changePassword from '@/views/pages/changepassword'
import editProfile from '@/views/pages/editprofile'
import Adduser from '@/views/pages/Adduser'
import user from '@/views/pages/User'
import Category from '@/views/pages/Category'
import AddCategory from '@/views/pages/AddCategory'
import Location from '@/views/pages/Location'
import AddLocation from '@/views/pages/AddLocation'
import Finding from '@/views/pages/Finding'
import Issue from '@/views/pages/Issue'
import Type from '@/views/pages/Type'

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [

    {
      path: '/',
      redirect: '',
      component: Simple,
      children: [
        { path: '', name: 'Login', component: Login }

      ]
    },
    {
      path: '/register',
      redirect: '',
      component: Simple,
      children: [
        { path: '', name: 'Register', component: Register },
      ]
    },
    {
      path: '/forgot-password/:id',
      redirect: '',
      component: Full,
      children: [
        { path: '', name: 'Forgotpassword', component: Forgotpassword },
      ]
    },
    {
      path: '/dashboard',
      redirect: '',
      component: Full,
      children: [
        { path: '', name: 'dashboard', component: Index },
      ]
    },
    {
      path: '/profile',
      redirect: '',
      component: Full,
      children: [
        { path: '', name: 'editProfile', component: editProfile },
      ]
    },
    {
      path: '/reset-password',
      redirect: '',
      component: Simple,
      children: [
        { path: '/reset-password', name: 'Resetpassword', component: Resetpassword },

      ]
    },
    {
      path: '/change-password',
      redirect: '',
      component: Full,
      children: [
        { path: '', name: 'changePassword', component: changePassword },
      ]
    },
    // { path: '/register', name: 'Register', component: Register },
    {
      path: '/user/',
      redirect: 'user',
      component: Full,
      children: [
        { path: '', name: 'user', component: user },
      ]
    },
    {
      path: '/add-user/',
      redirect: 'add-user',
      component: Full,
      children: [
        { path: '', name: 'Adduser', component: Adduser },
      ]
    },
    {
      path: '/category/',
      redirect: 'category',
      component: Full,
      children: [
        { path: '', name: 'Category', component: Category },
      ]
    },
    {
      path: '/add-category/',
      redirect: 'add-category',
      component: Full,
      children: [
        { path: '', name: 'AddCategory', component: AddCategory },
      ]
    },
    {
      path: '/location/',
      redirect: 'location',
      component: Full,
      children: [
        { path: '', name: 'Location', component: Location },
      ]
    },
    {
      path: '/type/',
      redirect: 'type',
      component: Full,
      children: [
        { path: '', name: 'Type', component: Type },
      ]
    },
    {
      path: '/issue',
      redirect: 'issue',
      component: Full,
      children: [
        { path: '', name: 'Issue', component: Issue },
      ]
    },
    {
      path: '/finding/',
      redirect: 'finding',
      component: Full,
      children: [
        { path: '', name: 'Finding', component: Finding },
      ]
    },
    {
      path: '/add-location/',
      redirect: 'add-location',
      component: Full,
      children: [
        { path: '', name: 'AddLocation', component: AddLocation },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    },
  ]
})
