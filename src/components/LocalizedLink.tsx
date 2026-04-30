import { Link, type LinkProps } from "react-router-dom";
import { useLocale } from "@/i18n/hooks";
import { getLocalizedPath, type RouteKey } from "@/i18n/routes";

interface LocalizedLinkProps extends Omit<LinkProps, "to"> {
  routeKey: RouteKey;
  hash?: string;
}

const LocalizedLink = ({ routeKey, hash, ...props }: LocalizedLinkProps) => {
  const locale = useLocale();
  const path = getLocalizedPath(routeKey, locale);
  const to = hash ? `${path}#${hash}` : path;

  return <Link to={to} {...props} />;
};

export default LocalizedLink;
