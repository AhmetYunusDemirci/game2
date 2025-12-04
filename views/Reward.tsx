import React, { useRef, useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { generateRewardSticker } from '../services/geminiService';
import { Character, SoundEffect } from '../types';
import { Button } from '../components/Button';
import { Download, Sparkles, RefreshCcw } from 'lucide-react';

interface RewardProps {
  character: Character;
  onRestart: () => void;
}

export const Reward: React.FC<RewardProps> = ({ character, onRestart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#FF0000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [generatedSticker, setGeneratedSticker] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    audioService.speak("Resim yapabilirsin veya sihirli bir çıkartma oluşturabilirsin!");
    // Init canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
       x = e.touches[0].clientX - rect.left;
       y = e.touches[0].clientY - rect.top;
    } else {
       x = (e as React.MouseEvent).clientX - rect.left;
       y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleGenerateSticker = async () => {
    audioService.playSound(SoundEffect.CLICK);
    setGenerating(true);
    audioService.speak("Sihirli çıkartma hazırlanıyor... Bekle...");
    
    const sticker = await generateRewardSticker(character.description);
    if (sticker) {
      setGeneratedSticker(sticker);
      audioService.playSound(SoundEffect.SUCCESS);
      audioService.speak("İşte hediyen!");
    } else {
      audioService.speak("Bir hata oldu, tekrar dene.");
    }
    setGenerating(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if(canvas) {
        const link = document.createElement('a');
        link.download = 'resim.png';
        link.href = canvas.toDataURL();
        link.click();
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center bg-purple-100 p-2 md:p-4">
      <h2 className="text-3xl font-bold text-purple-600 mb-2">Ödül Zamanı!</h2>
      
      <div className="flex gap-4 w-full max-w-5xl flex-1 min-h-0">
        
        {/* Drawing Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden relative border-4 border-purple-300 flex flex-col">
          <canvas
            ref={canvasRef}
            className="w-full h-full touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
          />
          
          {/* Color Palette */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 p-2 rounded-full shadow-lg flex gap-2">
            {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500'].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-full border-2 ${color === c ? 'border-black scale-110' : 'border-white'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* AI Sticker Panel */}
        <div className="w-1/3 bg-white rounded-3xl shadow-xl p-4 flex flex-col items-center gap-4 border-4 border-yellow-300">
           <h3 className="font-bold text-center text-gray-600">Sihirli Çıkartma</h3>
           <div className="flex-1 w-full bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {generating ? (
                <Sparkles className="animate-spin text-yellow-500" size={48} />
              ) : generatedSticker ? (
                <img src={generatedSticker} alt="Sticker" className="object-contain w-full h-full animate-bounce" />
              ) : (
                <div className="text-6xl opacity-20">?</div>
              )}
           </div>
           <Button 
             variant="primary" 
             onClick={handleGenerateSticker} 
             disabled={generating}
             className="w-full text-lg py-3 px-2"
           >
             {generating ? '...' : 'Oluştur'}
           </Button>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
         <Button onClick={handleDownload} variant="secondary" icon={<Download />}>Kaydet</Button>
         <Button onClick={onRestart} variant="success" icon={<RefreshCcw />}>Baştan Başla</Button>
      </div>
    </div>
  );
};