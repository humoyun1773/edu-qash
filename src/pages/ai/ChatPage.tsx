import React, { useState, useRef } from 'react';
import { MessageSquare, Send, Paperclip, Mic, Loader2, Image as ImageIcon, FileText, X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useToast } from '../../context/ToastContext';

export const ChatPage: React.FC = () => {
  const { toast } = useToast();
  const { threads, activeThread, activeThreadId, setActiveThreadId, loading, sendMessage } = useChat();
  const [inputMsg, setInputMsg] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [attachedFile, setAttachedFile] = useState<{ name: string; url: string; type: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<any>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputMsg.trim() && !attachedFile) || !activeThreadId) return;

    let textToSend = inputMsg.trim();
    if (attachedFile) {
      textToSend = `[Fayl: ${attachedFile.name}] ${textToSend}`;
    }

    setInputMsg('');
    setAttachedFile(null);
    await sendMessage(activeThreadId, textToSend);
  };

  const handleSimulateVoice = () => {
    if (!activeThreadId) return;
    if (isRecordingVoice) {
      // Stop recording
      clearInterval(timerRef.current);
      setIsRecordingVoice(false);
      const recordedTime = voiceSeconds || 3;
      setVoiceSeconds(0);
      sendMessage(activeThreadId, `🎤 Ovozli xabar (0:${recordedTime < 10 ? '0' + recordedTime : recordedTime})`);
      toast.success('Ovozli xabar yuborildi', 'Media');
    } else {
      // Start recording
      setIsRecordingVoice(true);
      setVoiceSeconds(1);
      timerRef.current = setInterval(() => {
        setVoiceSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setAttachedFile({
      name: file.name,
      url: fileUrl,
      type: file.type.startsWith('image/') ? 'image' : 'document',
    });
    toast.success(`${file.name} biriktirildi`, 'Fayl Biriktirish');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {loading ? (
        <div className="glass-card flex items-center justify-center h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <span className="ml-3 text-slate-600 dark:text-slate-400 font-semibold">Chatlar yuklanmoqda...</span>
        </div>
      ) : threads.length === 0 ? (
        <div className="glass-card text-center py-20 border-indigo-500/20">
          <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Chatlar Topilmadi</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hozircha faol chat suhbatlari mavjud emas.</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 h-[680px]">
          
          {/* Threads Sidebar */}
          <div className="border-r border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 p-4 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Chatlar
              </h3>
              <span className="badge badge-indigo">Real-Time</span>
            </div>

            <div className="space-y-2">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    t.id === activeThreadId
                      ? 'bg-indigo-600/10 dark:bg-indigo-600/20 border-indigo-500 text-indigo-600 dark:text-white font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  <img src={t.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-0.5">
                      <span className="font-bold truncate text-slate-900 dark:text-white">{t.name}</span>
                      <span className="text-[10px] text-slate-500">{t.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{t.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {activeThread && (
            <div className="md:col-span-2 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/40">
              
              {/* Active Thread Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <img src={activeThread.avatar} alt="" className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activeThread.name}</h4>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Online • {activeThread.role}</span>
                  </div>
                </div>
              </div>

              {/* Messages Window */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                {(activeThread.messages || []).map((m: any) => (
                  <div
                    key={m.id}
                    className={`flex gap-3 max-w-md ${m.isMe ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <img src={m.senderAvatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
                    <div className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                      m.isMe ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between text-[10px] opacity-80 gap-4 mb-0.5">
                        <span className="font-bold">{m.senderName}</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="leading-relaxed font-medium">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voice Recording Pill Banner */}
              {isRecordingVoice && (
                <div className="px-4 py-2 bg-rose-500/10 border-t border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-between animate-pulse">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                    Ovoz yozib olinmoqda... (0:{voiceSeconds < 10 ? '0' + voiceSeconds : voiceSeconds})
                  </span>
                  <button type="button" onClick={handleSimulateVoice} className="text-xs font-black underline">
                    To'xtatish & Yuborish
                  </button>
                </div>
              )}

              {/* Attached File Preview Bar */}
              {attachedFile && (
                <div className="px-4 py-2 bg-indigo-500/10 border-t border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-2 truncate">
                    {attachedFile.type === 'image' ? <ImageIcon className="w-4 h-4 text-indigo-500" /> : <FileText className="w-4 h-4 text-emerald-500" />}
                    <span className="truncate">{attachedFile.name}</span>
                  </span>
                  <button type="button" onClick={() => setAttachedFile(null)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,application/pdf"
                className="hidden"
              />

              {/* Chat Form */}
              <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/60 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateVoice}
                  className={`p-2.5 rounded-xl border text-slate-700 dark:text-slate-300 transition-all ${
                    isRecordingVoice ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="Ovozli Xabar Yuborish"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  title="Rasm yoki PDF biriktirish"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Xabarni yozing..."
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                />

                <button type="submit" className="btn-primary py-2.5 px-4 text-xs font-bold shadow-md shadow-indigo-600/30">
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ChatPage;
