import { SaveBar } from "@shopify/app-bridge-react";
import { ComponentProps } from "react";

export type AppBridgeSaveBarProps = ComponentProps<typeof SaveBar> & {
  onSave: () => void;
  disableSave?: boolean;
  loadingSave?: boolean;
  onDiscard: () => void;
  disableDiscard?: boolean;
  loadingDiscard?: boolean;
};

export function AppBridgeSaveBar(props: AppBridgeSaveBarProps) {
  const {
    id,
    open,
    onSave,
    onDiscard,
    disableSave,
    loadingSave,
    disableDiscard,
    loadingDiscard,
    discardConfirmation,
    ...rest
  } = props;

  return (
    <SaveBar
      {...rest}
      open={open}
      id={id || "save-bar"}
      discardConfirmation={discardConfirmation || ("" as unknown as boolean)}
    >
      <button
        type="button"
        onClick={onDiscard}
        disabled={disableDiscard}
        loading={loadingDiscard ? "" : undefined}
      />

      <button
        variant="primary"
        type="button"
        onClick={onSave}
        disabled={disableSave}
        loading={loadingSave ? "" : undefined}
      />
    </SaveBar>
  );
}
