import Script from "next/script";
import { adsId, ga4Id, gtmId } from "@/lib/analytics";
export function AnalyticsScripts() {
  const googleTagId = ga4Id || adsId;
  const configuration = [ga4Id, adsId]
    .filter(Boolean)
    .map((id) => `gtag('config',${JSON.stringify(id)});`)
    .join("");
  return (
    <>
      {gtmId && (
        <Script
          id="gtm"
          strategy="afterInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}</Script>
      )}
      {googleTagId && (
        <>
          <Script
            id="google-tag-config"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};gtag('js',new Date());${configuration}`}</Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
}
