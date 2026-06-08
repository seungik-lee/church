import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Offering } from "./pages/Offering";
import { Directory } from "./pages/Directory";
import { QT } from "./pages/QT";
import { Bulletin } from "./pages/Bulletin";
import { Groups } from "./pages/Groups";
import { PrayerWall } from "./pages/PrayerWall";
import { MemberCard } from "./pages/MemberCard";
import { Sermon } from "./pages/Sermon";
import { More } from "./pages/More";
import { MyChurch } from "./pages/MyChurch";
import { Community } from "./pages/Community";
import { Attend } from "./pages/Attend";
import { Notice } from "./pages/Notice";
import { Notifications } from "./pages/Notifications";
import { NotificationSettings } from "./pages/NotificationSettings";
import { OfferingPayment } from "./pages/OfferingPayment";
import { QrScan } from "./pages/QrScan";
import { WorshipInfo } from "./pages/WorshipInfo";
import { Newcomer } from "./pages/Newcomer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "offering", Component: Offering },
      { path: "offering/payment/:type", Component: OfferingPayment },
      { path: "qt", Component: QT },
      { path: "bulletin", Component: Bulletin },
      { path: "more", Component: More },
      { path: "directory", Component: Directory },
      { path: "groups", Component: Groups },
      { path: "prayer", Component: PrayerWall },
      { path: "member-card", Component: MemberCard },
      { path: "sermon", Component: Sermon },
      { path: "my-church", Component: MyChurch },
      { path: "cells", Component: Groups },
      { path: "community", Component: Community },
      { path: "attend", Component: Attend },
      { path: "notice", Component: Notice },
      { path: "notifications", Component: Notifications },
      { path: "settings/notifications", Component: NotificationSettings },
      { path: "qr-scan", Component: QrScan },
      { path: "worship-info", Component: WorshipInfo },
      { path: "newcomer", Component: Newcomer },
    ],
  },
]);