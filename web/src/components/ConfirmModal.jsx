import React from "react";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

function ConfirmModal({ text, isLaoding, handleConfirm, children }) {
  const openModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: <Text size="sm">{text}</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleConfirm(),
    });

  return (
    <button disabled={isLaoding} onClick={openModal}>
      {children}
    </button>
  );
}

export default ConfirmModal;
