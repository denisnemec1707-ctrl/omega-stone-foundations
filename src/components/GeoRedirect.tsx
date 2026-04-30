import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocaleFromPath, switchLocalePath } from "@/i18n/routes";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeDays: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAgeDays * 86400};samesite=lax`;
}

const GeoRedirect = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if user is on the SK (default) version — no /en or /cs prefix
    const currentLocale = getLocaleFromPath(pathname);
    if (currentLocale !== "sk") return;

    // If locale cookie already set, user has chosen a language — respect their choice
    if (getCookie("locale")) return;

    // If already checked this session, don't redirect again
    if (sessionStorage.getItem("geo-checked")) return;
    sessionStorage.setItem("geo-checked", "true");

    const detectAndRedirect = async () => {
      try {
        const res = await fetch("/api/geo");
        if (!res.ok) return;
        const { country } = await res.json();

        if (country === "CZ") {
          setCookie("locale", "cs", 365);
          const czPath = switchLocalePath(pathname, "cs");
          navigate(czPath, { replace: true });
        } else if (country === "SK") {
          setCookie("locale", "sk", 365);
          // Already on SK, do nothing
        } else {
          setCookie("locale", "en", 365);
          const enPath = switchLocalePath(pathname, "en");
          navigate(enPath, { replace: true });
        }
      } catch {
        // Geo-detection failed, stay on SK default
        setCookie("locale", "sk", 365);
      }
    };

    detectAndRedirect();
  }, [pathname, navigate]);

  return null;
};

export default GeoRedirect;
