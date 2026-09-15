import { useCallback, useEffect, useState } from 'react';

import { CarouselApi } from '@/components/ui/carousel';

export const useCarouselScrollBar = (api: CarouselApi | undefined) => {
  const [value, setValue] = useState(0);
  const [canScroll, setCanScroll] = useState(true);

  const scrollToProgress = useCallback(
    (progress: number) => {
      if (!api) return;

      const engine = api.internalEngine();
      const { limit, target, scrollProgress, scrollBody, scrollTo, animation } =
        engine;

      animation.stop();

      const currentProgress = scrollProgress.get(target.get());
      const allowedProgress = Math.min(Math.max(progress, 0), 1);
      const diffToTarget = allowedProgress - currentProgress;
      const distance = diffToTarget * limit.length * -1;

      scrollBody.useDuration(0);
      scrollTo.distance(distance, false);
    },
    [api],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const progress = parseFloat(e.target.value);
      setValue(progress);
      scrollToProgress(progress);
    },
    [scrollToProgress],
  );

  useEffect(() => {
    if (!api) return;

    setValue(api.scrollProgress());

    const updateScrollState = () => {
      setValue(api.scrollProgress());
      setCanScroll(api.scrollSnapList().length > 1);
    };

    updateScrollState();

    api.on('scroll', updateScrollState);
    api.on('reInit', updateScrollState);

    return () => {
      api.off('scroll', updateScrollState);
      api.off('reInit', updateScrollState);
    };
  }, [api]);

  return { value, onChange, canScroll };
};
