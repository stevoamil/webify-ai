"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

type TrustpilotGlobal = { Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void } };

/** Trustpilot "Review Collector" TrustBox. Its script loads only after the page has finished loading. */
export default function TrustpilotWidget() {
  const ref = useRef<HTMLDivElement>(null);

  // On client-side navigation the script is already loaded, so ask it to draw this widget.
  useEffect(() => {
    const tp = (window as unknown as TrustpilotGlobal).Trustpilot;
    if (tp && ref.current) tp.loadFromElement(ref.current, true);
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="6ade3f7c612465cdc9f197b2"
        data-style-height="52px"
        data-style-width="100%"
      >
        <a href="https://www.trustpilot.com/review/webify-ai.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-text">
          Review Webify.ai on Trustpilot
        </a>
      </div>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          const tp = (window as unknown as TrustpilotGlobal).Trustpilot;
          if (tp && ref.current) tp.loadFromElement(ref.current, true);
        }}
      />
    </>
  );
}
