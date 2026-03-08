"use client";

import { useMemo, useState } from "react";
import { calculateAge } from "@/lib/calculations/utility";
import {
  DateField,
  FieldHint,
  PrimaryResultCard,
  ResultNotice,
  StatCard,
} from "@/components/tools/shared";

export function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState("1995-06-12");
  const [targetDate, setTargetDate] = useState("");
  const result = useMemo(() => calculateAge(dateOfBirth, targetDate || undefined), [dateOfBirth, targetDate]);

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Age on a specific date"
          text="Enter a date of birth, and optionally a target date, to see the exact age breakdown."
        />
        <div className="field-grid">
          <DateField id="dob" label="Date of birth" value={dateOfBirth} onChange={setDateOfBirth} />
          <DateField
            id="target-date"
            label="Age on date (optional)"
            value={targetDate}
            onChange={setTargetDate}
          />
        </div>
      </section>

      {result ? (
        <>
          <PrimaryResultCard
            caption={`Next birthday in ${result.nextBirthdayInDays} day${result.nextBirthdayInDays === 1 ? "" : "s"}`}
            highlights={[
              { label: "Total months", value: String(result.totalMonths) },
              { label: "Total days", value: String(result.totalDays) },
            ]}
            label="Current age"
            value={`${result.years}y ${result.months}m ${result.days}d`}
          />
          <div className="result-grid">
            <StatCard label="Total weeks" value={String(result.totalWeeks)} />
            <StatCard label="Voting / DL age check" value={result.years >= 18 ? "Eligible" : "Below 18"} />
            <StatCard label="Senior-citizen threshold" value={result.years >= 60 ? "60+ reached" : "Below 60"} />
          </div>
        </>
      ) : (
        <ResultNotice>Enter a valid date of birth and make sure the target date is not earlier.</ResultNotice>
      )}
    </div>
  );
}
