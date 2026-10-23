'use client';
import { useState } from 'react';

type Group = { group: string; items: { q: string; a: string }[] };

function Question({ id, q, a }: { id: string; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="q">
      <h3>
        <button className="q-btn" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {q}
          <span className="chev" aria-hidden="true" />
        </button>
      </h3>
      <div className="panel" id={id} data-open={open}>
        <div><p>{a}</p></div>
      </div>
    </div>
  );
}

export default function Questions({ groups }: { groups: Group[] }) {
  return (
    <div className="faq">
      {groups.map((g, gi) => (
        <div key={g.group}>
          <p className="q-group">{g.group}</p>
          {g.items.map((item, i) => <Question key={item.q} id={`q-${gi}-${i}`} q={item.q} a={item.a} />)}
        </div>
      ))}
    </div>
  );
}
