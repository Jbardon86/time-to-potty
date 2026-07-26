/*
  TIME TO POTTY — CENTRALIZED PRODUCT DATA
  Edit values in this file to update product specs, pricing, shipping,
  and policy copy across the entire site. Fields marked PLACEHOLDER
  should be confirmed/replaced before launch.
*/
const PRODUCT_DATA = {
  name: "Time to Potty Music Button",
  brand: "Time to Potty",
  tagline: "Make Potty Time Fun",
  price: 24.99, // PLACEHOLDER — confirm final retail price
  currency: "USD",
  compareAtPrice: null, // e.g. 29.99 to show a strikethrough price, or null
  musicDuration: "30–60 seconds",
  ageRange: "Best for children ages 2–7",
  batteries: "Requires 3 x AAA batteries — PLACEHOLDER: confirm battery count and whether included before launch",
  waterproof: false,
  waterproofNote: "Time to Potty is not waterproof. Keep it away from water and direct splashes, and clean it with a dry or slightly damp cloth only.",
  nonSlipBase: false, // set true only if confirmed on final production unit
  dimensions: {
    overallDiameterMm: 89.25,
    buttonDiameterMm: 71.21,
    heightMm: 41.5,
    note: "All dimensions are approximate and based on current product drawings."
  },
  shipping: "PLACEHOLDER: Free standard shipping on orders over $35. Orders ship within 1–2 business days.",
  returns: "PLACEHOLDER: 30-day return window on unused, unopened items. See Returns page for full details.",
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
    facebook: "https://facebook.com/timetopotty"
  }
};
