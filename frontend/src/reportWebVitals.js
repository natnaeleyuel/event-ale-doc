import { onCLS, onFCP, onFID } from 'web-vitals';

export default function reportWebVitals(metric) {
  console.log(metric);
  // Send metrics to an analytics endpoint, if needed
}

onCLS(reportWebVitals);
onFCP(reportWebVitals);
onFID(reportWebVitals);
