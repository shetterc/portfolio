import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { type AirtableAttachment } from '../types';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFCarouselProps {
  pdfs: AirtableAttachment[];
  className?: string;
}

export const PDFCarousel: React.FC<PDFCarouselProps> = ({ pdfs, className = '' }) => {
  const [currentPDFIndex, setCurrentPDFIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [scale, setScale] = useState(0.8); // Start with smaller scale
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add timeout to prevent infinite loading
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('PDF loading timeout, falling back to direct link');
        setError('PDF loading timed out');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [loading, currentPDFIndex]);

  if (!pdfs || pdfs.length === 0) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-600 dark:text-gray-400">No PDFs available</p>
      </div>
    );
  }

  const currentPDF = pdfs[currentPDFIndex];

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('PDF loaded successfully with', numPages, 'pages');
    setTotalPages(numPages);
    setCurrentPage(1);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF');
    setLoading(false);
  };

  const goToPreviousPDF = () => {
    if (currentPDFIndex > 0) {
      setCurrentPDFIndex(currentPDFIndex - 1);
      setLoading(true);
      setError(null);
    }
  };

  const goToNextPDF = () => {
    if (currentPDFIndex < pdfs.length - 1) {
      setCurrentPDFIndex(currentPDFIndex + 1);
      setLoading(true);
      setError(null);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.4));
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = currentPDF.url;
    link.download = currentPDF.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentPDF.filename}
            </h3>
            {pdfs.length > 1 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PDF {currentPDFIndex + 1} of {pdfs.length}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* PDF Navigation */}
            {pdfs.length > 1 && (
              <>
                <button
                  onClick={goToPreviousPDF}
                  disabled={currentPDFIndex === 0}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Previous PDF"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNextPDF}
                  disabled={currentPDFIndex === pdfs.length - 1}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Next PDF"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            {/* Zoom Controls */}
            <button
              onClick={zoomOut}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={20} />
            </button>
            
            {/* Download Button */}
            <button
              onClick={downloadPDF}
              className="p-2 rounded-md bg-ops-100 dark:bg-ops-900 text-ops-600 dark:text-ops-400 hover:bg-ops-200 dark:hover:bg-ops-800 transition-colors"
              title="Download PDF"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="relative bg-gray-100 dark:bg-gray-800 min-h-[600px] flex flex-col">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ops-600"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Unable to display PDF. You can download it directly:
              </p>
              <a
                href={currentPDF.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-ops-600 text-white rounded-lg hover:bg-ops-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Download PDF
              </a>
            </div>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
          <Document
            file={currentPDF.url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            className="max-w-full"
          >
            <Page
              pageNumber={currentPage}
              scale={scale}
              className="shadow-lg"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>

        {/* Page Navigation */}
        {totalPages > 1 && !loading && !error && (
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <ChevronLeft size={20} />
              </button>
              
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};