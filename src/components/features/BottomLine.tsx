export function BottomLine({ text }: { text: string }) {
  return (
    <div className="mb-4">
      <div className="bottom-line-accent">Bottom line</div>
      <p className="bottom-line-copy">{text}</p>
    </div>
  );
}
