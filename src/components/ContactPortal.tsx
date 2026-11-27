"use client";

import React, { useState } from "react";
import { submitWebsiteEnquiry } from "@/lib/services";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Bus,
  Plane,
  Train,
  Car,
  Headphones,
  FileCheck2,
  Briefcase,
  Home,
  CreditCard,
} from "lucide-react";

const DEPARTMENTS: {
  icon: typeof Headphones;
  title: string;
  contactPerson: string;
  phone: string;
  email?: string;
  desc: string;
}[] = [
  {
    icon: Headphones,
    title: "Central Admissions Desk",
    contactPerson: "Admissions Officer",
    phone: "+91 95713 45444",
    email: "md@nathdwarainstitute.com",
    desc: "For course enquiries, eligibility, online application, and counselling rounds.",
  },
  {
    icon: FileCheck2,
    title: "Academic & Verification Cell",
    contactPerson: "Registrar Office",
    phone: "+91 98292 34138",
    desc: "Degree verification, transcripts, migration, and RTU / MLSU university records.",
  },
  {
    icon: Briefcase,
    title: "Training & Placement Cell",
    contactPerson: "T&P Officer",
    phone: "+91 95713 45444",
    desc: "Corporate campus drives, industrial internships, and employer partnerships.",
  },
  {
    icon: Home,
    title: "Hostel Administration",
    contactPerson: "Chief Warden (Boys & Girls)",
    phone: "+91 95713 45444",
    desc: "Hostel room allotment, mess menu, safety protocols, and visitor permits.",
  },
  {
    icon: Bus,
    title: "Transport & Bus Coordinator",
    contactPerson: "Mr. S.D. Khan",
    phone: "+91 98280 89249",
    desc: "16 college buses on routes from Udaipur, Nathdwara, Rajnagar, Kankroli, Fatehnagar, Mavli & Relmagra.",
  },
  {
    icon: CreditCard,
    title: "Accounts & Fee Section",
    contactPerson: "Finance Officer",
    phone: "+91 98292 34138",
    desc: "Fee payments, fee receipts, installment schedules, and SJE scholarship claims.",
  },
];

