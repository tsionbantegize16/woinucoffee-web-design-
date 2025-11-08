import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ behavior = 'instant' }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    const scrollBehavior = behavior === 'smooth' && supportsSmoothScroll ? 'smooth' : 'auto';

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: scrollBehavior,
    });
  }, [pathname, behavior]);

  return null;
};

export default ScrollToTop;

