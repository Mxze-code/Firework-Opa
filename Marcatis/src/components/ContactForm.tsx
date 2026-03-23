"use client";

import { useState } from "react";
import { company } from "@/content/site";

export function ContactForm() {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage ${companyName ? `– ${companyName}` : ""}`);
    const body = encodeURIComponent(
      [
        name && `Name: ${name}`,
        companyName && `Unternehmen: ${companyName}`,
        email && `E-Mail: ${email}`,
        phone && `Telefon: ${phone}`,
        "",
        message && `Nachricht:\n${message}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  }

  const field =
    "mt-2 w-full border border-zinc-800 bg-black/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-m-red/60 focus:shadow-[0_0_0_1px_rgba(220,38,38,0.2)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-zinc-500">Name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">Unternehmen</span>
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={field} />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">E-Mail</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">Telefon</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-zinc-500">Ihre Anforderung</span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Material, Stückzahl, Zeichnungsformat, Termin …"
          className={`${field} resize-y`}
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-red-600 sm:w-auto sm:px-10"
      >
        Anfrage per E-Mail senden
      </button>
      <p className="text-xs text-zinc-600">
        Es wird Ihr Standard-E-Mail-Programm geöffnet. Alternativ:{" "}
        <a className="text-red-500 hover:underline" href={`tel:${company.phoneTel}`}>
          {company.phone}
        </a>
        .
      </p>
    </form>
  );
}
