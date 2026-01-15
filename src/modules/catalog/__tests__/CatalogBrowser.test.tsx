import { render, screen } from '@/test/utils';
import { CatalogBrowser } from '../CatalogBrowser';
import { describe, it, expect } from 'vitest';

describe('CatalogBrowser', () => {
  it('renders the catalog title and description', () => {
    render(<CatalogBrowser />);
    expect(screen.getByText('Camera Catalog')).toBeInTheDocument();
    expect(screen.getByText(/browse and search/i)).toBeInTheDocument();
  });
});
