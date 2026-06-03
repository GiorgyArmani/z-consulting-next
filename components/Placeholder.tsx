/**
 * Striped placeholder for imagery you don't have yet. Replace with a real
 * <img> (or a styled <div> with backgroundImage) when assets are available.
 */
export function Placeholder({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <div className={`ph${dark ? ' dark' : ''}`}>
      <span className="ph-lbl">{label}</span>
    </div>
  );
}
