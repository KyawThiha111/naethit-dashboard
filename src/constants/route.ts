// access for protected routes
export const ROUTE_ACCESS = {
  PUBLIC: "public",
  PRIVATE: "private",
  AUTH: "auth",
};

// routes for all pages
export const ROUTE_PATH = {
  // FOR UI PAGES
  DASHBOARD: "/",
  // ANALYTICS: '/dashboard/analytics',
  // SETTING: '/settings',
  // USER: '/user',
 ADMINS:{
  GET:"/admins/showadmins",
  CREATE:"/admins/createaccount",
  VERIFY:"/admins/verifyaccount"
 },
  // blog
  BLOG: {
    LIST: "/blogs",
    CREATE: "/blogs/create",
    EDIT: "/blogs/edit/:blogId",
    Cata: {
      CREATE:"/blogs/cata/create"
    }
  },
  
  ABOUTUSBANNER: {
    EDIT: "/aboutusbanner/edit",
  },

  AboutusMission: {
    CREATE: "/aboutmission/create",
    LIST: "/aboutmission/list",
    EDIT: "/aboutmission/edit/:id",
  },

  AboutTeamMember: {
    CREATE: "/teammember/create",
    LIST: "/teammember/list",
    EDIT: "teammember/edit/:id",
  },

  AboutLeader:{
    CREATE:"/ourleader/create",
    LIST:"/ourleader/list",
    EDIT:"/ourleader/edit/:id"
  },

  Contactus: {
    EDIT: "/contactdata/edit",
  },
  // home page
  HOME: {
    EDIT: "/home-banner-info/edit",
    TESTIMONIAL: {
      CREATE: "/testimonials/create",
      LIST: "/testimonials/list",
      EDIT: "/testimonials/edit/:id",
    },
    FACILITIES: {
      CREATE: "/facilities/create",
      LIST: "/facilities/list",
      EDIT: "/facilities/edit/:id",
    },
  },

  // request page
  REQUEST: "/request",

  // service page
  SERVICES: {
    CREATE: "/services/create",
    LIST: "/services/list",
    EDIT: "/services/edit/:id",
    BANNER: "/services/banner",
  },

  SERVICESLIDES:{
   CREATE:"/serviceslide/create",
   LIST:"/serviceslide/list"
  },
  // SYSTEM: {
  //   USER_CREATION: '/system/user',
  //   AGENT_CREATION: '/system/agent',
  // },

  // BUSINESS_USER: {
  //   NEW_USER: {
  //     BUSINESS_CUSTOMER: '/user-management/business-customer',
  //     CORPORATE_CUSTOMER: '/business-user/new-user/corporate-customer',
  //   },
  // },

  // POLICY_SERVICING: {
  //   UNDER_WRITING: {
  //     PROPOSAL: '/policy/underwriting/proposal',
  //     POLICY_DETAIL: '/policy/underwriting/policy-detail',
  //   },
  // },

  // DMS: {
  //   DMS_ADMINISTRATION: '/document-management-system/document-management-system-administration',
  //   DMS_ADMINISTRATION_DETAIL: `/document-management-system/document-management-system-administration/detail/:folder`,
  //   DMS_MAINTAINANCE: '/document-management-system/document-management-system-maintainance',
  // },

  //   FOR AUTH PAGES
  LOGIN: "/signin",
  VERIFY: "/verify",
  RESET_PASSWORD: "/reset-password",
  RESET_PASSWORD_VERIFY: "/reset-password-verify",
  // RESET_PASSWORD: '/reset-password',
  // SIGNUP: '/signup',
  // FORG0T_PASSWORD: '/forgot-password',
  // REFRESHTOKEN: '/refresh-token',

  // QUOTATION: '/quotation',
  // QUOTATIONHEALTH: '/quotation-health',
  // QUOTATIONSHORTSAVER: '/quotation-shortsaver',
  // QUOTATIONGROUPPROTECTOR: '/quotation-groupprotector',

  // PROPOSAL: '/proposal-servicing/agent-data-entry-form',

  // PROPOSALPOLICYHOLDER: '/proposal-policyholder',
  // PROPOSALINSUREDPERSON: '/proposal-insuredperson',
  // PROPOSALBENEFICIARY: '/proposal-beneficiary',
  // PROPOSALBASIC:'/proposal-basic',
  // PROPOSALINSUREDWITHOTHERS: '/proposal-other',

  // FOR NOT FOUND PAGE
  NOT_FOUND: "*",
};
