"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import {
  DownloadButton,
  exportNodeAsPdf,
  FieldHint,
  FileField,
  InlinePreviewCard,
  TextAreaField,
  TextField,
} from "@/components/tools/shared";

export function MarriageBiodataMaker() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("Aarav Sharma");
  const [age, setAge] = useState("29");
  const [height, setHeight] = useState("5'10\"");
  const [education, setEducation] = useState("B.Tech, MBA");
  const [profession, setProfession] = useState("Product Manager");
  const [family, setFamily] = useState("Family based in Delhi. Father runs a business, mother is a homemaker.");
  const [about, setAbout] = useState("Calm, family-oriented, and values a balanced modern lifestyle.");
  const [photoUrl, setPhotoUrl] = useState("");
  const canDownload =
    name.trim().length > 0 &&
    age.trim().length > 0 &&
    education.trim().length > 0 &&
    profession.trim().length > 0;

  return (
    <div className="tool-body">
      <section className="tool-panel card">
        <FieldHint
          title="Create a simple marriage biodata"
          text="Fill the profile and download a clean one-page biodata PDF."
        />
        <div className="field-grid">
          <TextField id="biodata-name" label="Full name" value={name} onChange={setName} />
          <TextField id="biodata-age" label="Age" value={age} onChange={setAge} />
          <TextField id="biodata-height" label="Height" value={height} onChange={setHeight} />
          <TextField id="biodata-education" label="Education" value={education} onChange={setEducation} />
          <TextField id="biodata-profession" label="Profession" value={profession} onChange={setProfession} />
          <FileField
            accept="image/*"
            id="biodata-photo"
            label="Photo (optional)"
            onChange={(file) => {
              if (!file) {
                setPhotoUrl("");
                return;
              }

              const reader = new FileReader();
              reader.onload = () => setPhotoUrl(String(reader.result || ""));
              reader.readAsDataURL(file);
            }}
          />
        </div>
        <TextAreaField id="biodata-about" label="About" rows={3} value={about} onChange={setAbout} />
        <TextAreaField id="biodata-family" label="Family details" rows={3} value={family} onChange={setFamily} />
      </section>

      <InlinePreviewCard subtitle="Preview first, then download a one-page biodata." title="Biodata preview">
        <div className="preview-sheet" ref={previewRef}>
          <div className="preview-sheet-grid">
            <div>
              <h3>{name}</h3>
              <p>Age: {age}</p>
              <p>Height: {height}</p>
              <p>Education: {education}</p>
              <p>Profession: {profession}</p>
            </div>
            {photoUrl ? <img alt={name} src={photoUrl} style={{ maxWidth: 140, width: "100%" }} /> : null}
          </div>
          <div>
            <strong>About</strong>
            <p>{about}</p>
          </div>
          <div>
            <strong>Family</strong>
            <p>{family}</p>
          </div>
        </div>
        <DownloadButton
          disabled={!canDownload}
          label="Download biodata PDF"
          onDownload={() => previewRef.current && exportNodeAsPdf({ node: previewRef.current, filename: "marriage-biodata.pdf" })}
        />
      </InlinePreviewCard>
    </div>
  );
}
