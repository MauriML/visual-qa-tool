import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "ingesta", label: "01 · Ingesta" },
  { id: "comparacion", label: "02 · Comparación IA" },
  { id: "deteccion", label: "03 · Detección" },
  { id: "output", label: "04 · Output" },
  { id: "cicd", label: "05 · CI/CD" },
  { id: "arquitectura", label: "Arquitectura" },
];

const CodeBlock = ({ code, lang = "python" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "1.5rem 0" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#0d1117", borderRadius: "8px 8px 0 0",
        padding: "8px 16px", borderBottom: "1px solid #30363d"
      }}>
        <span style={{ color: "#8b949e", fontSize: "12px", fontFamily: "monospace", letterSpacing: "0.05em" }}>{lang}</span>
        <button onClick={handleCopy} style={{
          background: copied ? "#238636" : "#21262d", color: copied ? "#fff" : "#8b949e",
          border: "1px solid #30363d", borderRadius: "6px", padding: "4px 12px",
          fontSize: "12px", cursor: "pointer", transition: "all 0.2s", fontFamily: "monospace"
        }}>{copied ? "✓ Copiado" : "Copiar"}</button>
      </div>
      <pre style={{
        background: "#0d1117", color: "#e6edf3", padding: "1.25rem 1.5rem",
        borderRadius: "0 0 8px 8px", overflow: "auto", margin: 0,
        fontSize: "13px", lineHeight: "1.7", fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        border: "1px solid #30363d", borderTop: "none"
      }}>
        <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(code) }} />
      </pre>
    </div>
  );
};

