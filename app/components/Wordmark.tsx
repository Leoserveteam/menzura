/* eslint-disable @next/next/no-img-element */
export default function Wordmark({ className = 'wordmark' }: { className?: string }) {
  return <img src="/images/wordmark.svg" alt="Menzura" width={132} height={18} className={className} />;
}
