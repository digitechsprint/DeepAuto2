"use client";

import Link from "next/link";
import { useState } from "react";
import { plants } from "@/lib/site-config";

type FormKind = "rfq" | "contact" | "apply";

const details: Record<FormKind, { kicker: string; title: string; intro: string; submit: string }> = {
  rfq: {
    kicker: "Request for Quote",
    title: "Tell us about your part",
    intro: "Share part details, quantity and drawings. Every RFQ gets a reference number and a response from our sales engineering team.",
    submit: "Submit RFQ",
  },
  contact: {
    kicker: "Send a message",
    title: "How can we help?",
    intro: "Tell us about your enquiry and the right person on our team will get back to you.",
    submit: "Send message",
  },
  apply: {
    kicker: "Application",
    title: "Apply for this role",
    intro: "Fill in your details and attach your CV. Our HR team reviews every application.",
    submit: "Submit application",
  },
};

export function EnquiryForm({ kind = "rfq", product = "", job = "" }: { kind?: FormKind; product?: string; job?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const c = details[kind];

  if (submitted) {
    return (
      <div className="form-card form-success" role="status">
        <span className="success-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h3>Thank you — details received.</h3>
        <p>
          <strong>Preview mode:</strong> this form is not yet connected to DAEPL&apos;s inbox, so nothing has been sent.
          The production build will issue a reference number and email confirmation.
        </p>
        <div className="form-success-actions">
          <button className="btn btn-outline" type="button" onClick={() => setSubmitted(false)}>Back to form</button>
          <Link href="/products" className="btn btn-primary">Explore products</Link>
        </div>
      </div>
    );
  }

  const maxFiles = kind === "rfq" ? 5 : 1;

  return (
    <form
      className="form-card enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (e.currentTarget.reportValidity()) setSubmitted(true);
      }}
    >
      <div className="form-heading">
        <span className="kicker">{c.kicker}</span>
        <h2>{c.title}</h2>
        <p>{c.intro}</p>
      </div>

      {kind === "rfq" && (
        <div className="form-grid">
          <label className="field">
            <span>Part name / number <i>*</i></span>
            <input name="product" required defaultValue={product} placeholder="e.g. Head lamp harness, DA-HL-102" />
          </label>
          <label className="field">
            <span>Annual / batch quantity <i>*</i></span>
            <input name="quantity" required placeholder="e.g. 10,000 pcs / month" />
          </label>
        </div>
      )}
      {kind === "apply" && job && (
        <label className="field">
          <span>Position</span>
          <input name="position" defaultValue={job} readOnly />
        </label>
      )}

      <div className="form-grid">
        <label className="field">
          <span>Full name <i>*</i></span>
          <input name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        {kind !== "apply" ? (
          <label className="field">
            <span>Company {kind === "rfq" && <i>*</i>}</span>
            <input name="company" required={kind === "rfq"} autoComplete="organization" placeholder="Company name" />
          </label>
        ) : (
          <label className="field">
            <span>Total experience <i>*</i></span>
            <input name="experience" required placeholder="e.g. 3 years" />
          </label>
        )}
        <label className="field">
          <span>Email <i>*</i></span>
          <input type="email" name="email" required autoComplete="email" placeholder="name@company.com" />
        </label>
        <label className="field">
          <span>Phone / WhatsApp <i>*</i></span>
          <input type="tel" name="phone" required autoComplete="tel" placeholder="+91" />
        </label>
        {kind === "rfq" && (
          <label className="field">
            <span>Target date</span>
            <input type="date" name="targetDate" />
          </label>
        )}
        {kind === "rfq" && (
          <label className="field">
            <span>Category</span>
            <select name="category" defaultValue="">
              <option value="">Select a category</option>
              <option>Wire harness</option>
              <option>Cable</option>
              <option>Terminal</option>
              <option>PVC sleeve</option>
              <option>Sheet metal</option>
              <option>Plastic moulding</option>
            </select>
          </label>
        )}
        {kind === "apply" && (
          <>
            <label className="field">
              <span>Current CTC</span>
              <input name="currentCtc" placeholder="₹ per annum" />
            </label>
            <label className="field">
              <span>Expected CTC</span>
              <input name="expectedCtc" placeholder="₹ per annum" />
            </label>
            <label className="field">
              <span>Notice period</span>
              <input name="notice" placeholder="e.g. 30 days" />
            </label>
            <label className="field">
              <span>Preferred plant</span>
              <select name="plant" defaultValue="">
                <option value="">Any plant</option>
                {plants.map((p) => <option key={p.city}>{p.city}</option>)}
              </select>
            </label>
          </>
        )}
      </div>

      {kind !== "apply" && (
        <label className="field">
          <span>{kind === "rfq" ? "Specifications & notes" : "Message"} {kind === "contact" && <i>*</i>}</span>
          <textarea name="message" rows={4} required={kind === "contact"} placeholder={kind === "rfq" ? "Material, application, vehicle model, packaging or any other requirement…" : "How can we help?"} />
        </label>
      )}

      {kind !== "contact" && (
        <label className="file-drop">
          <input
            type="file"
            accept={kind === "apply" ? ".pdf,.doc,.docx" : ".pdf,.dwg,.dxf,.jpg,.jpeg,.png"}
            multiple={kind === "rfq"}
            required={kind === "apply"}
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              const tooBig = files.find((f) => f.size > 10 * 1024 * 1024);
              if (files.length > maxFiles || tooBig) {
                setFileError(tooBig ? `${tooBig.name} is larger than 10 MB.` : `Please choose up to ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`);
                setFileName("");
                e.target.value = "";
                return;
              }
              setFileError("");
              setFileName(files.map((f) => f.name).join(", "));
            }}
          />
          <span className="file-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0-4.5 4.5M12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span className="file-text">
            <strong>{fileName || (kind === "apply" ? "Upload your CV *" : "Upload drawings")}</strong>
            <small>{kind === "apply" ? "PDF or Word · max 10 MB" : "PDF, DWG, DXF, JPG or PNG · up to 5 files, 10 MB each"}</small>
          </span>
          <span className="file-browse">Browse</span>
        </label>
      )}
      {fileError && <p className="form-error" role="alert">{fileError}</p>}

      <label className="consent">
        <input type="checkbox" required />
        <span>I agree to the <Link href="/privacy">Privacy Policy</Link> and consent to DAEPL using these details to respond to my {kind === "apply" ? "application" : "enquiry"}.</span>
      </label>
      <button className="btn btn-primary btn-lg form-submit" type="submit">
        {c.submit}
        <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 20 20" fill="none"><path d="M4 10h11.5m-4.5-4.5L15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <p className="form-note">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
        Protected with SSL encryption. We never share your details.
      </p>
    </form>
  );
}
