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
        className="fixed bottom-8 right-8 px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 font-semibold z-40 border-2 border-white"
      >
        <span className="text-2xl">🔲</span>
        <span className="hidden sm:inline">Generate QR</span>
      </button>

      {/* ✅ Compact, Square Popup */}
      {showQR && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white rounded-3xl shadow-2xl w-96 h-96 flex flex-col items-center justify-between p-6">
            {/* Close */}
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* QR Title */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">Pickup QR Code</h2>
              <p className="text-sm text-gray-600">Share this with your driver</p>
            </div>

            {/* QR Canvas */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <canvas ref={canvasRef} className="w-44 h-44" />
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={downloadQRCode}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                📥 Download
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(qrValue);
                  alert('Code copied!');
                }}
                className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                📋 Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
