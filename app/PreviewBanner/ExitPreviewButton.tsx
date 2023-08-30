'use client';

import { usePathname } from 'next/navigation';

const ExitPreviewButton = () => {
  const pathname = usePathname();
  const pathnameWithoutLeadingSlash = pathname?.replace(/^\//, '');
  return (
    <a href={`/api/exit-preview?slug=${pathnameWithoutLeadingSlash}`} style={{ marginLeft: 'auto' }}>
      Exit
    </a>
  );
};

export default ExitPreviewButton;
