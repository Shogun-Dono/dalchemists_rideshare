import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { X } from 'lucide-react';

export default function QRCodePopup() {
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateUniqueQRCode = async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const uniqueCode = `PICKUP-${timestamp}-${randomStr}`;
    setQrValue(uniqueCode);
    setShowQR(true);
  };

  useEffect(() => {
    if (qrValue && canvasRef.current && showQR) {
      QRCode.toCanvas(canvasRef.current, qrValue, {
        width: 256,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      }).catch(console.error);
    }
  }, [qrValue, showQR]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = `pickup-qr-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={generateUniqueQRCode}
        className="fixed bottom-8 right-8 px-6 py-4 bg-[#f0a824] text-[#22477a] rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 font-semibold z-40 border-2 border-[#000000]"
      >
        <span className="text-2xl">🔲</span>
        <span className="hidden sm:inline">Generate QR</span>
      </button>

      {/* QR Code Popup */}
      {showQR && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-[#f0ebe1] rounded-3xl shadow-2xl w-96 h-96 flex flex-col items-center justify-between p-6 border-2 border-[#22477a]">
            {/* Close Button */}
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#b8ccde] rounded-full transition"
            >
              <X className="w-6 h-6 text-[#22477a]" />
            </button>

            {/* QR Title */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#22477a]">Pickup QR Code</h2>
              <p className="text-sm text-[#22477a]">Share this with your driver</p>
            </div>

            {/* QR Canvas */}
            <div className="bg-[#f0ebe1] rounded-2xl p-4 border-2 border-[#b8ccde]">
              <canvas ref={canvasRef} className="w-44 h-44" />
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={downloadQRCode}
                className="w-full py-2 bg-[#22477a] text-[#f0ebe1] rounded-lg font-semibold hover:bg-[#1a366a] transition"
              >
                📥 Download
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrValue);
                  alert('Code copied!');
                }}
                className="w-full py-2 bg-[#f0a824] text-[#22477a] rounded-lg font-semibold hover:bg-[#e09820] transition"
              >
                📋 Copy Code
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="w-full py-2 bg-[#b8ccde] text-[#22477a] rounded-lg font-semibold hover:bg-[#a0b8d0] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}