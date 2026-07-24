const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const validMeasurementId =
  measurementId && /^G-[A-Z0-9]+$/.test(measurementId)
    ? measurementId
    : null;

export function Analytics() {
  if (!validMeasurementId) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${validMeasurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${validMeasurementId}');`,
        }}
      />
    </>
  );
}
