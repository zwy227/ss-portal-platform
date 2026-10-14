type PortalListFilterResetButtonProps = {
  onReset: () => void;
  disabled?: boolean;
  label?: string;
};

export function PortalListFilterResetButton({
  onReset,
  disabled = false,
  label = "重置",
}: PortalListFilterResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className="portal-filter-reset-btn"
    >
      {label}
    </button>
  );
}
