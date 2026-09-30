"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import type { CodeLabExample } from "@/types/portfolio";

// A small display-only tokenizer. React escapes text; snippets are never evaluated.
function Highlight({ code }: { code: string }) {
  const tokens = code.split(/(\/\/[^\n]*|'[^'\n]*'|"[^"\n]*"|\b(?:var|if|return|function|new|while|true|false)\b|\b\d+\b)/g);
  return <>{tokens.map((token, index) => {
    const kind = token.startsWith("//") ? "comment" : /^["']/.test(token) ? "string" : /^(var|if|return|function|new|while|true|false)$/.test(token) ? "keyword" : /^\d+$/.test(token) ? "number" : undefined;
    return kind ? <span key={index} className={`syntax-${kind}`}>{token}</span> : token;
  })}</>;
}

function CodeBlock({ block }: { block: CodeLabExample["blocks"][number] }) {
  const [feedback, setFeedback] = useState("");
  const [copying, setCopying] = useState(false);
  async function copy() {
    setCopying(true);
    setFeedback("");
    try {
      await navigator.clipboard.writeText(block.code);
      setFeedback("Copied");
    } catch {
      setFeedback("Copy unavailable. Select the code and copy it manually.");
    } finally {
      setCopying(false);
    }
  }
  return <figure className="lab-code-block">
    <figcaption><span><Code2 size={16} aria-hidden="true" />{block.title}</span><button type="button" onClick={copy} disabled={copying} aria-label={`Copy code: ${block.title}`}>{feedback === "Copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}Copy Code</button></figcaption>
    <div className="lab-code-meta"><span>Portfolio demonstration</span><span>{block.language}</span></div>
    <pre tabIndex={0} aria-label={`${block.title}, scrollable code`}><code><Highlight code={block.code} /></code></pre>
    <p className="lab-copy-feedback" role="status" aria-live="polite">{feedback}</p>
  </figure>;
}

export function CodeLabExplorer({ examples }: { examples: readonly CodeLabExample[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function select(index: number) {
    setActive(index);
    buttons.current[index]?.focus({ preventScroll: true });
    // Keep the selected tab visible inside its own horizontal scroller.
    const button = buttons.current[index];
    if (button?.parentElement) {
      const parent = button.parentElement;
      if (button.offsetLeft < parent.scrollLeft) parent.scrollLeft = button.offsetLeft;
      else if (button.offsetLeft + button.offsetWidth > parent.scrollLeft + parent.clientWidth) parent.scrollLeft = button.offsetLeft + button.offsetWidth - parent.clientWidth;
    }
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target: number | undefined;
    if (event.key === "ArrowRight") target = (index + 1) % examples.length;
    if (event.key === "ArrowLeft") target = (index - 1 + examples.length) % examples.length;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = examples.length - 1;
    if (target !== undefined) { event.preventDefault(); select(target); }
  }
  return <div className="lab-explorer">
    <div className="lab-tabs" role="tablist" aria-label="ServiceNow scripting examples">{examples.map((example, index) => <button key={example.id} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`lab-tab-${example.id}`} aria-controls={`lab-panel-${example.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => onKey(event, index)}>{example.category}</button>)}</div>
    {examples.map((example, index) => <div key={example.id} role="tabpanel" id={`lab-panel-${example.id}`} aria-labelledby={`lab-tab-${example.id}`} hidden={active !== index} tabIndex={0} className="lab-panel">
      <div className="lab-example-heading"><p className="lab-context">{example.context}</p><h3>{example.title}</h3><p>{example.purpose}</p></div>
      {example.workflow && <ol className="lab-flow" aria-label="Client-server communication flow">{example.workflow.map(step => <li key={step}>{step}</li>)}</ol>}
      <div className="lab-workspace"><div className="lab-code-stack">{example.blocks.map(block => <CodeBlock key={block.title} block={block} />)}</div>
        <div className="lab-notes"><h4>Technical explanation</h4>{example.explanation.map(note => <div key={note.title}><h5>{note.title}</h5><p>{note.description}</p></div>)}<div className="lab-considerations"><h4>Key considerations</h4><p>{example.considerations}</p></div></div>
      </div>
    </div>)}
  </div>;
}
