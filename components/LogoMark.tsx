type Props = {
  className?: string;
  title?: string;
};

/**
 * Pütter monogram / icon. The two interlocking shapes from the
 * wordmark, used as a standalone mark for favicons, avatars, and
 * compact spaces. Inherits color via currentColor.
 *
 * Original artwork: public/Pütter-Final-02-Favicon.svg
 */
export default function LogoMark({ className, title = "Pütter" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 141.18 160"
      fill="currentColor"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <path d="M135.91,44.27V6.86h-43.55v24.76c0,6.99,5.66,12.65,12.65,12.65h30.9Z" />
      <path d="M48.81,44.27V6.86H5.27v79.6c0,35.59,27.91,65.68,63.49,66.66s67.16-28.61,67.16-65.3h-43.55c-24.05,0-43.55-19.5-43.55-43.55Z" />
    </svg>
  );
}
