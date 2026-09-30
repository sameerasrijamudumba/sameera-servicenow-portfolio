import { Download } from "lucide-react";
import { contact } from "@/data/contact";

export function ResumeButton() {
  return contact.resumePath ? (
    <a className="resume-button" href={contact.resumePath} download><Download size={15} aria-hidden="true" />Download Resume</a>
  ) : (
    <button className="resume-button" type="button" disabled title="Resume not yet available" aria-label="Download Resume — not yet available">
      <Download size={15} aria-hidden="true" />Download Resume<span className="unavailable-dot" aria-hidden="true" />
    </button>
  );
}
