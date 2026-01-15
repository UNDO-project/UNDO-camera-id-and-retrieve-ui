import { render, screen } from './utils';
import { describe, it, expect } from 'vitest';

describe('Smoke Test', () => {
  it('renders a simple component', () => {
    render(<div>Hello Vitest</div>);
    expect(screen.getByText('Hello Vitest')).toBeInTheDocument();
  });
});
