import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
} from "@heroicons/vue/24/outline";

export const navigation = [
  {
    i18nKey: "layout.navigation.home",
    path: "/",
    icon: HomeIcon,
  },
  {
    i18nKey: "layout.navigation.about",
    path: "/about",
    icon: UserIcon,
  },
  {
    i18nKey: "layout.navigation.projects",
    path: "/projects",
    icon: BriefcaseIcon,
  },
  {
    i18nKey: "layout.navigation.contact",
    path: "/contact",
    icon: EnvelopeIcon,
  },
];