export default function ContactPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Central Admissions Desk",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitWebsiteEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      courseLabel: `${formData.subject} ${formData.message}`,
      note: [`Contact page · ${formData.department}`, formData.subject, formData.message].filter(Boolean).join(" — "),
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Quick Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Call Us Anytime</span>
              <h3 className="text-base font-bold text-[#102c52] mt-0.5">Helpline Numbers</h3>
              <a href="tel:+919571345444" className="block text-sm font-semibold text-slate-700 hover:text-amber-600 mt-1">
                +91 95713 45444 (Toll-Free Helpline)
              </a>
              <a href="tel:+919829234138" className="block text-xs text-slate-500 hover:text-amber-600 mt-0.5">
                +91 98292 34138 (Administrative Office)
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Enquiries</span>
              <h3 className="text-base font-bold text-[#102c52] mt-0.5">Official Inboxes</h3>
              <a href="mailto:md@nathdwarainstitute.com" className="block text-sm font-semibold text-slate-700 hover:text-blue-600 mt-1">
                md@nathdwarainstitute.com
              </a>
              <a href="https://wa.me/917014810591" target="_blank" rel="noopener noreferrer" className="block text-xs text-slate-500 hover:text-blue-600 mt-0.5">
                WhatsApp: +91 70148 10591
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Campus Address</span>
              <h3 className="text-base font-bold text-[#102c52] mt-0.5">Upali Oden, Nathdwara</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Bhansol Gadwada Road, Upali Oden, Nathdwara, Dist. Rajsamand, Rajasthan 313301
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Google Map Embed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              Send an Online Query
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#102c52] mt-2">
              Write to Our Campus Team
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Have a question about admissions, certificate verification, or campus visits? Fill the form below and we will get back within 24 hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#102c52]">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your message has been forwarded to the <strong className="text-slate-900">{formData.department}</strong>. A staff member will connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-6 py-2.5 rounded-xl bg-[#102c52] text-white font-bold text-xs hover:bg-[#1d4b7f]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.title} value={dept.title}>
                          {dept.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject / Concern *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inquiry regarding B.Tech CSE eligibility / Hostel fee"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your questions or message in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#102c52]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to NGI Office</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Google Maps and Office Timings */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Map Embed */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md overflow-hidden">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Campus Location</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Nathdwara+Group+of+Institutions+Upali+Oden"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  title="Nathdwara Group of Institutions Campus Map"
                  src="https://maps.google.com/maps?q=Nathdwara%20Group%20of%20Institutions%20Upali%20Oden%20Nathdwara&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-xs text-slate-600 flex items-start gap-2 px-1">
                <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Upali Oden, Nathdwara, Rajasthan 313301. Located 3.5 km from Nathdwara Shrinathji Temple.</span>
              </div>
            </div>

            {/* Timings and Visiting Guidance */}
            <div className="bg-[#102c52] text-white rounded-3xl p-6 sm:p-7 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                <Clock className="w-4 h-4" />
                <span>Working Hours &amp; Access</span>
              </div>
              <h3 className="text-xl font-bold">Campus Visiting Hours</h3>
              <div className="mt-4 space-y-2.5 text-xs text-slate-200">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span>Monday – Friday:</span>
                  <span className="font-bold text-white">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span>Saturday (Counselling Desk):</span>
                  <span className="font-bold text-white">9:00 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday &amp; Gazetted Holidays:</span>
                  <span className="text-amber-300 font-semibold">Closed (Online Enquiries Active)</span>
                </div>
              </div>
              <div className="mt-5 p-3 rounded-xl bg-white/10 text-[11px] leading-relaxed text-slate-200">
                Parents and prospective students are welcome for guided campus, hostel, and laboratory tours during working hours.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departmental Directory Grid */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block mb-2">
              Staff &amp; Departmental Contacts
            </span>
            <h2 className="text-3xl font-black text-[#102c52]">
              Official Campus Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Reach specific administrative and academic departments directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept, idx) => {
              const Icon = dept.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-[#102c52] flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-base font-bold text-[#102c52]">{dept.title}</h3>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">{dept.contactPerson}</div>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{dept.desc}</p>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1 text-xs">
                    <a
                      href={`tel:${dept.phone.replace(/[^+\d]/g, "")}`}
                      className="flex items-center gap-2 font-bold text-slate-800 hover:text-amber-600"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <span>{dept.phone}</span>
                    </a>
                    {dept.email ? (
                      <a
                        href={`mailto:${dept.email}`}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-900"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                        <span>{dept.email}</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Reach Campus Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-2">
              Connectivity &amp; Travel
            </span>
            <h2 className="text-3xl font-black text-white">
              How to Reach NGI Campus
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Easily accessible via NH-58 4-lane highway connecting Udaipur, Nathdwara, and Rajsamand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <Plane className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-base font-bold text-white">By Air</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                <strong>Maharana Pratap Airport (UDR), Udaipur</strong> is approximately 45 km from campus. Direct taxis and airport transfers to Nathdwara take ~45 minutes via NH-58.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <Train className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-base font-bold text-white">By Train</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                <strong>Mavli Junction (28 km)</strong> &amp; <strong>Udaipur City Railway Station (42 km)</strong> connect with all major cities of India. Nathdwara Station is 4 km away.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <Car className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-base font-bold text-white">By State Bus</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Nathdwara Central Bus Stand is 3.5 km away. Frequent state transport (RSRTC) and private sleeper coaches operate continuously from Ahmedabad, Jaipur, Jodhpur, and Surat.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <Bus className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-base font-bold text-white">NGI Bus Fleet</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Daily student bus routes cover <strong>Udaipur City (Bhuwana/Sukher), Delwara, Nathdwara town, Rajsamand, Kankroli, Mavli, and Fatehnagar</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}