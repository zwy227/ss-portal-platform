type PortalListFilterResetButtonProps = {
  onReset: () => void;
  disabled?: boolean;
};

export function PortalListFilterResetButton({
  onReset,
  disabled = false,
}: PortalListFilterResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className="portal-filter-reset-btn"
    >
      重置
    </button>
  );
}
