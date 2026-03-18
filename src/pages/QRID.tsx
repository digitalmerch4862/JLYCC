import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAppContext } from '../context/AppContext';
import { QrCode, Printer, AlertCircle, Heart, Scan, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';

const VenueScanner = () => {
  const { currentProfile, addAttendance, events, attendance } = useAppContext();
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setScanResult(null);
      setIsScanning(true);
      
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader");
      }

      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        (errorMessage) => {
          // Ignore scanning errors
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      setScanResult({ success: false, message: "Could not start camera. Please check permissions." });
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  const handleScanSuccess = async (decodedText: string) => {
    if (!currentProfile) return;
    
    await stopScanning();

    const event = events.find(e => e.id === decodedText);
    
    if (event) {
      // Check if already checked in
      const alreadyCheckedIn = attendance.some(
        a => a.memberId === currentProfile.id && a.eventId === event.id
      );

      if (alreadyCheckedIn) {
        setScanResult({ success: true, message: `You are already checked in to ${event.title}!` });
      } else {
        addAttendance({
          memberId: currentProfile.id,
          eventId: event.id,
          attendanceType: event.eventType,
          attendanceStatus: 'Present',
          checkinMethod: 'QR Scan',
          checkinTime: new Date().toISOString(),
          recordedBy: currentProfile.id,
        });
        setScanResult({ success: true, message: `Successfully checked in to ${event.title}!` });
      }
    } else {
      setScanResult({ success: false, message: 'Invalid Event QR Code. Please try again.' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {scanResult ? (
        <div className={`p-6 rounded-2xl text-center max-w-sm w-full ${scanResult.success ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
          {scanResult.success ? (
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          ) : (
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <h3 className={`text-lg font-bold mb-2 ${scanResult.success ? 'text-emerald-800' : 'text-red-800'}`}>
            {scanResult.success ? 'Check-in Successful!' : 'Check-in Failed'}
          </h3>
          <p className={`mb-6 ${scanResult.success ? 'text-emerald-600' : 'text-red-600'}`}>
            {scanResult.message}
          </p>
          <button
            onClick={() => setScanResult(null)}
            className="w-full py-2 px-4 bg-white border border-stone-300 rounded-lg shadow-sm text-stone-700 font-medium hover:bg-stone-50 transition-colors"
          >
            Scan Another Code
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 mb-4">
            <div id="qr-reader" className="w-full overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900 min-h-[250px] flex items-center justify-center">
              {!isScanning && (
                <div className="text-stone-400 flex flex-col items-center">
                  <Scan size={48} className="mb-2 opacity-50" />
                  <p>Camera is off</p>
                </div>
              )}
            </div>
          </div>
          
          {isScanning ? (
            <button
              onClick={stopScanning}
              className="w-full py-3 px-4 bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-800 dark:text-white rounded-xl font-medium transition-colors"
            >
              Stop Scanning
            </button>
          ) : (
            <button
              onClick={startScanning}
              className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center"
            >
              <Scan className="mr-2 h-5 w-5" />
              Start Camera to Scan
            </button>
          )}
          
          <p className="text-center text-sm text-stone-500 mt-4">
            Point your camera at the event QR code to record your attendance.
          </p>
        </div>
      )}
    </div>
  );
};

const QRID = () => {
  const { currentProfile } = useAppContext();
  const printRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'digital' | 'venue'>('digital');

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open('', '', 'width=900,height=650');
    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Print QR ID</title>
            <style>
              body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f5f5f4; }
              .card { background: white; border-radius: 16px; padding: 32px; width: 320px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e5e5e4; }
              .header { display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #db2777; }
              .header svg { margin-right: 8px; }
              .title { font-size: 20px; font-weight: bold; margin: 0; color: #1c1917; }
              .subtitle { font-size: 12px; color: #78716c; margin-top: 4px; margin-bottom: 0; }
              .qr-container { background: white; padding: 16px; border-radius: 12px; border: 2px dashed #e5e5e4; display: inline-block; margin-bottom: 24px; }
              .name { font-size: 24px; font-weight: 800; color: #1c1917; margin: 0 0 8px 0; letter-spacing: -0.5px; }
              .role { font-size: 14px; font-weight: 600; color: #db2777; text-transform: uppercase; letter-spacing: 1px; margin: 0; }
              .footer { margin-top: 32px; font-size: 10px; color: #a8a29e; border-top: 1px solid #f5f5f4; padding-top: 16px; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      windowPrint.document.close();
      windowPrint.focus();
      setTimeout(() => {
        windowPrint.print();
        windowPrint.close();
      }, 250);
    }
  };

  if (!currentProfile) return <div>Loading...</div>;

  if (!currentProfile.profileCompleted || !currentProfile.qrCodeValue) {
    return (
      <div className="max-w-2xl mx-auto font-sans">
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">Profile Incomplete</h3>
              <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                <p>You need to complete your profile before your QR ID can be generated.</p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <Link
                    to="/profile"
                    className="bg-amber-100 dark:bg-amber-800 px-3 py-2 rounded-md text-sm font-medium text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors"
                  >
                    Go to Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto font-sans">
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center">
            <QrCode className="mr-3 text-pink-600 dark:text-pink-400" size={32} />
            Check-In & ID
          </h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">
            Present your ID or scan an event QR code to record attendance.
          </p>
        </div>
        {activeTab === 'digital' && (
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center px-4 py-2 border border-stone-300 dark:border-stone-600 shadow-sm text-sm font-medium rounded-lg text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print ID
          </button>
        )}
      </div>

      <div className="bg-stone-200/50 dark:bg-stone-800/50 p-1 rounded-xl flex mb-8">
        <button
          onClick={() => setActiveTab('digital')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'digital'
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
          }`}
        >
          <div className="flex items-center justify-center">
            <QrCode className="w-4 h-4 mr-2" />
            Digital ID
          </div>
        </button>
        <button
          onClick={() => setActiveTab('venue')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'venue'
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
          }`}
        >
          <div className="flex items-center justify-center">
            <Scan className="w-4 h-4 mr-2" />
            Venue Scanning
          </div>
        </button>
      </div>

      {activeTab === 'digital' ? (
        <div className="flex justify-center">
          {/* Printable Card Container */}
          <div 
            ref={printRef}
            className="bg-white dark:bg-stone-800 rounded-3xl p-8 shadow-lg border border-stone-200 dark:border-stone-700 w-full max-w-sm text-center relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-50 to-white dark:from-pink-900/20 dark:to-stone-800 opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400">
                <Heart className="mr-2" size={24} fill="currentColor" />
                <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">JLYCC</h2>
              </div>
              
              <div className="bg-white p-4 rounded-2xl inline-block mb-6 shadow-sm border border-stone-100">
                <QRCodeSVG 
                  value={currentProfile.qrCodeValue} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  fgColor="#1c1917"
                  bgColor="#ffffff"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                  {currentProfile.shortDisplayName}
                </h3>
                <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-widest">
                  {currentProfile.currentChurchStatus}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-700">
                <p className="text-xs text-stone-400 dark:text-stone-500">
                  Jesus Loves You Celebration Church<br/>
                  Official Member ID
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VenueScanner />
      )}
    </div>
  );
};

export default QRID;
