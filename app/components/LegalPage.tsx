export default function LegalPage({ title, blocks }: { title: string; blocks: [string, string][] }) {
  return (
    <main className="paper legal">
      <div className="wrap">
        <a className="back" href="/">← Back to Menzura</a>
        <h1 className="t-section">{title}</h1>
        <p className="draft">Draft for legal review · Last updated October 2026 · Bracketed items are to be confirmed by counsel.</p>
        {blocks.map(([h, b]) => (<section key={h}><h2 className="t-sub">{h}</h2><p>{b}</p></section>))}
      </div>
    </main>
  );
}
