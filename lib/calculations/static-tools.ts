export type SellerMarketplace = "amazon" | "flipkart";
export type SellerCategory = "fashion" | "beauty" | "electronics" | "home";
export type FulfilmentMode = "seller-fulfilled" | "easy-ship" | "fba";
export type ShippingBand = "local" | "regional" | "national";

const sellerFeeData: Record<
  SellerMarketplace,
  Record<
    SellerCategory,
    {
      referralRate: number;
      closingFee: Array<{ upto: number; fee: number }>;
      shippingFee: Record<FulfilmentMode, Record<ShippingBand, number>>;
    }
  >
> = {
  amazon: {
    fashion: {
      referralRate: 17,
      closingFee: [{ upto: 500, fee: 20 }, { upto: 1000, fee: 35 }, { upto: Infinity, fee: 50 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 38, regional: 52, national: 68 },
        fba: { local: 42, regional: 58, national: 76 },
      },
    },
    beauty: {
      referralRate: 14,
      closingFee: [{ upto: 500, fee: 18 }, { upto: 1000, fee: 30 }, { upto: Infinity, fee: 46 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 40, regional: 54, national: 72 },
        fba: { local: 46, regional: 62, national: 80 },
      },
    },
    electronics: {
      referralRate: 9,
      closingFee: [{ upto: 500, fee: 20 }, { upto: 1000, fee: 32 }, { upto: Infinity, fee: 48 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 55, regional: 74, national: 95 },
        fba: { local: 60, regional: 78, national: 102 },
      },
    },
    home: {
      referralRate: 13,
      closingFee: [{ upto: 500, fee: 18 }, { upto: 1000, fee: 30 }, { upto: Infinity, fee: 46 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 44, regional: 58, national: 78 },
        fba: { local: 48, regional: 64, national: 84 },
      },
    },
  },
  flipkart: {
    fashion: {
      referralRate: 18,
      closingFee: [{ upto: 500, fee: 19 }, { upto: 1000, fee: 34 }, { upto: Infinity, fee: 48 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 36, regional: 50, national: 66 },
        fba: { local: 40, regional: 56, national: 74 },
      },
    },
    beauty: {
      referralRate: 15,
      closingFee: [{ upto: 500, fee: 18 }, { upto: 1000, fee: 30 }, { upto: Infinity, fee: 42 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 38, regional: 52, national: 70 },
        fba: { local: 42, regional: 58, national: 76 },
      },
    },
    electronics: {
      referralRate: 10,
      closingFee: [{ upto: 500, fee: 21 }, { upto: 1000, fee: 33 }, { upto: Infinity, fee: 45 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 54, regional: 72, national: 94 },
        fba: { local: 58, regional: 76, national: 98 },
      },
    },
    home: {
      referralRate: 14,
      closingFee: [{ upto: 500, fee: 18 }, { upto: 1000, fee: 30 }, { upto: Infinity, fee: 44 }],
      shippingFee: {
        "seller-fulfilled": { local: 0, regional: 0, national: 0 },
        "easy-ship": { local: 42, regional: 56, national: 74 },
        fba: { local: 46, regional: 60, national: 80 },
      },
    },
  },
};

export function calculateSellerFees(input: {
  marketplace: SellerMarketplace;
  category: SellerCategory;
  fulfilmentMode: FulfilmentMode;
  shippingBand: ShippingBand;
  sellingPrice: number;
}) {
  const safeSellingPrice = Math.max(0, Number.isFinite(input.sellingPrice) ? input.sellingPrice : 0);
  const config = sellerFeeData[input.marketplace][input.category];
  const referralFee = safeSellingPrice * (config.referralRate / 100);
  const closingFee =
    config.closingFee.find((band) => safeSellingPrice <= band.upto)?.fee ??
    config.closingFee[config.closingFee.length - 1].fee;
  const shippingFee = config.shippingFee[input.fulfilmentMode][input.shippingBand];
  const totalFees = Math.round(referralFee + closingFee + shippingFee);

  return {
    referralFee: Math.round(referralFee),
    closingFee,
    shippingFee,
    totalFees,
    netProceeds: Math.max(0, Math.round(safeSellingPrice - totalFees)),
    assumptions: [
      "Marketplace fees use a simplified static rate table for quick planning.",
      "GST on marketplace service fees, ads, returns, and storage charges are excluded.",
    ],
  };
}

