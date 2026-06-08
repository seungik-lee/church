import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Camera as CameraIcon } from "lucide-react";
import { useNavigate } from "react-router";
import jsQR from "jsqr";

export function QrScan() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const stopAll = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      stopAll();
      navigate("/offering/payment/tithe");
    };

    const tick = () => {
      if (cancelled) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const w = video.videoWidth;
        const h = video.videoHeight;
        if (w && h) {
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d", { willReadFrequently: true } as any);
          if (ctx) {
            ctx.drawImage(video, 0, 0, w, h);
            try {
              const imageData = ctx.getImageData(0, 0, w, h);
              const code = jsQR(imageData.data, w, h, { inversionAttempts: "dontInvert" });
              if (code) {
                finish();
                return;
              }
            } catch {}
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setError("이 기기에서는 카메라를 사용할 수 없습니다.");
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        rafRef.current = requestAnimationFrame(tick);
      } catch (e: any) {
        setError(
          e?.name === "NotAllowedError"
            ? "카메라 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요."
            : "카메라를 실행할 수 없습니다."
        );
      }
    };

    start();

    return () => {
      cancelled = true;
      stopAll();
    };
  }, [navigate]);

  return (
    <div className="min-h-full flex flex-col bg-black relative">
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-5 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <ChevronLeft size={18} style={{ color: "#FFFFFF" }} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">QR 스캔</h1>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <CameraIcon size={28} style={{ color: "#FFFFFF" }} />
            </div>
            <p className="text-white text-sm leading-relaxed">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-64 h-64 rounded-3xl"
                style={{
                  border: "3px solid #FFFFFF",
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
                }}
              />
            </div>
            <div className="absolute bottom-10 left-0 right-0 text-center px-8">
              <p className="text-white text-sm font-bold">QR 코드를 사각형 안에 맞춰주세요</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
