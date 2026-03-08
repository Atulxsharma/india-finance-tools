import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { AmazonSellerFeeCalculator } from "@/components/tools/AmazonSellerFeeCalculator";
import { CagrCalculator } from "@/components/tools/CagrCalculator";
import { EmiCalculator } from "@/components/tools/EmiCalculator";
import { ElectricityBillCalculator } from "@/components/tools/ElectricityBillCalculator";
import { EpfCalculator } from "@/components/tools/EpfCalculator";
import { FdCalculator } from "@/components/tools/FdCalculator";
import { FlatVsReducingRateConverter } from "@/components/tools/FlatVsReducingRateConverter";
import { FlipkartSellerFeeCalculator } from "@/components/tools/FlipkartSellerFeeCalculator";
import { FuelCostCalculator } from "@/components/tools/FuelCostCalculator";
import { GstInvoiceGenerator } from "@/components/tools/GstInvoiceGenerator";
import { GstCalculator } from "@/components/tools/GstCalculator";
import { GratuityCalculator } from "@/components/tools/GratuityCalculator";
import { HraCalculator } from "@/components/tools/HraCalculator";
import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";
import { LandAreaConverter } from "@/components/tools/LandAreaConverter";
import { LumpSumCalculator } from "@/components/tools/LumpSumCalculator";
import { MarriageBiodataMaker } from "@/components/tools/MarriageBiodataMaker";
import { NpsCalculator } from "@/components/tools/NpsCalculator";
import { NumberToWordsCalculator } from "@/components/tools/NumberToWordsCalculator";
import { PercentageCalculator } from "@/components/tools/PercentageCalculator";
import { PpfCalculator } from "@/components/tools/PpfCalculator";
import { RentReceiptGenerator } from "@/components/tools/RentReceiptGenerator";
import { SalaryCalculator } from "@/components/tools/SalaryCalculator";
import { SalarySlipGenerator } from "@/components/tools/SalarySlipGenerator";
import { SimpleInterestCalculator } from "@/components/tools/SimpleInterestCalculator";
import { SipCalculator } from "@/components/tools/SipCalculator";
import { StampDutyCalculator } from "@/components/tools/StampDutyCalculator";
import { SwpCalculator } from "@/components/tools/SwpCalculator";
import { UpiQrGenerator } from "@/components/tools/UpiQrGenerator";

export const toolComponentRegistry = {
  "age-calculator": AgeCalculator,
  "amazon-seller-fee-calculator": AmazonSellerFeeCalculator,
  "cagr-calculator": CagrCalculator,
  "electricity-bill-calculator": ElectricityBillCalculator,
  "epf-calculator": EpfCalculator,
  "salary-calculator": SalaryCalculator,
  "flat-vs-reducing-rate-converter": FlatVsReducingRateConverter,
  "flipkart-seller-fee-calculator": FlipkartSellerFeeCalculator,
  "gst-calculator": GstCalculator,
  "fuel-cost-calculator": FuelCostCalculator,
  "gst-invoice-generator": GstInvoiceGenerator,
  "hra-calculator": HraCalculator,
  "emi-calculator": EmiCalculator,
  "sip-calculator": SipCalculator,
  "income-tax-calculator": IncomeTaxCalculator,
  "land-area-converter": LandAreaConverter,
  "lump-sum-calculator": LumpSumCalculator,
  "marriage-biodata-maker": MarriageBiodataMaker,
  "nps-calculator": NpsCalculator,
  "number-to-words": NumberToWordsCalculator,
  "percentage-calculator": PercentageCalculator,
  "ppf-calculator": PpfCalculator,
  "fd-calculator": FdCalculator,
  "gratuity-calculator": GratuityCalculator,
  "rent-receipt-generator": RentReceiptGenerator,
  "salary-slip-generator": SalarySlipGenerator,
  "simple-interest-calculator": SimpleInterestCalculator,
  "stamp-duty-calculator": StampDutyCalculator,
  "swp-calculator": SwpCalculator,
  "upi-qr-generator": UpiQrGenerator,
} as const;

export type ToolRegistrySlug = keyof typeof toolComponentRegistry;
