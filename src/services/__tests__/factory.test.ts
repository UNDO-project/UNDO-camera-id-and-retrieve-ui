import { describe, it, expect } from 'vitest';
import { createServices } from '../factory';
import { RestIdentificationService } from '../implementations/rest/RestIdentificationService';
import { MockIdentificationService } from '../implementations/mock/MockIdentificationService';

describe('createServices', () => {
  it('creates rest services when useMocks is false', () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: false });
    expect(services.identification).toBeInstanceOf(RestIdentificationService);
  });

  it('creates mock services when useMocks is true', () => {
    const services = createServices({ apiBaseUrl: 'http://localhost', useMocks: true });
    expect(services.identification).toBeInstanceOf(MockIdentificationService);
  });
});
