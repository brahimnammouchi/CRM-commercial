import Dashboard from "views/Dashboard.js";
import AppelTel from "views/AppelTel.js";
import ActionComm from "views/ActionComm.js";
import data from "views/data.js";
import Maps from "views/Maps.js";
import Login from "views/login"
import Notifications from "views/Notifications.js";
import RendezVous from "views/RendezVous";
import Opportinite from "./views/opportinite"
import Reclamtion from "./views/Reclamation"
import EmailCompaign from "views/EmailCampaign";

//import activite from "views/Activités/activite.js"
import { FcOnlineSupport } from 'react-icons/fa';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/AppelTel",
    name: "Appel Téléphonique",
    icon: "nc-icon nc-notes",
    component: AppelTel,
    layout: "/admin",
  },
  {
    upgrade: true,
    path: "/RendezVous",
    name: "Rendez-vous",
    icon: "nc-icon nc-time-alarm",
    component: RendezVous,
    layout: "/admin",
  },
  {
    path: "/opportinite",
    name: "Opportunité",
    icon: "nc-icon nc-circle-09",
    component:Opportinite,
    layout: "/admin",
  },
  {
    path: "/ActionComm",
    name: "Action Commerciale",
    component: ActionComm,
    layout: "/admin",
  },
  
  {
    path: "/Recalmation",
    name: "Gestion des Réclamations",
    component: Reclamtion,
    layout: "/admin",

  },
  

  {
    path: "/Data",
    name: "Importation des données",
    //icon: "nc-icon nc-atom",
    component: data,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Actions Marketing",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
   {
     path: "/Emailcompaign",
     name: "Compagne emails",
     icon: "nc-icon nc-paper-2",
     component: EmailCompaign,
     layout: "/admin",
   },
];

export default dashboardRoutes;
