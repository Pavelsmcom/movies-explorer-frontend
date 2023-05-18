/*
import { useCallback, useEffect, useState } from 'react';

import debounce from '../functions/filterMovies';

export function usePageWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const handleResizeDebaunced = debounce(handleResize, 300);

  useEffect(() => {
    window.addEventListener('resize', handleResizeDebaunced);

    return () => {
      window.addEventListener('resize', handleResizeDebaunced);
    };
  }, []);

  return { screenWidth };
}
*/
