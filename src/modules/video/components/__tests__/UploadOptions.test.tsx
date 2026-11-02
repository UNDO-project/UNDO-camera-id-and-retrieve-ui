import { render, screen, fireEvent } from '@testing-library/react';
import { UploadOptions } from '../UploadOptions';
import { describe, it, expect, vi } from 'vitest';

describe('UploadOptions', () => {
  it('renders unchecked by default and calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(<UploadOptions highQuality={false} onHighQualityChange={onChange} />);

    const checkbox = screen.getByLabelText(/h\.264 export/i);
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('reflects a checked state and honours disabled', () => {
    render(<UploadOptions highQuality={true} onHighQualityChange={vi.fn()} disabled />);

    const checkbox = screen.getByLabelText(/h\.264 export/i);
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
  });
});
