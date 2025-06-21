import PageTitle from "@/components/PageTitle";
import { ROUTE_ACCESS, ROUTE_PATH } from "@/constants/route";
import {
  BlogCreatePage,
  BlogEditPage,
  BlogListPage,
  AboutusBannerEditPage,
  AboutusMissionCreatePage,
  GetMissionPage,
  EditMissionPage,
  AddTeamMemberPage,
  GetAllMemberPage,
  EditMemberPage,
  AddLeaderPage,
  GetAllLeaderPage,
  EditLeaderPage,
  EditContactUsPage,
  DashboardPage,
  LoginPage,
  VerifyPage,
  HomePageBannerInfoPage,
  NotFoundPage,
  TestimonialPage,
  TestimonialCreatePage,
  TestimonialEditPage,
  ServicePage,
  ServiceCreatePage,
  ServiceEditPage,
  ServiceBannerPage,
  FacilitiePage,
  FacilitieCreatePage,
  FacilitieEditPage,
  ResetPasswordPage,
  ResetPasswordVerifyPage,
  RequestPage,
  AddCataPage
} from "@/pages";

export const RouteConfig = [
  {
    path: ROUTE_PATH.DASHBOARD,
    element: (
      <>
        <PageTitle title="Dashboard " />
        <DashboardPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  // blog
  {
    path: ROUTE_PATH.BLOG.LIST,
    element: (
      <>
        <PageTitle title="Blogs " />
        <BlogListPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.BLOG.CREATE,
    element: (
      <>
        <PageTitle title="Blog Create" />
        <BlogCreatePage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.BLOG.EDIT,
    element: (
      <>
        <PageTitle title="Blog Edit" />
        <BlogEditPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
   {
    path: ROUTE_PATH.BLOG.Cata.CREATE,
    element: (
      <>
        <PageTitle title="BlOGCata Create" />
        <AddCataPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  /* Aboutus Banner */
  {
    path: ROUTE_PATH.ABOUTUSBANNER.EDIT,
    element: (
      <>
        <PageTitle title="Aboutus Banner Edit" />
        <AboutusBannerEditPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* Aboutus Mission Create */
  {
    path: ROUTE_PATH.AboutusMission.CREATE,
    element: (
      <>
        <PageTitle title="Aboutus Mission Create" />
        <AboutusMissionCreatePage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* Aboutus Mission List */
  {
    path: ROUTE_PATH.AboutusMission.LIST,
    element: (
      <>
        <PageTitle title="Aboutus Mission List" />
        <GetMissionPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* Aboutus Mission Edit */
  {
    path: ROUTE_PATH.AboutusMission.EDIT,
    element: (
      <>
        <PageTitle title="Aboutus Mission Edit" />
        <EditMissionPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* Member Add */
  {
    path: ROUTE_PATH.AboutTeamMember.CREATE,
    element: (
      <>
        <PageTitle title="Aboutus Add Teammember" />
        <AddTeamMemberPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* Member List */
  {
    path: ROUTE_PATH.AboutTeamMember.LIST,
    element: (
      <>
        <PageTitle title="Our Teammember" />
        <GetAllMemberPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  /* Member Edit*/
  {
    path: ROUTE_PATH.AboutTeamMember.EDIT,
    element: (
      <>
        <PageTitle title="Our Teammember Edit" />
        <EditMemberPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  /* Add Leader*/
  {
    path: ROUTE_PATH.AboutLeader.CREATE,
    element: (
      <>
        <PageTitle title="Add leader" />
        <AddLeaderPage/>
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* List Leader*/
  {
    path: ROUTE_PATH.AboutLeader.LIST,
    element: (
      <>
        <PageTitle title="Lisr leader" />
        <GetAllLeaderPage/>
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* List Leader*/
  {
    path: ROUTE_PATH.AboutLeader.EDIT,
    element: (
      <>
        <PageTitle title="Edit Leader" />
        <EditLeaderPage/>
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  /* Contact Edit*/
  {
    path: ROUTE_PATH.Contactus.EDIT,
    element: (
      <>
        <PageTitle title="Contact Us Edit" />
        <EditContactUsPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  // home routes
  {
    path: ROUTE_PATH.HOME.EDIT,
    element: (
      <>
        <PageTitle title="Home Banner Info Edit" />
        <HomePageBannerInfoPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.HOME.TESTIMONIAL.LIST,
    element: (
      <>
        <PageTitle title="Testimonials" />
        <TestimonialPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.HOME.TESTIMONIAL.CREATE,
    element: (
      <>
        <PageTitle title="Create Testimonial" />
        <TestimonialCreatePage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.HOME.TESTIMONIAL.EDIT,
    element: (
      <>
        <PageTitle title="Edit Testimonial" />
        <TestimonialEditPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.HOME.FACILITIES.LIST,
    element: (
      <>
        <PageTitle title="Facilities" />
        <FacilitiePage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.HOME.FACILITIES.CREATE,
    element: (
      <>
        <PageTitle title="Create Facilitie" />
        <FacilitieCreatePage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.HOME.FACILITIES.EDIT,
    element: (
      <>
        <PageTitle title="Edit Facilitie" />
        <FacilitieEditPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  // request route
  {
    path: ROUTE_PATH.REQUEST,
    element: (
      <>
        <PageTitle title="User Request" />
        <RequestPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  // service routes

  {
    path: ROUTE_PATH.SERVICES.LIST,
    element: (
      <>
        <PageTitle title="Services" />
        <ServicePage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.SERVICES.CREATE,
    element: (
      <>
        <PageTitle title="Create Service" />
        <ServiceCreatePage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.SERVICES.EDIT,
    element: (
      <>
        <PageTitle title="Edit Service" />
        <ServiceEditPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },
  {
    path: ROUTE_PATH.SERVICES.BANNER,
    element: (
      <>
        <PageTitle title="Service Banner" />
        <ServiceBannerPage />
      </>
    ),
    access_type: ROUTE_ACCESS.PRIVATE,
  },

  // auth routes
  {
    path: ROUTE_PATH.LOGIN,
    element: (
      <>
        <PageTitle title="Login " />
        <LoginPage />
      </>
    ),
    access_type: ROUTE_ACCESS.AUTH,
  },
  {
    path: ROUTE_PATH.VERIFY,
    element: (
      <>
        {/* <PageTitle title="Veri" /> */}
        <VerifyPage />
      </>
    ),
    access_type: ROUTE_ACCESS.AUTH,
  },
  {
    path: ROUTE_PATH.RESET_PASSWORD,
    element: (
      <>
        <PageTitle title="Reset Password" />
        <ResetPasswordPage />
      </>
    ),
    access_type: ROUTE_ACCESS.AUTH,
  },
  {
    path: ROUTE_PATH.RESET_PASSWORD_VERIFY,
    element: (
      <>
        <PageTitle title="Reset Password Verify" />
        <ResetPasswordVerifyPage />
      </>
    ),
    access_type: ROUTE_ACCESS.AUTH,
  },
  // not found route
  {
    path: ROUTE_PATH.NOT_FOUND,
    element: <NotFoundPage />,
    access_type: ROUTE_ACCESS.PUBLIC,
  },
];
