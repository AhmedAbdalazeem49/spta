import api from "@/services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const sanitizeFilename = (s: string) =>
  s
    .replace(/[^\p{L}\p{N}\-_ ]/gu, "")
    .trim()
    .replace(/\s+/g, "-") || "certificate";

/**
 * Render a DOM element to a high-quality PDF and trigger download.
 * Uses A4 landscape and fits the certificate proportionally.
 */
export async function downloadElementAsPdf(
  el: HTMLElement,
  filename: string,
): Promise<void> {
  const canvas = await html2canvas(el, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    allowTaint: false,
    width: 1122,
    height: 754,
    windowWidth: 1122,
    windowHeight: 754,
  });

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [1122, 754],
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

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 1122, 794);
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

export const preloadImages = (el: HTMLElement): Promise<void> => {
  const imgs = Array.from(el.querySelectorAll("img"));
  const promises = imgs.map(
    (img) =>
      new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
          resolve();
          return;
        }
        img.onload = () => resolve();
        img.onerror = () => resolve(); // don't block on broken images
        // Force reload with crossOrigin to bypass CORS cache
        const src = img.src;
        img.crossOrigin = "anonymous";
        img.src = "";
        img.src = src;
      }),
  );
  return Promise.all(promises).then(() => {});
};

export const toBase64 = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(""); // skip broken images silently
    img.src = url + "?nocache=" + Date.now(); // bust any cached non-CORS response
  });
};

export const convertImagesToBase64 = async (el: HTMLElement): Promise<void> => {
  const imgs = Array.from(el.querySelectorAll("img"));

  await Promise.all(
    imgs.map(async (img) => {
      if (
        !img.src ||
        img.src.startsWith("data:") ||
        img.src.startsWith("blob:")
      )
        return;
      // Skip local Vite-served assets (logo, certBg, etc.)
      if (
        img.src.includes(window.location.origin) &&
        img.src.includes("/assets/")
      )
        return;
      if (!img.src.includes("/storage/")) return; // only convert storage images

      try {
        const res = await api.get("/image-to-base64", {
          params: { url: img.src },
        });

        if (res.data?.base64) {
          img.src = res.data.base64;
          console.log("✅ Converted:", img.alt || img.src.slice(0, 60));
        } else {
          console.warn("⚠️ No base64 returned for:", img.src);
        }
      } catch (err) {
        console.error("❌ Failed:", img.src, err);
      }
    }),
  );
};
