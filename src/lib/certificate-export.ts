import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const sanitizeFilename = (s: string) =>
  s.replace(/[^\p{L}\p{N}\-_ ]/gu, "").trim().replace(/\s+/g, "-") || "certificate";

/**
 * Render a DOM element to a high-quality PDF and trigger download.
 * Uses A4 landscape and fits the certificate proportionally.
 */
export async function downloadElementAsPdf(
  el: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(el, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const ratio = canvas.width / canvas.height;

  let w = pageW - 20;
  let h = w / ratio;
  if (h > pageH - 20) {
    h = pageH - 20;
    w = h * ratio;
  }

  const x = (pageW - w) / 2;
  const y = (pageH - h) / 2;

  pdf.addImage(canvas.toDataURL("image/png", 1.0), "PNG", x, y, w, h, undefined, "FAST");
  pdf.save(`${sanitizeFilename(filename)}.pdf`);
}

/**
 * Print a specific element using the shared @media print CSS in index.css.
 * The element must carry className="print-certificate" while printing.
 */
export function printElement(el: HTMLElement): void {
  el.classList.add("print-certificate");
  const cleanup = () => {
    el.classList.remove("print-certificate");
    window.removeEventListener("afterprint", cleanup);
  };
  window.addEventListener("afterprint", cleanup);
  // small delay to allow class to apply
  setTimeout(() => window.print(), 50);
}
