export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  nextBirthdayInDays: number;
};

function parseLocalDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return date;
}

export function calculateAge(dateOfBirth: string, targetDate?: string): AgeResult | null {
  if (!dateOfBirth) {
    return null;
  }

  const dob = parseLocalDate(dateOfBirth);
  const endDate = targetDate ? parseLocalDate(targetDate) : new Date();

  if (!dob || !endDate || Number.isNaN(endDate.getTime()) || dob > endDate) {
    return null;
  }

  let years = endDate.getFullYear() - dob.getFullYear();
  let months = endDate.getMonth() - dob.getMonth();
  let days = endDate.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((endDate.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
  const nextBirthday = new Date(endDate.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < endDate) {
    nextBirthday.setFullYear(endDate.getFullYear() + 1);
  }

  return {
    years,
    months,
    days,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    nextBirthdayInDays: Math.ceil(
      (nextBirthday.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
  };
}

const indianUnits = [
  { value: 10_000_000, label: "crore" },
  { value: 100_000, label: "lakh" },
  { value: 1_000, label: "thousand" },
  { value: 100, label: "hundred" },
];

const baseWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const tensWords = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function convertHundreds(value: number): string {
  if (value < 20) {
    return baseWords[value];
  }

  if (value < 100) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return ones === 0 ? tensWords[tens] : `${tensWords[tens]} ${baseWords[ones]}`;
  }

  const hundreds = Math.floor(value / 100);
  const remainder = value % 100;
  return remainder === 0
    ? `${baseWords[hundreds]} hundred`
    : `${baseWords[hundreds]} hundred ${convertHundreds(remainder)}`;
}

function numberToWordsWhole(value: number): string {
  if (value === 0) {
    return "zero";
  }

  let remaining = value;
  const parts: string[] = [];

  for (const unit of indianUnits) {
    if (remaining >= unit.value) {
      const count = Math.floor(remaining / unit.value);
      remaining %= unit.value;
      parts.push(`${numberToWordsWhole(count)} ${unit.label}`);
    }
  }

  if (remaining > 0) {
    parts.push(convertHundreds(remaining));
  }

  return parts.join(" ").trim();
}

export function convertNumberToIndianWords(value: number) {
  const safeValue = Math.max(0, Number.isFinite(value) ? value : 0);
  const roundedToPaise = Math.round(safeValue * 100) / 100;
  let whole = Math.floor(roundedToPaise);
  let paise = Math.round((roundedToPaise - whole) * 100);

  if (paise === 100) {
    whole += 1;
    paise = 0;
  }

  const words = numberToWordsWhole(whole);
  const paiseWords = paise > 0 ? numberToWordsWhole(paise) : "zero";

  return {
    words,
    rupeePhrase:
      paise > 0 ? `${words} rupees and ${paiseWords} paise only` : `${words} rupees only`,
  };
}

const landAreaUnits: Record<string, number> = {
  "sq-ft": 1,
  "sq-m": 10.7639,
  acre: 43_560,
  hectare: 107_639,
  bigha: 27_000,
  gunta: 1_089,
  "sq-yard": 9,
};

export function convertLandArea(value: number, fromUnit: string, toUnit: string) {
  const safeValue = Math.max(0, Number.isFinite(value) ? value : 0);
  const fromFactor = landAreaUnits[fromUnit] ?? 1;
  const toFactor = landAreaUnits[toUnit] ?? 1;
  const inSquareFeet = safeValue * fromFactor;

  return {
    convertedValue: inSquareFeet / toFactor,
    equivalents: {
      acre: inSquareFeet / landAreaUnits.acre,
      hectare: inSquareFeet / landAreaUnits.hectare,
      bigha: inSquareFeet / landAreaUnits.bigha,
      gunta: inSquareFeet / landAreaUnits.gunta,
      "sq-ft": inSquareFeet,
    },
  };
}

export type PercentageMode =
  | "percent-of-number"
  | "number-is-what-percent"
  | "percentage-change"
  | "percentage-increase"
  | "marks-percentage"
  | "fraction-to-percentage";

export function calculatePercentageMode(mode: PercentageMode, a: number, b: number) {
  const safeA = Number.isFinite(a) ? a : 0;
  const safeB = Number.isFinite(b) ? b : 0;

  switch (mode) {
    case "percent-of-number":
      return (safeA / 100) * safeB;
    case "number-is-what-percent":
      return safeB === 0 ? 0 : (safeA / safeB) * 100;
    case "percentage-change":
    case "percentage-increase":
      return safeA === 0 ? 0 : ((safeB - safeA) / safeA) * 100;
    case "marks-percentage":
      return safeB === 0 ? 0 : (safeA / safeB) * 100;
    case "fraction-to-percentage":
      return safeB === 0 ? 0 : (safeA / safeB) * 100;
    default:
      return 0;
  }
}