function syntaxHighlight(code) {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(#[^\n]*)/g, '<span style="color:#8b949e">$1</span>')
    .replace(/\b(import|from|as|def|return|class|if|else|elif|for|in|with|try|except|raise|True|False|None|and|or|not|pass|yield|lambda|async|await)\b/g, '<span style="color:#ff7b72">$1</span>')
    .replace(/\b([A-Z][A-Za-z0-9_]*)\b(?=\s*[(\[])/g, '<span style="color:#d2a8ff">$1</span>')
    .replace(/\b([a-z_][a-z0-9_]*)(?=\s*\()/g, '<span style="color:#79c0ff">$1</span>')
    .replace(/(["'`])((?:[^\\]|\\.)*?)\1/g, '<span style="color:#a5d6ff">$1$2$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#f2cc60">$1</span>');
}

const Badge = ({ text, color }) => (
  <span style={{
    background: color + "22", color: color, border: `1px solid ${color}44`,
    borderRadius: "4px", padding: "2px 10px", fontSize: "12px",
    fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.05em"
  }}>{text}</span>
);

const InfoBox = ({ type, children }) => {
  const styles = {
    warning: { bg: "#3d2b1f", border: "#d29922", icon: "⚠️" },
    tip: { bg: "#1a2f1a", border: "#3fb950", icon: "💡" },
    info: { bg: "#1a2340", border: "#388bfd", icon: "ℹ️" },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}44`,
      borderLeft: `3px solid ${s.border}`, borderRadius: "0 8px 8px 0",
      padding: "1rem 1.25rem", margin: "1.25rem 0", fontSize: "14px",
      color: "#e6edf3", lineHeight: "1.6"
    }}>
      <span style={{ marginRight: "8px" }}>{s.icon}</span>{children}
    </div>
  );
};

const SectionTitle = ({ num, title, sub }) => (
  <div style={{ marginBottom: "2rem" }}>
    {num && <div style={{ color: "#f78166", fontFamily: "monospace", fontSize: "13px", marginBottom: "4px", letterSpacing: "0.1em" }}>{num}</div>}
    <h2 style={{ color: "#e6edf3", fontSize: "1.75rem", fontWeight: 700, margin: "0 0 8px 0", fontFamily: "'DM Serif Display', Georgia, serif" }}>{title}</h2>
    {sub && <p style={{ color: "#8b949e", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>{sub}</p>}
  </div>
);

const ArchNode = ({ label, sublabel, color, children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
    <div style={{
      background: color + "22", border: `2px solid ${color}`,
      borderRadius: "10px", padding: "12px 18px", textAlign: "center", minWidth: "120px"
    }}>
      <div style={{ color, fontWeight: 700, fontSize: "13px", fontFamily: "monospace" }}>{label}</div>
      {sublabel && <div style={{ color: "#8b949e", fontSize: "11px", marginTop: "3px" }}>{sublabel}</div>}
    </div>
    {children}
  </div>
);

const Arrow = ({ dir = "down" }) => (
  <div style={{ color: "#388bfd", fontSize: "20px", lineHeight: 1 }}>
    {dir === "down" ? "↓" : dir === "right" ? "→" : "↓"}
  </div>
);

const content = {
  overview: (
    <div>
      <SectionTitle title="Visual QA AI Tool" sub="Blueprint técnico completo para detectar discrepancias visuales entre diseños Figma e implementaciones web usando Computer Vision + Deep Learning." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { icon: "🔬", label: "Computer Vision", desc: "OpenCV + SSIM" },
          { icon: "🧠", label: "Deep Learning", desc: "ResNet / YOLO UI" },
          { icon: "📸", label: "Screenshot Auto", desc: "Playwright / Selenium" },
          { icon: "🗺️", label: "Heatmap Output", desc: "Diff visual + JSON" },
          { icon: "⚙️", label: "CI/CD Ready", desc: "GitHub Actions" },
          { icon: "📊", label: "OCR Check", desc: "Tesseract / EasyOCR" },
        ].map(c => (
          <div key={c.label} style={{
            background: "#161b22", border: "1px solid #30363d", borderRadius: "10px",
            padding: "1.25rem", transition: "border-color 0.2s"
          }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{c.icon}</div>
            <div style={{ color: "#e6edf3", fontWeight: 600, fontSize: "14px" }}>{c.label}</div>
            <div style={{ color: "#8b949e", fontSize: "12px", marginTop: "4px", fontFamily: "monospace" }}>{c.desc}</div>
          </div>
        ))}
      </div>
      <InfoBox type="tip">
        Este sistema combina técnicas clásicas de CV (SSIM, histogramas, contornos) con modelos de Deep Learning para <strong>identificar semánticamente</strong> los elementos de UI antes de comparar — evitando falsos positivos por sub-píxel rendering o anti-aliasing.
      </InfoBox>
      <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "1.25rem" }}>
        <div style={{ color: "#8b949e", fontSize: "12px", fontFamily: "monospace", marginBottom: "8px" }}>STACK TÉCNICO</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Python 3.11+","OpenCV 4.x","PyTorch / ONNX","Playwright","Tesseract OCR","scikit-image","NumPy","Pillow","FastAPI (opcional)","GitHub Actions"].map(t => (
            <Badge key={t} text={t} color="#388bfd" />
          ))}
        </div>
      </div>
    </div>
  ),

  ingesta: (
    <div>
      <SectionTitle num="MÓDULO 01" title="Ingesta & Captura Automatizada" sub="Normalización de imágenes y captura reproducible del sitio en vivo con viewport consistente." />
      <p style={{ color: "#8b949e", lineHeight: "1.7", marginBottom: "1.5rem" }}>
        El primer problema en QA visual no es el modelo, es la <strong style={{ color: "#e6edf3" }}>consistencia de las condiciones de captura</strong>. 
        Un viewport distinto, un DPI diferente o un font rendering inconsistente generan cientos de falsos positivos.
        Playwright es preferido sobre Selenium por su soporte nativo de device pixel ratio y espera de red idle.
      </p>
      <CodeBlock lang="python · capture_screenshot.py" code={`import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
import cv2
import numpy as np

# Configuración del viewport — debe coincidir EXACTAMENTE
# con el breakpoint del diseño en Figma
VIEWPORT = {"width": 1440, "height": 900}
DEVICE_SCALE_FACTOR = 1  # 2 para Retina/HiDPI

async def capture_live_screenshot(url: str, output_path: str) -> np.ndarray:
    """
    Captura el sitio en vivo bajo condiciones controladas.
    Espera a que la red esté idle (no hay requests activos por 500ms)
    y a que el DOM esté completamente renderizado.
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            args=["--disable-gpu", "--no-sandbox",
                  "--disable-dev-shm-usage",
                  "--force-device-scale-factor=1"]
        )
        context = await browser.new_context(
            viewport=VIEWPORT,
            device_scale_factor=DEVICE_SCALE_FACTOR,
            # Fuentes del sistema consistentes en CI/CD
            locale="es-ES",
            color_scheme="light"
        )
        page = await context.new_page()

        # networkidle = no requests por 500ms → página completamente cargada
        await page.goto(url, wait_until="networkidle", timeout=30_000)

        # Esperar a que Web Fonts terminen de cargar (crítico para tipografía)
        await page.evaluate("document.fonts.ready")

        # Ocultar elementos dinámicos que generan ruido (cursors, tooltips)
        await page.add_style_tag(content="""
            *, *::before, *::after {
                animation-duration: 0s !important;
                transition-duration: 0s !important;
            }
            .cookie-banner, .chat-widget { display: none !important; }
        """)

        screenshot_bytes = await page.screenshot(
            full_page=False,  # Solo el viewport visible
            type="png"
        )
        await browser.close()

    # Convertir bytes → numpy array para OpenCV
    img_array = np.frombuffer(screenshot_bytes, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    # Guardar y retornar
    cv2.imwrite(output_path, img)
    print(f"[✓] Screenshot guardado: {output_path} | Shape: {img.shape}")
    return img


def load_and_normalize(img_path: str, target_size: tuple) -> np.ndarray:
    """
    Carga cualquier imagen (Figma export, screenshot) y la normaliza
    al mismo tamaño/espacio de color para comparación fair.
    """
    img = cv2.imread(img_path)
    if img is None:
        raise FileNotFoundError(f"No se pudo cargar: {img_path}")

    # Redimensionar preservando aspect ratio con padding si es necesario
    h, w = img.shape[:2]
    target_w, target_h = target_size

    scale = min(target_w / w, target_h / h)
    new_w, new_h = int(w * scale), int(h * scale)
    resized = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)

    # Padding para alcanzar target_size exacto
    canvas = np.zeros((target_h, target_w, 3), dtype=np.uint8)
    canvas[:new_h, :new_w] = resized

    return canvas


# Uso
if __name__ == "__main__":
    asyncio.run(capture_live_screenshot(
        url="https://mi-proyecto.vercel.app",
        output_path="sitio_en_vivo.png"
    ))
`} />
      <InfoBox type="warning">
        En CI/CD los sistemas no tienen GPU ni display. Playwright corre en modo headless por default, pero algunos sitios detectan headless y muestran contenido diferente. Usá <code style={{ color: "#a5d6ff" }}>--no-sandbox</code> y considera la librería <code style={{ color: "#a5d6ff" }}>playwright-stealth</code> para sitios con bot detection.
      </InfoBox>
    </div>
  ),

  comparacion: (
    <div>
      <SectionTitle num="MÓDULO 02" title="Lógica de Comparación con IA" sub="Segmentación semántica de UI + SSIM por región para comparación inteligente, no píxel-a-píxel." />
      <p style={{ color: "#8b949e", lineHeight: "1.7", marginBottom: "1rem" }}>
        La comparación naive (resta de píxeles) tiene una tasa de falsos positivos inaceptable. La estrategia correcta es:
        <strong style={{ color: "#e6edf3" }}> segmentar semánticamente → comparar por región → calcular métricas estructurales</strong>.
      </p>

      <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ color: "#8b949e", fontSize: "12px", fontFamily: "monospace", marginBottom: "12px" }}>MODELOS RECOMENDADOS — TRADE-OFFS</div>
        <div style={{ display: "grid", gap: "10px" }}>
          {[
            { model: "YOLOv8-UI", desc: "Detección de elementos UI (botones, inputs, imágenes). Velocidad alta, precisión media. Ideal para pipeline CI/CD.", badge: "⚡ RECOMENDADO", color: "#3fb950" },
            { model: "SAM (Segment Anything)", desc: "Meta's model para segmentación zero-shot. Excelente para Figma exports con formas arbitrarias.", badge: "🎯 Alta Precisión", color: "#388bfd" },
            { model: "LayoutLMv3", desc: "Transformer para document/UI layout understanding. Entiende jerarquía visual semánticamente.", badge: "🧠 Semántico", color: "#d2a8ff" },
            { model: "ResNet50 + FPN", desc: "Feature Pyramid Network para detectar elementos a múltiples escalas. Base sólida custom.", badge: "🔧 Customizable", color: "#f78166" },
          ].map(m => (
            <div key={m.model} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#0d1117", borderRadius: "8px", padding: "12px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ color: "#e6edf3", fontWeight: 700, fontFamily: "monospace", fontSize: "14px" }}>{m.model}</span>
                  <Badge text={m.badge} color={m.color} />
                </div>
                <div style={{ color: "#8b949e", fontSize: "13px" }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock lang="python · comparator.py" code={`import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim
from dataclasses import dataclass, field
from typing import List, Tuple
import torch

@dataclass
class UIElement:
    """Elemento detectado en la imagen."""
    label: str          # "button", "input", "text", "image", "nav"
    bbox: Tuple[int, int, int, int]  # x1, y1, x2, y2
    confidence: float
    region_ref: np.ndarray = field(default=None, repr=False)
    region_live: np.ndarray = field(default=None, repr=False)


class UISegmenter:
    """
    Wrapper sobre YOLOv8 fine-tuned en datasets de UI.
    Dataset sugerido: RICO (72k mobile UIs) o UIBert.
    Alternativa rápida: usar SAM con grid de puntos.
    """
    def __init__(self, model_path: str = "yolov8n-ui.pt"):
        from ultralytics import YOLO
        self.model = YOLO(model_path)

        # Labels del dataset RICO adaptado
        self.ui_classes = [
            "button", "text", "image", "input", "icon",
            "checkbox", "radio", "select", "nav", "card", "modal"
        ]

    def segment(self, img: np.ndarray) -> List[UIElement]:
        results = self.model(img, conf=0.35, iou=0.45, verbose=False)
        elements = []

        for box in results[0].boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            cls_idx = int(box.cls[0])
            conf = float(box.conf[0])

            elements.append(UIElement(
                label=self.ui_classes[cls_idx] if cls_idx < len(self.ui_classes) else "unknown",
                bbox=(x1, y1, x2, y2),
                confidence=conf
            ))
        return elements


class RegionComparator:
    """
    Compara regiones correspondientes entre imagen de referencia
    y sitio en vivo usando múltiples métricas.
    """
    def compute_ssim(self, img1: np.ndarray, img2: np.ndarray) -> dict:
        """
        SSIM: mide luminancia, contraste y estructura.
        Score 0→1. Threshold recomendado: < 0.85 = discrepancia.
        """
        # Redimensionar al mismo tamaño para comparación
        h = min(img1.shape[0], img2.shape[0])
        w = min(img1.shape[1], img2.shape[1])
        r1 = cv2.resize(img1, (w, h))
        r2 = cv2.resize(img2, (w, h))

        gray1 = cv2.cvtColor(r1, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(r2, cv2.COLOR_BGR2GRAY)

        score, diff_map = ssim(gray1, gray2, full=True)
        diff_map = (diff_map * 255).astype(np.uint8)

        return {
            "ssim_score": round(float(score), 4),
            "diff_map": diff_map,
            "is_ok": score >= 0.85
        }

    def compute_color_histogram(self, img1: np.ndarray, img2: np.ndarray) -> dict:
        """
        Correlación de histogramas en espacio HSV.
        Robusto a pequeñas traslaciones, sensible a cambios de color.
        """
        hsv1 = cv2.cvtColor(img1, cv2.COLOR_BGR2HSV)
        hsv2 = cv2.cvtColor(img2, cv2.COLOR_BGR2HSV)

        # Histograma 2D: Hue + Saturation (ignoramos Value/brillo)
        hist1 = cv2.calcHist([hsv1], [0, 1], None, [50, 60], [0, 180, 0, 256])
        hist2 = cv2.calcHist([hsv2], [0, 1], None, [50, 60], [0, 180, 0, 256])
        cv2.normalize(hist1, hist1)
        cv2.normalize(hist2, hist2)

        # Método Bhattacharyya: 0=idéntico, 1=completamente diferente
        score = cv2.compareHist(hist1, hist2, cv2.HISTCMP_BHATTACHARYYA)

        return {
            "color_diff": round(float(score), 4),
            "is_ok": score < 0.15  # Threshold: 15% de divergencia
        }

    def compute_dominant_color(self, img: np.ndarray, k: int = 3) -> List[str]:
        """K-Means para extraer colores dominantes → comparar HEX."""
        pixels = img.reshape(-1, 3).astype(np.float32)
        _, labels, centers = cv2.kmeans(
            pixels, k, None,
            (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2),
            10, cv2.KMEANS_RANDOM_CENTERS
        )
        colors = centers.astype(int).tolist()
        return [f"#{b:02x}{g:02x}{r:02x}" for b, g, r in colors]
`} />
    </div>
  ),

  deteccion: (
    <div>
      <SectionTitle num="MÓDULO 03" title="Detección de Errores Específicos" sub="Layout, color y tipografía — cada uno con su propia lógica de detección." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { icon: "📐", title: "Layout / Posición", desc: "Matching por IoU de bounding boxes. Threshold: desplazamiento > 5px o IoU < 0.85.", color: "#f78166" },
          { icon: "🎨", title: "Color", desc: "K-Means para colores dominantes + correlación de histogramas en HSV.", color: "#ffa657" },
          { icon: "🔤", title: "Tipografía", desc: "EasyOCR para texto + análisis de contornos de glifos para detectar cambios de fuente.", color: "#79c0ff" },
        ].map(e => (
          <div key={e.title} style={{ background: "#161b22", border: `1px solid ${e.color}44`, borderRadius: "10px", padding: "1.25rem" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{e.icon}</div>
            <div style={{ color: e.color, fontWeight: 700, fontSize: "14px", marginBottom: "6px" }}>{e.title}</div>
            <div style={{ color: "#8b949e", fontSize: "13px", lineHeight: "1.5" }}>{e.desc}</div>
          </div>
        ))}
      </div>

      <CodeBlock lang="python · detectors.py" code={`import cv2
import numpy as np
import easyocr
from typing import List, Dict, Tuple

# Inicializar OCR una sola vez (es costoso)
ocr_reader = easyocr.Reader(["es", "en"], gpu=False)


def compute_iou(box1: Tuple, box2: Tuple) -> float:
    """
    Intersection over Union entre dos bounding boxes.
    IoU = área_intersección / área_unión
    """
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])

    intersection = max(0, x2 - x1) * max(0, y2 - y1)
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])

    return intersection / (area1 + area2 - intersection + 1e-6)


def detect_layout_errors(
    elements_ref: List, elements_live: List,
    position_threshold_px: int = 5,
    iou_threshold: float = 0.85
) -> List[Dict]:
    """
    Compara posición y tamaño de elementos detectados.
    Usa Hungarian Algorithm implícito: matching greedy por IoU máximo.
    """
    errors = []
    matched_live = set()

    for elem_ref in elements_ref:
        best_match = None
        best_iou = 0

        for i, elem_live in enumerate(elements_live):
            if i in matched_live or elem_ref.label != elem_live.label:
                continue
            iou = compute_iou(elem_ref.bbox, elem_live.bbox)
            if iou > best_iou:
                best_iou = iou
                best_match = (i, elem_live)

        if best_match is None:
            errors.append({
                "type": "MISSING_ELEMENT",
                "element": elem_ref.label,
                "bbox_reference": elem_ref.bbox,
                "severity": "HIGH"
            })
            continue

        idx, match = best_match
        matched_live.add(idx)

        if best_iou < iou_threshold:
            # Calcular desplazamiento en px del centro
            cx_ref = (elem_ref.bbox[0] + elem_ref.bbox[2]) / 2
            cy_ref = (elem_ref.bbox[1] + elem_ref.bbox[3]) / 2
            cx_live = (match.bbox[0] + match.bbox[2]) / 2
            cy_live = (match.bbox[1] + match.bbox[3]) / 2
            displacement = ((cx_ref - cx_live)**2 + (cy_ref - cy_live)**2)**0.5

            if displacement > position_threshold_px:
                errors.append({
                    "type": "LAYOUT_DISPLACEMENT",
                    "element": elem_ref.label,
                    "bbox_reference": elem_ref.bbox,
                    "bbox_live": match.bbox,
                    "displacement_px": round(displacement, 2),
                    "iou": round(best_iou, 3),
                    "severity": "HIGH" if displacement > 20 else "MEDIUM"
                })

    return errors


def detect_typography_errors(
    img_ref: np.ndarray, img_live: np.ndarray,
    text_regions: List[Tuple]
) -> List[Dict]:
    """
    Usa EasyOCR para extraer texto y compararlo.
    Luego analiza contornos de glifos para detectar cambios de fuente
    (un cambio de fuente cambia la distribución de stroke-width).
    """
    errors = []

    for (x1, y1, x2, y2) in text_regions:
        region_ref = img_ref[y1:y2, x1:x2]
        region_live = img_live[y1:y2, x1:x2]

        # OCR en ambas regiones
        results_ref = ocr_reader.readtext(region_ref, detail=0)
        results_live = ocr_reader.readtext(region_live, detail=0)

        text_ref = " ".join(results_ref).strip().lower()
        text_live = " ".join(results_live).strip().lower()

        # Error de contenido de texto
        if text_ref != text_live:
            errors.append({
                "type": "TEXT_MISMATCH",
                "region": (x1, y1, x2, y2),
                "expected": text_ref,
                "found": text_live,
                "severity": "HIGH"
            })

        # Análisis de stroke-width para detectar cambio de fuente
        # Skeleton del texto → distribución de ancho de trazo
        gray_ref = cv2.cvtColor(region_ref, cv2.COLOR_BGR2GRAY)
        gray_live = cv2.cvtColor(region_live, cv2.COLOR_BGR2GRAY)

        _, bin_ref = cv2.threshold(gray_ref, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        _, bin_live = cv2.threshold(gray_live, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

        # Distancia transform → mide grosor del trazo
        dist_ref = cv2.distanceTransform(bin_ref, cv2.DIST_L2, 5)
        dist_live = cv2.distanceTransform(bin_live, cv2.DIST_L2, 5)

        mean_stroke_ref = float(dist_ref[dist_ref > 0].mean()) if dist_ref[dist_ref > 0].size else 0
        mean_stroke_live = float(dist_live[dist_live > 0].mean()) if dist_live[dist_live > 0].size else 0

        stroke_diff_pct = abs(mean_stroke_ref - mean_stroke_live) / (mean_stroke_ref + 1e-6)

        if stroke_diff_pct > 0.15:  # 15% de diferencia en peso de fuente
            errors.append({
                "type": "TYPOGRAPHY_FONT_CHANGE",
                "region": (x1, y1, x2, y2),
                "stroke_weight_ref": round(mean_stroke_ref, 3),
                "stroke_weight_live": round(mean_stroke_live, 3),
                "difference_pct": round(stroke_diff_pct * 100, 1),
                "severity": "MEDIUM"
            })

    return errors
`} />
    </div>
  ),

  output: (
    <div>
      <SectionTitle num="MÓDULO 04" title="Generación de Reporte" sub="Heatmap visual de diferencias + JSON estructurado listo para dashboards o tickets automáticos." />
      <CodeBlock lang="python · reporter.py" code={`import cv2
import numpy as np
import json
from datetime import datetime
from pathlib import Path
from typing import List, Dict
from dataclasses import asdict


def generate_heatmap_report(
    img_ref: np.ndarray,
    img_live: np.ndarray,
    ssim_diff_map: np.ndarray,
    all_errors: List[Dict],
    output_dir: str = "qa_reports"
) -> Dict:
    """
    Genera imagen de diferencia con heatmap rojo sobre screenshot en vivo
    y exporta JSON estructurado con todos los fallos encontrados.
    """
    Path(output_dir).mkdir(exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # ── 1. Crear heatmap a partir del diff_map de SSIM ──────────────────
    # Invertir: zonas DIFERENTES = valores altos = rojo
    diff_normalized = cv2.normalize(
        255 - ssim_diff_map, None, 0, 255, cv2.NORM_MINMAX
    ).astype(np.uint8)

    # Gaussian blur para suavizar artefactos de borde
    diff_blurred = cv2.GaussianBlur(diff_normalized, (21, 21), 0)

    # Aplicar colormap INFERNO (negro→rojo→amarillo)
    heatmap = cv2.applyColorMap(diff_blurred, cv2.COLORMAP_INFERNO)

    # ── 2. Overlay: heatmap sobre imagen en vivo ─────────────────────────
    img_live_rgb = cv2.resize(img_live, (ssim_diff_map.shape[1], ssim_diff_map.shape[0]))
    overlay = cv2.addWeighted(img_live_rgb, 0.55, heatmap, 0.45, 0)

    # ── 3. Dibujar bounding boxes de errores ────────────────────────────
    severity_colors = {
        "HIGH":   (0, 0, 255),    # Rojo
        "MEDIUM": (0, 165, 255),  # Naranja
        "LOW":    (0, 255, 255),  # Amarillo
    }

    for i, error in enumerate(all_errors):
        bbox = error.get("bbox_live") or error.get("region") or error.get("bbox_reference")
        if not bbox:
            continue

        x1, y1, x2, y2 = bbox
        color = severity_colors.get(error.get("severity", "LOW"), (255, 255, 0))

        # Rectángulo con label
        cv2.rectangle(overlay, (x1, y1), (x2, y2), color, 2)
        label = f"#{i+1} {error['type']}"
        (lw, lh), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.45, 1)
        cv2.rectangle(overlay, (x1, y1 - lh - 6), (x1 + lw + 4, y1), color, -1)
        cv2.putText(overlay, label, (x1 + 2, y1 - 3),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 0), 1)

    # ── 4. Panel de estadísticas (bottom strip) ──────────────────────────
    stats_h = 60
    stats_panel = np.zeros((stats_h, overlay.shape[1], 3), dtype=np.uint8)
    stats_panel[:] = (22, 27, 34)  # #161b22 GitHub dark

    high = sum(1 for e in all_errors if e.get("severity") == "HIGH")
    med  = sum(1 for e in all_errors if e.get("severity") == "MEDIUM")
    low  = sum(1 for e in all_errors if e.get("severity") == "LOW")

    stats_text = f"TOTAL: {len(all_errors)} errores  |  HIGH: {high}  MEDIUM: {med}  LOW: {low}  |  {timestamp}"
    cv2.putText(stats_panel, stats_text, (12, 38),
                cv2.FONT_HERSHEY_SIMPLEX, 0.55, (200, 200, 200), 1)

    final_img = np.vstack([overlay, stats_panel])

    # ── 5. Comparación lado a lado ───────────────────────────────────────
    ref_resized = cv2.resize(img_ref, (overlay.shape[1] // 2, overlay.shape[0]))
    live_resized = cv2.resize(img_live_rgb, (overlay.shape[1] // 2, overlay.shape[0]))

    divider = np.full((overlay.shape[0], 4, 3), (88, 166, 255), dtype=np.uint8)
    side_by_side = np.hstack([ref_resized, divider, live_resized])

    # ── 6. Guardar imágenes ──────────────────────────────────────────────
    heatmap_path = f"{output_dir}/diff_heatmap_{timestamp}.png"
    sbs_path     = f"{output_dir}/side_by_side_{timestamp}.png"
    cv2.imwrite(heatmap_path, final_img)
    cv2.imwrite(sbs_path, side_by_side)

    # ── 7. Exportar JSON ─────────────────────────────────────────────────
    report = {
        "meta": {
            "timestamp": timestamp,
            "tool": "VisualQA-AI v1.0",
            "viewport": "1440x900"
        },
        "summary": {
            "total_errors": len(all_errors),
            "by_severity": {"HIGH": high, "MEDIUM": med, "LOW": low},
            "status": "FAILED" if high > 0 else ("WARNING" if med > 0 else "PASSED")
        },
        "errors": all_errors,
        "artifacts": {
            "heatmap": heatmap_path,
            "side_by_side": sbs_path
        }
    }

    json_path = f"{output_dir}/report_{timestamp}.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False, default=str)

    print(f"[✓] Heatmap: {heatmap_path}")
    print(f"[✓] Reporte: {json_path}")
    print(f"[{'✓' if report['summary']['status'] == 'PASSED' else '✗'}] Status: {report['summary']['status']}")

    return report
`} />
      <InfoBox type="info">
        El JSON exportado es compatible directo con webhooks de <strong>Jira</strong> o <strong>Linear</strong> para crear tickets automáticos. También puede enviarse como artifact de GitHub Actions y visualizarse en el PR summary.
      </InfoBox>
    </div>
  ),

  cicd: (
    <div>
      <SectionTitle num="MÓDULO 05" title="Integración CI/CD — GitHub Actions" sub="El step de QA Visual como gate automático antes de cualquier deploy a producción." />
      <p style={{ color: "#8b949e", lineHeight: "1.7", marginBottom: "1.5rem" }}>
        El pipeline funciona así: el PR triggerea el job → se levanta un preview deploy (Vercel/Netlify) → 
        se captura el screenshot del preview → se compara contra los screenshots de referencia commiteados en el repo → 
        si hay errores HIGH, el job <strong style={{ color: "#f78166" }}>falla y bloquea el merge</strong>.
      </p>
      <CodeBlock lang="yaml · .github/workflows/visual-qa.yml" code={`name: Visual QA — Frontend Regression

on:
  pull_request:
    branches: [main, staging]
    paths:
      - "src/**"
      - "public/**"
      - "*.css"

concurrency:
  group: group: visual-qa-$&#123;&#123; github.ref &#125;&#125;
  cancel-in-progress: true

jobs:
  visual-qa:
    name: 🔬 Visual Regression Check
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # Cache de dependencias de Python para velocidad
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: "pip"

      - name: Install dependencies
        run: |
          pip install opencv-python-headless playwright easyocr \\
                      scikit-image ultralytics numpy pillow
          playwright install chromium --with-deps

      # Esperar a que el preview deploy esté listo (Vercel)
      - name: Wait for Preview Deploy
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        id: vercel_preview
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
          max_timeout: 120

      # Capturar screenshot del preview
      - name: Capture Live Screenshot
        run: |
          python -c "
          import asyncio
          from capture_screenshot import capture_live_screenshot
          asyncio.run(capture_live_screenshot(
              url='\${{ steps.vercel_preview.outputs.url }}',
              output_path='sitio_en_vivo.png'
          ))
          "

      # Ejecutar comparación completa
      - name: Run Visual QA Analysis
        run: |
          python run_qa.py \\
            --reference screenshots/reference/homepage.png \\
            --live sitio_en_vivo.png \\
            --output qa_reports/ \\
            --fail-on HIGH  # Solo falla en errores críticos

      # Subir reporte como artifact del PR
      - name: Upload QA Report
        uses: actions/upload-artifact@v4
        if: always()  # Subir incluso si el job falla
        with:
          name: visual-qa-report-$&#123;&#123; github.sha &#125;&#125;
          path: qa_reports/
          retention-days: 30

      # Comentar en el PR con el resumen
      - name: Post PR Comment
        uses: actions/github-script@v7
        if: always()
        with:
          script: |
            const fs = require('fs');
            const reports = fs.readdirSync('qa_reports')
              .filter(f => f.endsWith('.json'));

            if (reports.length === 0) return;

            const report = JSON.parse(
              fs.readFileSync(\`qa_reports/\${reports[0]}\`)
            );
            const { summary } = report;

            const emoji = summary.status === 'PASSED' ? '✅' :
                          summary.status === 'WARNING' ? '⚠️' : '❌';

            const body = \`## \${emoji} Visual QA Report

| Severity | Count |
|----------|-------|
| 🔴 HIGH  | \${summary.by_severity.HIGH} |
| 🟠 MEDIUM | \${summary.by_severity.MEDIUM} |
| 🟡 LOW   | \${summary.by_severity.LOW} |

**Status: \${summary.status}** | Total: \${summary.total_errors} issues

[Ver reporte completo en Artifacts](\${context.serverUrl}/\${context.repo.owner}/\${context.repo.repo}/actions/runs/\${context.runId})
\`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body
            });
`} />

      <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "1.5rem", marginTop: "1.5rem" }}>
        <div style={{ color: "#8b949e", fontSize: "12px", fontFamily: "monospace", marginBottom: "12px" }}>ESTRATEGIA DE BASELINE — GESTIÓN DE SCREENSHOTS DE REFERENCIA</div>
        <div style={{ display: "grid", gap: "10px" }}>
          {[
            { num: "01", title: "Screenshots commiteados", desc: "Los PNG de referencia viven en /screenshots/reference/ en el repo. Se actualizan manualmente con un workflow especial que requiere aprobación de team lead." },
            { num: "02", title: "Branch-aware baselines", desc: "Para feature branches de larga duración, cada branch puede tener su propio baseline. El job usa git diff para determinar qué baseline comparar." },
            { num: "03", title: "Approval gate", desc: "Si el QA falla por cambios INTENCIONALES de diseño, el dev puede comentar /approve-visual-qa en el PR para hacer bypass documentado una única vez." },
          ].map(s => (
            <div key={s.num} style={{ display: "flex", gap: "12px", background: "#0d1117", borderRadius: "8px", padding: "12px" }}>
              <div style={{ color: "#388bfd", fontFamily: "monospace", fontWeight: 700, fontSize: "18px", minWidth: "28px" }}>{s.num}</div>
              <div>
                <div style={{ color: "#e6edf3", fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{s.title}</div>
                <div style={{ color: "#8b949e", fontSize: "13px", lineHeight: "1.5" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  arquitectura: (
    <div>
      <SectionTitle title="Arquitectura del Sistema" sub="Flujo completo de datos desde captura hasta reporte." />
      <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: "12px", padding: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "16px", alignItems: "center", width: "100%" }}>
            <ArchNode label="Figma Export" sublabel="PNG referencia" color="#a371f7" />
            <div style={{ color: "#8b949e", fontSize: "12px", fontFamily: "monospace" }}>INPUT</div>
            <ArchNode label="Playwright" sublabel="Screenshot vivo" color="#3fb950" />
          </div>
          <div style={{ display: "flex", gap: "80px" }}>
            <Arrow /><Arrow />
          </div>
          <ArchNode label="Normalizer" sublabel="Resize + Color space" color="#388bfd" />
          <Arrow />
          <ArchNode label="UI Segmenter" sublabel="YOLOv8 → BBoxes" color="#d29922" />
          <Arrow />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", width: "100%" }}>
            <ArchNode label="Layout Check" sublabel="IoU matching" color="#f78166" />
            <ArchNode label="Color Check" sublabel="HSV histogram" color="#ffa657" />
            <ArchNode label="OCR Check" sublabel="EasyOCR + stroke" color="#79c0ff" />
          </div>
          <div style={{ display: "flex", gap: "60px" }}>
            <Arrow /><Arrow /><Arrow />
          </div>
          <ArchNode label="SSIM Computer" sublabel="Region-level scoring" color="#56d364" />
          <Arrow />
          <ArchNode label="Reporter" sublabel="Heatmap + JSON" color="#e6edf3" />
          <Arrow />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "80%" }}>
            <ArchNode label="GitHub Actions" sublabel="PR Gate / Artifact" color="#8b949e" />
            <ArchNode label="Jira / Linear" sublabel="Auto-tickets" color="#8b949e" />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem", background: "#161b22", border: "1px solid #30363d", borderRadius: "10px", padding: "1.25rem" }}>
        <div style={{ color: "#8b949e", fontSize: "12px", fontFamily: "monospace", marginBottom: "12px" }}>ROADMAP — EVOLUCIÓN DEL PROYECTO</div>
        <div style={{ display: "grid", gap: "8px" }}>
          {[
            { phase: "v1.0", items: "SSIM + pixel diff básico. Sin modelo de DL. Output: heatmap.", color: "#56d364" },
            { phase: "v1.5", items: "Integrar YOLOv8-UI. Detección semántica de elementos. OCR con EasyOCR.", color: "#3fb950" },
            { phase: "v2.0", items: "Fine-tuning del detector en tu design system específico (tokens Figma). API REST con FastAPI.", color: "#388bfd" },
            { phase: "v2.5", items: "Dashboard web con histórico de regresiones. Integración con Figma API para baseline automática.", color: "#a371f7" },
          ].map(r => (
            <div key={r.phase} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#0d1117", borderRadius: "8px", padding: "10px 12px" }}>
              <Badge text={r.phase} color={r.color} />
              <div style={{ color: "#8b949e", fontSize: "13px", paddingTop: "2px" }}>{r.items}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export default function App() {
  const [active, setActive] = useState("overview");

  return (
    <div style={{
      minHeight: "100vh", background: "#0d1117", color: "#e6edf3",
      fontFamily: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "#161b22", borderBottom: "1px solid #30363d",
        padding: "0 1.5rem", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem", height: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px", background: "linear-gradient(135deg, #388bfd, #a371f7)",
              borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px"
            }}>🔬</div>
            <span style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em" }}>VisualQA·AI</span>
            <Badge text="v1.0 Blueprint" color="#3fb950" />
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ color: "#8b949e", fontSize: "12px", fontFamily: "monospace" }}>
            Python · OpenCV · YOLOv8 · Playwright
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <div style={{
        background: "#161b22", borderBottom: "1px solid #21262d",
        padding: "0 1.5rem", overflowX: "auto"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "0" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === s.id ? "#e6edf3" : "#8b949e",
              borderBottom: active === s.id ? "2px solid #f78166" : "2px solid transparent",
              padding: "12px 16px", fontSize: "13px", fontFamily: "monospace",
              fontWeight: active === s.id ? 600 : 400,
              whiteSpace: "nowrap", transition: "color 0.15s",
              letterSpacing: "0.02em"
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {content[active]}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #21262d", padding: "12px 1.5rem",
        display: "flex", justifyContent: "center", gap: "1rem"
      }}>
        <span style={{ color: "#484f58", fontSize: "12px", fontFamily: "monospace" }}>
          VisualQA-AI · Portfolio Project Blueprint · MIT License
        </span>
      </div>
    </div>
  );
}
