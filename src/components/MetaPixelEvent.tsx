import Script from "next/script";

interface MetaPixelEventProps {
  eventName: "ViewContent" | "Lead" | "Schedule";
}

export const MetaPixelEvent = ({ eventName }: MetaPixelEventProps) => (
  <Script id={`meta-pixel-${eventName}`} strategy="afterInteractive">
    {`
      if (typeof fbq === 'function') {
        fbq('track', '${eventName}');
      }
    `}
  </Script>
);
