import {
  siFacebook,
  siPinterest,
  siYelp,
  type SimpleIcon,
} from "simple-icons";
import type { SocialNetwork } from "@/lib/site";
import { socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<SocialNetwork, SimpleIcon> = {
  facebook: siFacebook,
  pinterest: siPinterest,
  yelp: siYelp,
};

type Props = {
  className?: string;
  iconClassName?: string;
};

/** Brand-accurate social / review network marks from Simple Icons. */
export function SocialLinks({ className, iconClassName }: Props) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socialLinks.map(({ network, href, label }) => {
        const icon = icons[network];
        return (
          <li key={network}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in new tab)`}
              className="inline-flex size-10 items-center justify-center rounded-md text-current transition-colors hover:bg-white/10"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                aria-hidden
                className={cn("size-5", iconClassName)}
                fill="currentColor"
              >
                <path d={icon.path} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
