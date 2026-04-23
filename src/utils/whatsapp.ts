import { WA_NUMBER } from './constants.js';

const waBase = `https://wa.me/${WA_NUMBER}`;

export const buildGeneralLink = (msg: string) => msg ? `${waBase}?text=${encodeURIComponent(msg)}` : waBase;

export const buildLeadLink = (phone: string, name: string) => 
  `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${name}! This is Trustar Tech Institute following up on your enquiry. Are you available to chat?`)}`;

export const buildCohortJoinLink = (cohortName: string) => 
  `${waBase}?text=${encodeURIComponent(`Hello! I'd like to join the ${cohortName}. Please send me the enrolment details.`)}`;

export const buildTopUpLink = () => 
  `${waBase}?text=${encodeURIComponent(`Hello! I'd like to top up my Trustar coin wallet. Please guide me.`)}`;

export const buildLandingLeadMessage = (form: any) => 
  `${waBase}?text=${encodeURIComponent(`Hello! I submitted an enquiry on the Trustar website.\n\nName: ${form.name}\nCountry: ${form.country}\nChild age / Self: ${form.childAge}\nInterested in: ${form.interestedTrack}\n\n${form.message || ''}`)}`;
