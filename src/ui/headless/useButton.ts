import { useState, useCallback } from 'react';

export interface UseButtonProps {
  onPress?: () => void;
  isDisabled?: boolean;
}

/**
 * Headless hook for button logic.
 * Abstracts press interactions and state for platform-agnostic usage.
 *
 * @param props - Button configuration
 * @returns Button event handlers and state
 */
export function useButton(props: UseButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { isDisabled, onPress } = props;

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    onPress?.();
  }, [isDisabled, onPress]);

  const handlePressIn = useCallback(() => {
    if (isDisabled) return;
    setIsPressed(true);
  }, [isDisabled]);

  const handlePressOut = useCallback(() => {
    if (isDisabled) return;
    setIsPressed(false);
  }, [isDisabled]);

  return {
    handlePress,
    handlePressIn,
    handlePressOut,
    isPressed,
  };
}
