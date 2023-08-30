import { draftMode } from 'next/headers';

import ExitPreviewButton from './ExitPreviewButton';

const PreviewBanner = () => {
  const { isEnabled } = draftMode();
  return isEnabled ? (
    <div
      style={{
        background: 'limegreen',
        position: 'sticky',
        bottom: 0,
        zIndex: 40,
        height: '84px',
        display: 'flex',
        alignItems: 'center',
        padding: '14px 28px',
      }}
    >
      You are in preview mode.
      <ExitPreviewButton />
    </div>
  ) : null;
};

export default PreviewBanner;
