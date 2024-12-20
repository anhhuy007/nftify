import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // exception pages
  const exceptionPages = ["/user", "/404", "/500"];

  useEffect(() => {
    for (let i = 0; i < exceptionPages.length; i++) {
      if (pathname.includes(exceptionPages[i])) {
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