const stampDutyData = {
  delhi: {
    male: { stampRate: 6, registrationRate: 1 },
    female: { stampRate: 4, registrationRate: 1 },
    joint: { stampRate: 5, registrationRate: 1 },
  },
  maharashtra: {
    male: { stampRate: 5, registrationRate: 1 },
    female: { stampRate: 5, registrationRate: 1 },
    joint: { stampRate: 5, registrationRate: 1 },
  },
  karnataka: {
    male: { stampRate: 5, registrationRate: 1 },
    female: { stampRate: 5, registrationRate: 1 },
    joint: { stampRate: 5, registrationRate: 1 },
  },
  "tamil-nadu": {
    male: { stampRate: 7, registrationRate: 4 },
    female: { stampRate: 7, registrationRate: 4 },
    joint: { stampRate: 7, registrationRate: 4 },
  },
} as const;

export function calculateStampDuty(input: {
  state: keyof typeof stampDutyData;
  buyerProfile: keyof (typeof stampDutyData)["delhi"];
  propertyValue: number;
}) {
  const safeValue = Math.max(0, Number.isFinite(input.propertyValue) ? input.propertyValue : 0);
  const config = stampDutyData[input.state][input.buyerProfile];
  const stampDuty = Math.round(safeValue * config.stampRate / 100);
  const registrationFee = Math.round(safeValue * config.registrationRate / 100);

  return {
    stampDuty,
    registrationFee,
    totalUpfrontCost: stampDuty + registrationFee,
    assumptions: [
      "This estimate uses a simplified state-level rate table for common residential transactions.",
      "Cess, metro surcharge, rural concessions, and ready-reckoner adjustments are not included.",
    ],
  };
}

const electricityRateData = {
  delhi: {
    domestic: [
      { upto: 200, rate: 3 },
      { upto: 400, rate: 4.5 },
      { upto: 800, rate: 6.5 },
      { upto: Infinity, rate: 7 },
    ],
    commercial: [
      { upto: 200, rate: 6.5 },
      { upto: 800, rate: 8 },
      { upto: Infinity, rate: 8.5 },
    ],
  },
  maharashtra: {
    domestic: [
      { upto: 100, rate: 4.4 },
      { upto: 300, rate: 9.7 },
      { upto: 500, rate: 13 },
      { upto: Infinity, rate: 14.5 },
    ],
    commercial: [
      { upto: 100, rate: 10 },
      { upto: 300, rate: 12.5 },
      { upto: Infinity, rate: 14.5 },
    ],
  },
  karnataka: {
    domestic: [
      { upto: 50, rate: 4.15 },
      { upto: 100, rate: 5.6 },
      { upto: 200, rate: 7.15 },
      { upto: Infinity, rate: 8.2 },
    ],
    commercial: [
      { upto: 100, rate: 8 },
      { upto: 300, rate: 8.8 },
      { upto: Infinity, rate: 9.5 },
    ],
  },
  "tamil-nadu": {
    domestic: [
      { upto: 100, rate: 0 },
      { upto: 200, rate: 2.25 },
      { upto: 400, rate: 4.5 },
      { upto: 500, rate: 6 },
      { upto: Infinity, rate: 8.75 },
    ],
    commercial: [
      { upto: 100, rate: 8.4 },
      { upto: 500, rate: 9.2 },
      { upto: Infinity, rate: 9.8 },
    ],
  },
} as const;

export function calculateElectricityBill(input: {
  state: keyof typeof electricityRateData;
  consumerType: keyof (typeof electricityRateData)["delhi"];
  units: number;
}) {
  const safeUnits = Math.max(0, Math.floor(input.units));
  const slabs = electricityRateData[input.state][input.consumerType];
  let previousUpto = 0;
  let remaining = safeUnits;
  const breakdown: Array<{ label: string; units: number; amount: number }> = [];
  let total = 0;

  for (const slab of slabs) {
    if (remaining <= 0) {
      break;
    }

    const slabLimit = slab.upto === Infinity ? remaining : Math.max(0, slab.upto - previousUpto);
    const slabUnits = Math.min(remaining, slabLimit);
    const amount = slabUnits * slab.rate;
    breakdown.push({
      label: slab.upto === Infinity ? `${previousUpto + 1}+ units` : `${previousUpto + 1}-${slab.upto} units`,
      units: slabUnits,
      amount: Math.round(amount),
    });
    total += amount;
    remaining -= slabUnits;
    previousUpto = slab.upto === Infinity ? previousUpto + slabUnits : slab.upto;
  }

  return {
    total: Math.round(total),
    breakdown,
    assumptions: [
      "This bill estimate uses a simplified energy-charge slab model for the selected state and consumer type.",
      "Fixed charges, subsidies, fuel adjustments, and taxes are excluded.",
    ],
  };
}
