import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
import Simple from '@/containers/Simple'

import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Dashboard from '@/views/pages/Dashboard'
import Index from '@/views/pages/Index'
import Article from '@/views/pages/Article'
import detailberita from '@/views/pages/detailberita'
import Document from '@/views/pages/Document'
import Login from '@/views/pages/login'
import Register from '@/views/pages/Register'
import Forgotpassword from '@/views/pages/ForgotPassword'
import Resetpassword from '@/views/pages/ResetPassword'
import changePassword from '@/views/pages/changepassword'
import editProfile from '@/views/pages/editprofile'
import Profile from '@/views/pages/profile'
import Adduser from '@/views/pages/Adduser'
import user from '@/views/pages/User'
import Category from '@/views/pages/Category'
import AddCategory from '@/views/pages/AddCategory'
import EditCategory from '@/views/pages/EditCategory'
import Location from '@/views/pages/Location'
import AddLocation from '@/views/pages/AddLocation'
import EditLocation from '@/views/pages/EditLocation'
import Type from '@/views/pages/Type'
import AddType from '@/views/pages/AddType'
import EditType from '@/views/pages/EditType'
import Finding from '@/views/pages/Finding'
import Issue from '@/views/pages/Issue'
import CreateIssue from '@/views/pages/CreateIssue'
import AssignIssue from '@/views/pages/AssignIssue'
import DetailIssue from '@/views/pages/DetailIssue'
import confirmation from '@/views/pages/confirmation'
import Menu from '@/views/pages/Menu'
import Reporter from '@/views/pages/Reporter'
import Executor from '@/views/pages/Executor'
import Observer from '@/views/pages/Observer'
import Admin from '@/views/pages/Admin'
import Manager from '@/views/pages/Manager'
import Picarea from '@/views/pages/picArea'
import editUser from '@/views/pages/editUser'
import editReporter from '@/views/pages/editReporter'
import editExecutor from '@/views/pages/editExecutor'
import editObserver from '@/views/pages/editObserver'
import editAdmin from '@/views/pages/editAdmin'
import editPicArea from '@/views/pages/editPicArea'
import editManager from '@/views/pages/editManager'

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
        { path: '', name: 'Index', component: Index },
        { path: 'signin', name: 'Login', component: Login },
        { path: 'article', name: 'Article', component: Article },
        { path: 'detail-berita', name: 'detailberita', component: detailberita },
        { path: 'document', name: 'Document', component: Document },
        { path: 'register', name: 'Register', component: Register },
        { path: 'forgot-password/:id', name: 'Forgotpassword', component: Forgotpassword },
        { path: 'reset-password', name: 'Resetpassword', component: Resetpassword },

      ]
    },
    {
      path: '/dashboard',
      redirect: '',
      component: Full,
      children: [
        { path: '', name: 'dashboard', component: Dashboard },
      ]
    },
    {
      path: '/profile/',
      redirect: '',
      component: Full,
      children: [
        { path: '', name: 'Profile', component: Profile },
        { path: 'edit', name: 'editProfile', component: editProfile },
      ]
    },
    {
      path: '/change-password',
      redirect: '',
      component: Full,
      children: [
        { path: '', name: 'changePassword', component: changePassword }
      ]
    },
    {
      path: '/user/',
      component: Full,
      children: [
        { path: 'all', name: 'user', component: user },
        { path: 'add', name: 'Adduser', component: Adduser },
        { path: 'reporter', name: 'Reporter', component: Reporter },
        { path: 'observer', name: 'Observer', component: Observer },
        { path: 'executor', name: 'Executor', component: Executor },
        { path: 'admin', name: 'Admin', component: Admin },
        { path: 'manager', name: 'Manager', component: Manager },
        { path: 'picarea', name: 'picarea', component: Picarea },
        { path: 'edit', name: 'edituser', component: editUser },
        { path: 'edit-reporter', name: 'editReporter', component: editReporter },
        { path: 'edit-observer', name: 'editObserver', component: editObserver },
        { path: 'edit-executor', name: 'editExecutor', component: editExecutor },
        { path: 'edit-admin', name: 'editAdmin', component: editAdmin },
        { path: 'edit-manager', name: 'editManager', component: editManager },
        { path: 'edit-area', name: 'editPicArea', component: editPicArea },
        
      ]
    },
    {
      path: '/category/',
      component: Full,
      children: [
        { path: '', name: 'Category', component: Category },
        { path: 'add', name: 'AddCategory', component: AddCategory },
        { path: 'edit', name: 'EditCategory', component: EditCategory },

      ]
    },
    {
      path: '/location/',
      component: Full,
      children: [
        { path: '', name: 'Location', component: Location },
        { path: 'add', name: 'AddLocation', component: AddLocation },
        { path: 'edit', name: 'EditLocation', component: EditLocation },

      ]
    },
    {
      path: '/type/',
      component: Full,
      children: [
        { path: '', name: 'Type', component: Type },
        { path: 'add', name: 'AddType', component: AddType },
        { path: 'edit', name: 'EditType', component: EditType },

      ]
    },
    {
      path: '/issue/',
      component: Full,
      children: [
        { path: '', name: 'Issue', component: Issue },
        { path: 'create', name: 'CreateIssue', component: CreateIssue },
        { path: 'assign/:id', name: 'AssignIssue', component: AssignIssue },
        { path: 'detail/:id', name: 'detailIssue', component: DetailIssue },
        { path: 'confirmation/:id', name: 'confirmation', component: confirmation },
      ]
    },
    {
      path: '/menu/',
      component: Full,
      children: [
        { path: '', name: 'Menu', component: Menu },
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
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        { path: '500', name: 'Page500', component: Page500 },
      ]
    },
    { path: '*', name: 'Page404', component: Page404 },
  ]
})
