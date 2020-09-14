import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

import Dashboard from '@/views/Dashboard'
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Index from '@/views/pages/index'
import Login from '@/views/pages/login'
import Register from '@/views/pages/Register'
import Forgotpassword from '@/views/pages/ForgotPassword'
import Resetpassword from '@/views/pages/ResetPassword'
import LM from '@/views/pages/lembaga-masyarakat'
import forum from '@/views/pages/forum'
import forumthread from '@/views/pages/forum-thread'
import forumreply from '@/views/pages/forumReply'
import createForum from '@/views/pages/createforum'
import berita from '@/views/pages/berita'
import detailberita from '@/views/pages/detailberita'
import createberita from '@/views/pages/createberita'
import createadmin from '@/views/pages/createadmin'
import viewApprovaluser from '@/views/pages/viewApprovalUser'
import approvaluser from '@/views/pages/approvaluser'
import approvalberita from '@/views/pages/approvalberita'
import listBerita from '@/views/pages/listberita'
import listLM from '@/views/pages/listLM'
import listAdmin from '@/views/pages/listAdmin'
import documents from '@/views/pages/document'
import detailLm from '@/views/pages/detailLm'
import changePassword from '@/views/pages/changepassword'
import editProfile from '@/views/pages/editprofile'
import eDoc from '@/views/pages/eDoc'
import createEdoc from '@/views/pages/createEdoc'
import listEdoc from '@/views/pages/listEdoc'
import listThread from '@/views/pages/listThread'
import listQuote from '@/views/pages/listQuote'
import createQuote from '@/views/pages/createQuote'
import editQuote from '@/views/pages/editQuote'
import addSdm from '@/views/pages/createSdm'
import registerInovasi from '@/views/pages/registerinovasi'
import userInovasi from '@/views/pages/userinovasi'

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '',
      component: Full,
      children: [
        { path: 'register', name: 'Register', component: Register },
        { path: '/reset-password', name: 'Resetpassword', component: Resetpassword },
        { path: '/forgot-password/:id', name: 'Forgotpassword', component: Forgotpassword },
        { path: '', name: 'Index', component: Index },
        { path: 'lembaga-masyarakat', name: 'lm', component: LM },
        { path: 'forum', name: 'forum', component: forum },
        { path: 'forum-thread', name: 'forumthread', component: forumthread },
        { path: 'forum-reply', name: 'forumreply', component: forumreply },
        { path: 'create-forum', name: 'create forum', component: createForum },
        { path: 'berita', name: 'berita', component: berita },
        { path: 'detail-berita', name: 'detailberita', component: detailberita },
        { path: 'create-berita', name: 'createberita', component: createberita },
        { path: 'create-admin', name: 'createadmin', component: createadmin },
        { path: 'approval-user', name: 'approvaluser', component: approvaluser },
        { path: 'view-approval-user', name: 'viewApprovaluser', component: viewApprovaluser },
        { path: 'approval-berita', name: 'approvalberita', component: approvalberita },
        { path: 'detail-lm', name: 'detailLm', component: detailLm },
        { path: 'list-berita', name: 'listBerita', component: listBerita },
        { path: 'list-LM', name: 'listLM', component: listLM },
        { path: 'list-quote', name: 'listQuote', component: listQuote },
        { path: 'create-quote', name: 'createQuote', component: createQuote },
        { path: 'edit-quote', name: 'editQuote', component: editQuote },
        { path: 'document', name: 'documents', component: documents },
        { path: 'edit-user', name: 'editProfile', component: editProfile },
        { path: 'change-password', name: 'changePassword', component: changePassword },
        { path: 'e-doc', name: 'eDoc', component: eDoc },
        { path: 'create-e-doc', name: 'createEdoc', component: createEdoc },
        { path: 'create-sdm', name: 'addSdm', component: addSdm },
        { path: 'list-e-doc', name: 'listEdoc', component: listEdoc },
        { path: 'list-thread', name: 'listThread', component: listThread },
        { path: 'list-admin', name: 'listAdmin', component: listAdmin },
        { path: 'inovasi', name: 'registerInovasi', component: registerInovasi },
        { path: 'user-inovasi', name: 'userInovasi', component: userInovasi },

      ]
    },
    { path: '/login', name: 'Login', component: Login },
    // { path: '/register', name: 'Register', component: Register },
    {
      path: '/user/',
      redirect: 'user',
      component: Full,
      children: [
        { path: '', name: 'Dashboard', component: Dashboard },
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
