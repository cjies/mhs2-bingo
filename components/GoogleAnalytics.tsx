import { FC } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const GoogleAnalytics: FC = () => {
  if (!GA_ID) {
    return <script async src="" />;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
