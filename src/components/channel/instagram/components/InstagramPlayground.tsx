"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/src/elements/ui/button";

interface InstagramPlaygroundProps {
  commentSection: {
    badge?: string;
    title?: string;
    subtitle?: string;
    card_title?: string;
    keywords?: string[];
    bullets?: string[];
  };
}

export default function InstagramPlayground({ commentSection }: InstagramPlaygroundProps) {
  const keywords = Array.isArray(commentSection.keywords) ? commentSection.keywords : ["VOUCHER"];
  const sandboxBullets = Array.isArray(commentSection.bullets) ? commentSection.bullets : [];
  const triggerKeyword = keywords[0] || "VOUCHER";

  const [playgroundKeyword, setPlaygroundKeyword] = useState(triggerKeyword);
  const [typedComment, setTypedComment] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0); // 0: Idle, 1: User Commented, 2: Bot Replied, 3: Private DM Sent!

  const handleSimulateFlow = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    setTypedComment("");

    let currentText = "";
    const phrase = playgroundKeyword;
    let charIdx = 0;

    const typingTimer = setInterval(() => {
      if (charIdx < phrase.length) {
        currentText += phrase[charIdx];
        setTypedComment(currentText);
        charIdx++;
      } else {
        clearInterval(typingTimer);
        setTimeout(() => {
          setSimStep(2);
          setTimeout(() => {
            setSimStep(3);
            setIsSimulating(false);
          }, 1500);
        }, 1500);
      }
    }, 120);
  };

  const resetPlayground = () => {
    setSimStep(0);
    setTypedComment("");
    setIsSimulating(false);
  };

  const getDmResponseText = () => {
    if (sandboxBullets.length > 0) {
      return sandboxBullets[sandboxBullets.length - 1];
    }
    return "Thanks for your comment! Here is your exclusive 30% OFF code: OFF30. Enjoy shopping!";
  };

  return (
    <section id="playground" className="py-[calc(20px+(50-20)*((100vw-320px)/(1920-320)))] bg-slate-50/70 border-y border-slate-200/60">
      <div className="container mx-auto px-[calc(8px+(24-8)*((100vw-320px)/(1920-320)))] md:px-12 xl:px-16">
        <div className="text-center max-w-4xl mx-auto mb-[calc(20px+(48-20)*((100vw-320px)/(1920-320)))]">
          <span
            className="text-[12px] font-bold text-white px-4 py-1.5 rounded-full inline-block mb-3.5"
            style={{ background: "linear-gradient(135deg, oklch(0.86 0.14 85) 0%, oklch(0.74 0.16 45) 25%, oklch(0.66 0.2 5) 55%, oklch(0.58 0.19 310) 85%, oklch(0.58 0.17 265) 100%)" }}
          >
            Interactive Trigger Demo
          </span>
          <h2 className="text-[calc(22px+14*((100vw-320px)/1600))] font-bold text-slate-900 tracking-tight leading-tight">
            {commentSection.title || "Test Our Comment-to-DM Flow Live"}
          </h2>
          {commentSection.subtitle && (
            <p className="mt-4 text-[15px] font-semibold text-slate-500 leading-relaxed">
              {commentSection.subtitle}
            </p>
          )}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[calc(12px+(40-12)*((100vw-320px)/(1920-320)))] items-stretch bg-white rounded-lg border border-slate-200 shadow-xl shadow-slate-100/50 p-4 sm:p-6">

          {/* Left Box: Controls & Workflow logs */}
          <div className="flex flex-col justify-between text-left space-y-6">
            <div className="space-y-4">
              <label className="text-[14px] font-extrabold text-slate-700 block">
                1. Configure Your Comment Trigger Keyword
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  disabled={isSimulating}
                  value={playgroundKeyword}
                  onChange={(e) => setPlaygroundKeyword(e.target.value.toUpperCase())}
                  placeholder="E.g., VOUCHER or CATALOG"
                  className="flex-1 bg-slate-50 border-2 border-slate-200 focus:bg-white rounded-lg h-11! px-4 py-3 text-[14px] font-bold text-slate-800 outline-none transition-all"
                />
                <Button
                  onClick={handleSimulateFlow}
                  disabled={isSimulating || !playgroundKeyword.trim()}
                  className="text-white font-black text-[13px] px-6 rounded-lg h-11 border-none cursor-pointer hover:opacity-95 disabled:opacity-40 flex items-center gap-1.5"
                  style={{ background: "linear-gradient(135deg, oklch(0.86 0.14 85) 0%, oklch(0.74 0.16 45) 25%, oklch(0.66 0.2 5) 55%, oklch(0.58 0.19 310) 85%, oklch(0.58 0.17 265) 100%)" }}
                >
                  Simulate DM <ArrowRight size={14} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {keywords.map((tag) => (
                  <button
                    key={tag}
                    disabled={isSimulating}
                    onClick={() => {
                      setPlaygroundKeyword(tag);
                      resetPlayground();
                    }}
                    className="text-[10px] font-extrabold px-3 py-1 rounded-full border transition-all cursor-pointer"
                    style={playgroundKeyword === tag ? {
                      background: "linear-gradient(135deg, oklch(0.86 0.14 85) 0%, oklch(0.74 0.16 45) 25%, oklch(0.66 0.2 5) 55%, oklch(0.58 0.19 310) 85%, oklch(0.58 0.17 265) 100%)",
                      color: "white",
                      border: "1px solid transparent",
                    } : {
                      background: "#f1f5f9",
                      color: "#64748b",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Workflow log details */}
            <div className="bg-slate-50/80 border border-slate-150 rounded-lg p-4.5 space-y-3.5 flex-1">
              <span className="text-xs font-bold text-slate-400 block">Automation Sequence Activity Logs</span>

              <div className="space-y-3 text-[12px] font-bold leading-normal">
                <div className="flex items-center gap-2.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${simStep >= 1 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {simStep >= 1 ? "✓" : "1"}
                  </span>
                  <span className={simStep >= 1 ? "text-slate-800" : "text-slate-600"}>
                    Post Comment Detected: <strong className="text-slate-900">{typedComment || "None"}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${simStep >= 2 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {simStep >= 2 ? "✓" : "2"}
                  </span>
                  <span className={simStep >= 2 ? "text-slate-800" : "text-slate-600"}>
                    Automated Response: <span className="italic text-slate-550">&quot;Sent! Check your DM...&quot;</span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${simStep >= 3 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {simStep >= 3 ? "✓" : "3"}
                  </span>
                  <span className={simStep >= 3 ? "text-slate-800" : "text-slate-600"}>
                    Private Direct Message Delivered successfully! ✅
                  </span>
                </div>
              </div>
            </div>

            {(simStep > 0 || isSimulating) && (
              <button
                onClick={resetPlayground}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-655 font-extrabold text-[12px] py-2.5 rounded-xl border-none cursor-pointer transition-all"
              >
                Reset & Try New Keyword
              </button>
            )}
          </div>

          {/* Right Box: Phone mockup representing real time changes */}
          <div className="flex items-center justify-center bg-slate-50 rounded-lg p-4.5 border border-slate-150">
            <div className="w-[300px] h-[600px] bg-slate-950 p-2 rounded-[36px] border-[3px] border-slate-800 shadow-md relative overflow-hidden shrink-0">
              <div className="rounded-[28px] overflow-hidden bg-white h-full flex flex-col justify-between relative">
                <div className="bg-white border-b border-slate-100 pt-5 pb-2 px-3.5 flex justify-between items-center text-slate-800 shadow-inner">
                  <span className="text-xs font-black bg-gradient-to-r from-[#833AB4] to-[#E1306C] bg-clip-text text-transparent font-extrabold">Instagram</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="flex-1 p-3 flex flex-col justify-end space-y-2.5 bg-slate-50/50">
                  {simStep === 0 && (
                    <div className="flex flex-col items-center justify-center text-center p-3 h-full text-slate-400">
                      <MessageSquare size={24} className="mb-2 animate-bounce text-[#E1306C]" />
                      <p className="text-sm font-extrabold text-slate-600">Awaiting Comment...</p>
                      <p className="text-xs font-semibold text-slate-400 mt-1 leading-normal">Configure keyword and hit Simulate DM above to trigger.</p>
                    </div>
                  )}

                  {simStep >= 1 && (
                    <div className="bg-white border border-slate-200/50 p-2 rounded-lg text-xs text-left">
                      <strong className="text-slate-800 mr-1">your_brand</strong>
                      Comment <strong className="text-[#E1306C]">{playgroundKeyword}</strong> to get code sent to DMs instantly!
                    </div>
                  )}

                  {simStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start gap-1.5 self-end max-w-[85%] flex-row-reverse"
                    >
                      <div className="w-4 h-4 rounded-full bg-slate-350 text-[6.5px] font-bold flex items-center justify-center text-white shrink-0">JK</div>
                      <div className="p-2 bg-slate-100 border border-slate-250/30 rounded-xl rounded-tr-none text-[8.5px] font-bold text-slate-800">
                        {typedComment} 🔥
                      </div>
                    </motion.div>
                  )}

                  {simStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-start gap-1.5 self-start max-w-[85%] text-left"
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#F56040] to-[#833AB4] text-[6.5px] font-bold flex items-center justify-center text-white shrink-0">WA</div>
                      <div className="p-2 bg-pink-50 border border-pink-100/50 rounded-lg rounded-tl-none text-xs font-bold text-slate-800">
                        @customer check your DM inbox! Sent you the discount code 📥❤️
                      </div>
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {simStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 100 }}
                      className="absolute inset-x-0 bottom-0 bg-white border-t border-slate-200 p-3 flex flex-col justify-between z-20 h-[180px] shadow-[0_-8px_20px_rgba(0,0,0,0.06)]"
                    >
                      <div className="flex justify-between items-center pb-1.5 border-b border-slate-100 text-xs font-black text-slate-500">
                        <span>📥 Direct Message Inbox</span>
                        <span className="text-[#E1306C] font-bold">1s ago</span>
                      </div>
                      <div className="flex-1 py-2 text-left">
                        <div className="bg-slate-100 border border-slate-200/50 p-2 rounded-xl text-xs font-bold text-slate-700 leading-normal">
                          <span className="block text-xs font-black text-[#833AB4] leading-none mb-0.5 font-bold">your_brand</span>
                          {getDmResponseText()}
                        </div>
                      </div>
                      <Button
                        className="w-full hover:opacity-95 text-white! font-black text-xs py-2 rounded-lg border-none text-center flex items-center justify-center gap-1.5 cursor-pointer"
                        style={{ background: "linear-gradient(135deg, oklch(0.86 0.14 85) 0%, oklch(0.74 0.16 45) 25%, oklch(0.66 0.2 5) 55%, oklch(0.58 0.19 310) 85%, oklch(0.58 0.17 265) 100%)" }}
                      >
                        Apply Code Now
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
