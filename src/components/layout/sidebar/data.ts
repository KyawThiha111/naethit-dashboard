import { ROUTE_PATH } from "@/constants/route";
import {
  BriefcaseBusiness,
  // CalendarCheck,
  // File,
  Home,
  Inbox,
  // LaptopMinimal,
  // Layers2,
  Notebook,
  ReceiptText,
  Settings,
  CircleUserRound,
  CircleUser
  // Ticket,
  // Trash,
  // UserCog,
} from "lucide-react";

// Menu items.

export const applicationMenuItems = [
  // {
  //   title: "Home",
  //   url: "#",
  //   icon: Home,
  //   items: [
  //     {
  //       title: "Forms",
  //       url: "#",
  //     },
  //     {
  //       title: "Inputs",
  //       url: "#",
  //     },
  //     {
  //       title: "Datas",
  //       url: "#",
  //       items: [
  //         {
  //           title: "All",
  //           url: "#",
  //         },
  //         {
  //           title: "Filters",
  //           url: "#",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
   {
    title:"Admins",
    url:ROUTE_PATH.ADMINS.GET,
    icon:CircleUserRound
  },
   {
    title:"Create Admin",
    url:ROUTE_PATH.ADMINS.CREATE,
    icon:CircleUser
  },
  {
    title: "Requests",
    url: ROUTE_PATH.REQUEST,
    icon: Inbox,
  },
  {
    title: "Contact",
    url: "#",
    icon: ReceiptText,
  },
];

export const controlMenuItems = [
  // {
  //   title: "",
  //   url: "#",
  //   icon: UserCog,
  // },
  {
    title: "Home",
    url: "#",
    icon: Notebook,
    items: [
      {
        title: "Banner Info",
        url: ROUTE_PATH.HOME.EDIT,
      },
      {
        title: "Facilities",
        url: "#",
        items: [
          {
            title: "List",
            url: ROUTE_PATH.HOME.FACILITIES.LIST,
          },
          {
            title: "create",
            url: ROUTE_PATH.HOME.FACILITIES.CREATE,
          },
        ],
      },
      {
        title: "Testimonials",
        url: "#",
        items: [
          {
            title: "List",
            url: ROUTE_PATH.HOME.TESTIMONIAL.LIST,
          },
          {
            title: "create",
            url: ROUTE_PATH.HOME.TESTIMONIAL.CREATE,
          },
        ],
      },
    ],
  },
  {
    title: "Contact Us",
    url: "#",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Edit Contact Data",
        url: ROUTE_PATH.Contactus.EDIT,
      },
    ],
  },
  {
    title: "Blogs",
    url: "#",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "List",
        url: ROUTE_PATH.BLOG.LIST,
      },
      {
        title: "Create",
        url: ROUTE_PATH.BLOG.CREATE,
      },
      {
        title: "Categories",
        url: "#",
        items: [
          {
            title: "Create Cata",
            url: ROUTE_PATH.BLOG.Cata.CREATE,
          },
          {
            title: "Filters",
            url: "#",
          },
        ],
      },
    ],
  },
  /* Aboutus */
  {
    title: "About us",
    url: "#",
    icon: Notebook,
    items: [
      {
        title: "Aboutus Banner",
        url: ROUTE_PATH.ABOUTUSBANNER.EDIT,
      },
      {
        title: "Create Mission",
        url: ROUTE_PATH.AboutusMission.CREATE,
      },
      {
        title: " Mission List",
        url: ROUTE_PATH.AboutusMission.LIST,
      },
      {
        title: "Add Team Member",
        url: ROUTE_PATH.AboutTeamMember.CREATE,
      },
      {
        title: "Team Members List",
        url: ROUTE_PATH.AboutTeamMember.LIST,
      },
      {
        title: "Add Leader",
        url: ROUTE_PATH.AboutLeader.CREATE,
      },
      {
        title: "Leader List",
        url: ROUTE_PATH.AboutLeader.LIST,
      },
    ],
  },
  {
    title: "Services",
    url: "#",
    icon: Notebook,
    items: [
      {
        title: "List",
        url: ROUTE_PATH.SERVICES.LIST,
      },
      {
        title: "Create",
        url: ROUTE_PATH.SERVICES.CREATE,
      },
      {
        title: "Banner",
        url: ROUTE_PATH.SERVICES.BANNER,
      },
    ],
  },

  // {
  //   title: "Socials",
  //   url: "#",
  //   icon: File,
  // },
  // {
  //   title: "Services",
  //   url: "#",
  //   icon: LaptopMinimal,
  // },
  // {
  //   title: "Events",
  //   url: "#",
  //   icon: Ticket,
  // },
  // {
  //   title: "Holidays",
  //   url: "#",
  //   icon: CalendarCheck,
  // },
  // {
  //   title: "Assets",
  //   url: "#",
  //   icon: Layers2,
  // },
];

export const supportMenuItems = [
  // {
  //   title: "Translation",
  //   url: "#",
  //   icon: Trash,
  // },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
