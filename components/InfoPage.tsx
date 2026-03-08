import Link from "next/link";

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
  footerNote,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    items?: string[];
  }>;
  footerNote?: React.ReactNode;
}) {
  return (
    <div className="page-stack">
      <section className="directory-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-text">{intro}</p>
      </section>

      <section className="content-card prose-card">
        {sections.map((section) => (
          <section className="info-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items ? (
              <ul className="feature-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {footerNote ? <div className="info-footer-note">{footerNote}</div> : null}
      </section>

      <section className="directory-section">
        <div className="section-heading">
          <h2>Useful links</h2>
          <p className="muted">Keep key pages easy to find.</p>
        </div>
        <div className="related-links">
          <Link className="text-link related-link" href="/">
            Home
          </Link>
          <Link className="text-link related-link" href="/tools/salary-calculator">
            Salary calculator
          </Link>
          <Link className="text-link related-link" href="/tools/income-tax-calculator">
            Income tax calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
