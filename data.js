/*
  TIME TO POTTY — CENTRALIZED PRODUCT DATA
  Edit values in this file to update product specs, pricing, campaign links,
  and policy copy across the entire site. Fields marked PLACEHOLDER
  should be confirmed/replaced before launch.

  Updated to match the approved Kickstarter campaign.
*/
const PRODUCT_DATA = {
  name: "Time to Potty Music Button",
  brand: "Time to Potty",
  tagline: "Helping kids build healthy habits with music, fun, and routine.",

  // PRICING — matches Kickstarter campaign
  price: 19.99,              // retail price
  kickstarterPrice: 16,      // "One Button" backer tier
  currency: "USD",
  compareAtPrice: null,

  // AUDIO
  recordingLength: "up to 90 seconds",
  preloadedSongs: "Original songs, written for this and nothing else, preloaded on every button.",
  songDownload: "Every backer gets a free download of all our original songs, so you can put one back on the button any time.",

  ageRange: "Best for children ages 2–7",

  // POWER — AA cells, supplied by the customer.
  // NOTE: Reese's Law governs button/coin cells only, so it does not apply
  // to this product. If the cell type ever changes to coin cells, a secured
  // compartment and specific warning labelling become mandatory.
  batteries: "Time to Potty runs on AA batteries, which are not included. Pop them in, flip the switch on the back, and it's ready to use.",

  waterproof: false,
  waterproofNote: "Time to Potty is not waterproof, but it is built to be cleaned. The housing is a sealed shell with no fabric and no crevices to trap moisture, so it wipes down with a disinfecting wipe in about three seconds. Keep it out of direct water and away from splashes.",

  nonSlipBase: false,
  dimensions: {
    overallDiameterMm: 89.25,
    buttonDiameterMm: 71.21,
    heightMm: 41.5,
    note: "All dimensions are approximate and based on current product drawings."
  },

  // CAMPAIGN
  kickstarter: {
    // Swap `url` for the pre-launch "Notify me on launch" URL now, then for
    // the live project URL on launch day.
    url: "https://www.kickstarter.com/projects/timetopotty/time-to-potty",
    // Set to true on launch day. When false, the site shows a
    // "launching soon" note instead of sending people to a dead page.
    isLive: false,
    goal: "$25,000",
    days: 30,
    estimatedDelivery: "February 2027"
  },

  // RETAIL RESERVATIONS (pre-orders, no charge taken)
  // Nothing is charged at reserve time. Reserved units ship AFTER Kickstarter
  // backer rewards, which keeps the campaign's "months before anyone else"
  // promise true and avoids holding customer money for months.
  reserve: {
    enabled: true,
    // Paste a form endpoint here (Formspree, Mailchimp, Klaviyo, Google Form).
    // While this is empty the form falls back to opening the visitor's email
    // client addressed to fallbackEmail, so no reservation is ever lost.
    endpoint: "",
    fallbackEmail: "ttopotty@gmail.com",
    shipWindow: "Spring 2027",
    note: "Nothing is charged today. We'll email you when reserved units are ready, and you pay then. Kickstarter backers ship first."
  },

  shipping: "Backer rewards are estimated to ship February 2027. Shipping is calculated at the pledge stage on Kickstarter.",
  returns: "Kickstarter pledges are governed by Kickstarter's terms. Retail return policy will be published when the store opens.",
  warranty: "PLACEHOLDER: Confirm manufacturer warranty terms before launch.",

  appRequired: false,

  images: {
    hero: "time-to-potty-hero.jpg",
    productFront: "time-to-potty-product-front.jpg",
    bathroomLifestyle: "time-to-potty-bathroom-lifestyle.jpg",
    closeup: "time-to-potty-product-front.jpg"
  },

  social: {
    tiktok: "https://tiktok.com/@timetopotty",
    instagram: "https://instagram.com/timetopotty",
    facebook: "https://facebook.com/TimeToPottyButton"
  }
};
