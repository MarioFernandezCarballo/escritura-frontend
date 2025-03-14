'use client';

interface GoogleTagManagerNoScriptProps {
  gtmId: string;
}

const GoogleTagManagerNoScript = ({ gtmId }: GoogleTagManagerNoScriptProps) => {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
      }}
    />
  );
};

export default GoogleTagManagerNoScript;
