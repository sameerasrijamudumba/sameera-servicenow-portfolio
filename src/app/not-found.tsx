import Link from "next/link";
export default function NotFound() { return <main className="not-found"><div><p className="eyebrow">ROUTE NOT FOUND</p><h1>Page not found.</h1><p>The workflow may have taken the wrong route.</p><Link className="button button-primary" href="/">Return Home</Link></div></main>; }
