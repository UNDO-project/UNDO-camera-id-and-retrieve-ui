import { render, screen } from '@/test/utils';
import { VendorBadge } from '../VendorBadge';
import { describe, it, expect } from 'vitest';

describe('VendorBadge', () => {
  it('renders the vendor name', () => {
    render(<VendorBadge vendor="Axis" />);
    expect(screen.getByText('Axis')).toBeInTheDocument();
  });
});
