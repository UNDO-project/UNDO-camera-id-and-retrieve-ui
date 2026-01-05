import { useState, useCallback } from 'react';

export interface UseDialogProps {
  initialOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Headless hook for dialog/modal logic.
 * Manages open/close state and providing control methods.
 *
 * @param props - Dialog configuration
 * @returns Dialog state and control functions
 */
export function useDialog(props: UseDialogProps = {}) {
  const [isOpen, setIsOpen] = useState(props.initialOpen || false);
  const { onOpenChange } = props;

  const setOpen = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen,
  };
}
