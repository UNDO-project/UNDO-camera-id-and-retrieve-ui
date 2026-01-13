import { useMutation } from '@tanstack/react-query';
import { useIdentificationService } from '@/container/hooks';
import type { Image, IdentificationParams } from '@/primitives';

export function useIdentification() {
  const service = useIdentificationService();

  return useMutation({
    mutationFn: ({ image, params }: { image: Image; params: IdentificationParams }) =>
      service.identify(image, params),
  });
}
