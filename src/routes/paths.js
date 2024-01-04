// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  // manager
  parents: {
    root: path(ROOTS_DASHBOARD, '/parents'),
    list: path(ROOTS_DASHBOARD, '/parents/list'),
    parentsById: path(ROOTS_DASHBOARD, '/parents/edit/:id'),
    request: path(ROOTS_DASHBOARD, '/parents/request'),
    requestById: path(ROOTS_DASHBOARD, '/parents/request/edit/:id'),
    class: path(ROOTS_DASHBOARD, '/parents/class'),
    classById: path(ROOTS_DASHBOARD, '/parents/class/edit/:id')
  },
  tutor: {
    root: path(ROOTS_DASHBOARD, '/tutor'),
    list: path(ROOTS_DASHBOARD, '/tutor/list'),
    tutorById: path(ROOTS_DASHBOARD, 'tutor/edit/:id'),
    verification: path(ROOTS_DASHBOARD, '/tutor/verification'),
    verificationById: path(ROOTS_DASHBOARD, '/tutor/verification/edit/:id')
  },
  transaction: {
    root: path(ROOTS_DASHBOARD, '/transaction'),
    detail: path(ROOTS_DASHBOARD, '/transaction/:id')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    list: path(ROOTS_DASHBOARD, '/blog/list'),
    post: path(ROOTS_DASHBOARD, '/blog/post/edit/:id'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  question:{
    root: path(ROOTS_DASHBOARD, '/question'),
    list: path(ROOTS_DASHBOARD, '/question/list'),
    newQuestion: path(ROOTS_DASHBOARD, '/question/new-post'),
    questionById: path(ROOTS_DASHBOARD, '/question/edit/:id')
  },
  // Admin
  assign: path(ROOTS_DASHBOARD, '/assign'),
  variables: path(ROOTS_DASHBOARD, '/system-variables'),
  statistic: path(ROOTS_DASHBOARD, '/statistic'),
  // Manager account
  managerAccount:{
    root: path(ROOTS_DASHBOARD, '/manager-account'),
    list: path(ROOTS_DASHBOARD, '/manager-account/list'),
    newAccount: path(ROOTS_DASHBOARD, '/manager-account/new-account'),
    accountById: path(ROOTS_DASHBOARD, '/manager-account/edit/:id'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
