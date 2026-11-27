"use client";

import React, { useState } from "react";
import { X, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "Rajasthan (Nathdwara / Udaipur / Rajsamand)",
    course: "B.Tech Computer Science & Engg",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEnquiry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      course: formData.course,
      college: formData.course.includes("B.Tech")
        ? "NIET"
        : formData.course.includes("Law") || formData.course.includes("LL.B")
        ? "NLC"
        : formData.course.includes("Ayurved")
        ? "NCAN"
        : formData.course.includes("DMLT")
        ? "VDSMS"
        : formData.course.includes("ITI")
        ? "NPITI"
        : "NIBM",
      state: formData.state,
      status: "New",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
      source: "Website Header Enquiry Modal",
      notes: "Direct enquiry submitted via header modal",
    };

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEnquiry),
      });
    } catch (err) {
      console.warn("API enquiry POST fallback to local storage", err);
    }

    try {
      const existing = localStorage.getItem("ngi_enquiries_list");
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem("ngi_enquiries_list", JSON.stringify([newEnquiry, ...list]));
    } catch (err) {}

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-blue-950">Thank You!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              We have received your admission enquiry. An official admission officer will get in touch with you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-blue-950 text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                Direct Admissions 2026-27
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-blue-950">
              Request Fast-Track Counselling
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Fill in your details below to receive direct eligibility status, fee structures, and scholarship options.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Candidate Location
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option>Rajasthan (Nathdwara / Udaipur / Rajsamand)</option>
                    <option>Gujarat</option>
                    <option>Madhya Pradesh</option>
                    <option>Other State</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Stream
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option>B.Tech Computer Science &amp; Engg</option>
                    <option>B.Tech Civil / Mechanical / Electrical</option>
                    <option>BCA (Computer Applications)</option>
                    <option>B.Sc / M.Sc Biotechnology &amp; Sciences</option>
                    <option>B.Pharm / D.Pharm Pharmacy</option>
                    <option>Integrated BA-B.Ed / B.Sc-B.Ed</option>
                    <option>Diploma in Engineering (Polytechnic)</option>
                    <option>MBA (Dual Specialization)</option>
                    <option>ITI Electrician / Fitter</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Your contact info is secure and only used for official NGI admission communication.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Request Free Call Back</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
