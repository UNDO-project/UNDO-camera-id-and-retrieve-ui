import { render, screen } from '@/test/utils';
import { IdentificationFeature } from '../IdentificationFeature';
import { describe, it, expect } from 'vitest';

describe('IdentificationFeature', () => {
  it('renders upload zone by default', () => {
    render(<IdentificationFeature />);
    expect(screen.getByText(/drag and drop an image here/i)).toBeInTheDocument();
    expect(screen.getByText(/supports jpeg, png, webp/i)).toBeInTheDocument();
  });
});
