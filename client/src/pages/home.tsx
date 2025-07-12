import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link, FileText, Clock, Shield, Smartphone, Accessibility, ArrowRight, ChevronDown, ChevronUp, Info, Quote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [content, setContent] = useState<string>('');
  const [isContentAvailable, setIsContentAvailable] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const extractUrlParameter = () => {
      const urlParams = new URLSearchParams(window.location.search);
      // Try multiple parameter names for flexibility
      const paramNames = ['content', 'text', 'data', 'msg', 'message'];
      
      for (const param of paramNames) {
        const value = urlParams.get(param);
        if (value) {
          return decodeURIComponent(value);
        }
      }
      return null;
    };

    const urlContent = extractUrlParameter();
    if (urlContent && urlContent.trim()) {
      setContent(urlContent);
      setIsContentAvailable(true);
      setLastUpdated('Just now');
    } else {
      setContent('');
      setIsContentAvailable(false);
      setLastUpdated('');
    }
  }, []);

  const copyToClipboard = async () => {
    if (!content) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setIsCopied(true);
      toast({
        description: "Content copied to clipboard!",
      });

      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      toast({
        variant: "destructive",
        description: "Failed to copy to clipboard. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4">
              URL Parameter Display
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Content from your URL parameter will be displayed below with an easy copy option
            </p>
          </div>
          
          {/* Content Card */}
          <Card className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
            {/* Content Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-slate-800">
                  <Link className="text-blue-600 mr-2 inline-block" size={20} />
                  Parameter Content
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
                    {content.length} characters
                  </span>
                  {lastUpdated && (
                    <span className="text-sm text-slate-500 flex items-center">
                      <Clock className="mr-1" size={12} />
                      {lastUpdated}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Content Display Area */}
            <CardContent className="p-8">
              <div className="mb-8">
                {!isContentAvailable ? (
                  // Empty State
                  <div className="min-h-[200px] flex items-center justify-center">
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <FileText className="text-2xl text-slate-400" size={32} />
                      </div>
                      <h3 className="text-xl font-medium text-slate-600 mb-2">No Content Found</h3>
                      <p className="text-slate-500 max-w-md mx-auto mb-4">
                        Add a URL parameter to see content displayed here. For example: <code className="bg-slate-100 px-2 py-1 rounded text-sm">?content=your-text-here</code>
                      </p>
                      <div className="text-sm text-slate-400 flex items-center justify-center">
                        <Info className="mr-1" size={14} />
                        Parameters are automatically decoded and displayed
                      </div>
                    </div>
                  </div>
                ) : (
                  // Content Display
                  <div className="w-full">
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 relative">
                      <div className="absolute top-3 right-3">
                        <Quote className="text-slate-300" size={20} />
                      </div>
                      <div className="text-slate-800 text-lg leading-relaxed font-medium whitespace-pre-wrap break-words">
                        {content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Copy Button */}
              <div className="text-center">
                <Button
                  onClick={copyToClipboard}
                  disabled={!isContentAvailable}
                  className={`inline-flex items-center px-8 py-4 font-medium rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isCopied 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-3" size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-3" size={18} />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                
                {/* Copy Success Message */}
                {isCopied && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg animate-pulse">
                      <Check className="mr-2" size={16} />
                      <span>Copied to clipboard!</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            {/* Footer Info */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center">
                  <Shield className="mr-2" size={16} />
                  <span>Content processed client-side for privacy</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Smartphone className="mr-1" size={14} />
                    <span>Mobile Friendly</span>
                  </div>
                  <div className="flex items-center">
                    <Accessibility className="mr-1" size={14} />
                    <span>Accessible</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Help Section */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="cursor-pointer text-slate-600 hover:text-slate-800 transition-colors inline-flex items-center"
            >
              <Info className="mr-2" size={16} />
              How to use this tool
              {isHelpOpen ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />}
            </button>
            
            {isHelpOpen && (
              <div className="mt-4 bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-left max-w-2xl mx-auto animate-fade-in">
                <h3 className="font-semibold text-slate-800 mb-3">Usage Instructions:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <ArrowRight className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Add your content as a URL parameter: <code className="bg-slate-100 px-2 py-1 rounded text-sm">?content=your-text-here</code></span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Special characters and spaces are automatically handled</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Click the copy button to copy the content to your clipboard</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Works on all modern browsers and devices</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
