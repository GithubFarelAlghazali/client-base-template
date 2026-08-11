"use client";

import { useState } from "react";
import guestList from "../helpers/guestList.json";
import { brideInfo } from "../helpers/data";
import { FaWhatsapp, FaTimes, FaEye } from "react-icons/fa";
import updateWaSend from "./updateWaSend";

interface Guest {
  id: string;
  name: string;
  phone: string;
  presenceStatus: string;
  message: string;
  invitationStatus: string;
}

const sendWaInvitation = async (
  guestId: string,
  guestName: string,
  guestPhone: string,
) => {
  const url = "https://example.kasislamat.my.id/";
  const message = `Assalamualaikum Warahmatullahi Wabarakatuh

Kepada Yth. ${guestName}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara kami :

${brideInfo.man.nickname} & ${brideInfo.woman.nickname}

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :

${url + guestId}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini.

Terima kasih banyak atas perhatiannya.

Wassalamualaikum Warahmatullahi Wabarakatuh

Hormat kami,

${brideInfo.man.nickname} & ${brideInfo.woman.nickname}`;

  window.open(
    `https://wa.me/${guestPhone}?text=${encodeURIComponent(message)}`,
    "_blank",
  );

  await updateWaSend(guestId);
};

export default function GuestDashboard() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const truncateMessage = (text: string, length: number = 12) => {
    if (!text) return "-";
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 p-4 sm:p-6 md:p-10 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold text-taupe-800 tracking-tight">
              Kelola Tamu Undangan
            </h1>
            <p className="text-xs text-stone-500 mt-0.5 font-light">
              Daftar tamu, status kehadiran, dan pengiriman undangan
            </p>
          </div>
          <div className="text-xs text-stone-500 bg-white px-3 py-1.5 rounded-full border border-stone-200 self-start sm:self-auto shadow-sm">
            Total Tamu:{" "}
            <span className="font-semibold text-taupe-800">
              {guestList.length}
            </span>
          </div>
        </header>

        {/* Mobile View: Card List (visible below md breakpoint) */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {guestList.map((guest: Guest, idx: number) => (
            <div
              key={guest.id || idx}
              className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-stone-400">
                    #{idx + 1}
                  </span>
                  <h3 className="font-medium text-stone-900 text-sm">
                    {guest.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    {guest.phone}
                  </p>
                </div>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-medium shrink-0 ${
                    guest.presenceStatus === "hadir"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                      : guest.presenceStatus === "absen"
                        ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                        : "bg-amber-50 text-amber-700 border border-amber-200/60"
                  }`}
                >
                  {guest.presenceStatus || "Belum Konfirmasi"}
                </span>
              </div>

              <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="font-medium text-stone-400 text-[10px] uppercase block mb-0.5">
                  Pesan
                </span>
                {truncateMessage(guest.message, 24)}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-100">
                <button
                  onClick={() => setSelectedGuest(guest)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-stone-600 bg-stone-100 hover:bg-stone-200/70 rounded-lg transition-colors font-medium"
                >
                  <FaEye className="w-3.5 h-3.5 text-stone-500" />
                  <span>Detail</span>
                </button>

                {guest.invitationStatus === "dikirim" ? (
                  <span className="inline-flex items-center px-3 py-1.5 text-xs text-stone-400 bg-stone-100 rounded-lg border border-stone-200/60">
                    Terkirim
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      sendWaInvitation(guest.id, guest.name, guest.phone)
                    }
                    className="inline-flex items-center gap-1.5 bg-taupe-800 hover:bg-taupe-800/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kirim WA</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table (hidden below md breakpoint) */}
        <div className="hidden md:block bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/70 border-b border-stone-200 text-taupe-800 font-medium uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 text-center">No.</th>
                  <th className="py-3.5 px-4">Nama Tamu</th>
                  <th className="py-3.5 px-4">No. Telp</th>
                  <th className="py-3.5 px-4 text-center">Kehadiran</th>
                  <th className="py-3.5 px-4">Pesan</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {guestList.map((guest: Guest, idx: number) => {
                  return (
                    <tr
                      key={guest.id || idx}
                      className="hover:bg-stone-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center text-stone-400 font-mono text-xs">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-900">
                        {guest.name}
                      </td>
                      <td className="py-3.5 px-4 text-stone-500 font-mono text-xs">
                        {guest.phone}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium ${
                            guest.presenceStatus === "hadir"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : guest.presenceStatus === "absen"
                                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                                : "bg-amber-50 text-amber-700 border border-amber-200/60"
                          }`}
                        >
                          {guest.presenceStatus || "Belum Konfirmasi"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600 max-w-[140px]">
                        <span title={guest.message}>
                          {truncateMessage(guest.message, 12)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedGuest(guest)}
                            className="p-2 text-stone-500 hover:text-taupe-800 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Lihat Detail"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>

                          {guest.invitationStatus === "dikirim" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-stone-400 bg-stone-100 rounded-md border border-stone-200/60">
                              Terkirim
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                sendWaInvitation(
                                  guest.id,
                                  guest.name,
                                  guest.phone,
                                )
                              }
                              className="inline-flex items-center gap-1.5 bg-taupe-800 hover:bg-taupe-800/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95"
                            >
                              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Kirim</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden p-5 sm:p-6 relative space-y-4 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 shrink-0">
              <h3 className="text-base sm:text-lg font-serif font-semibold text-taupe-800">
                Detail Tamu
              </h3>
              <button
                onClick={() => setSelectedGuest(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm overflow-y-auto pr-1">
              <div>
                <label className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-stone-400">
                  Nama Tamu
                </label>
                <p className="text-stone-900 font-medium text-sm sm:text-base mt-0.5">
                  {selectedGuest.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-stone-400">
                    No. Telepon
                  </label>
                  <p className="text-stone-800 font-mono mt-0.5 text-xs sm:text-sm">
                    {selectedGuest.phone}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-stone-400">
                    Status Kehadiran
                  </label>
                  <p className="text-stone-800 mt-0.5 font-medium text-xs sm:text-sm">
                    {selectedGuest.presenceStatus || "Belum Konfirmasi"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-stone-400">
                  Pesan Lengkap
                </label>
                <div className="mt-1 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-stone-700 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm">
                  {selectedGuest.message || "(Tidak ada pesan)"}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100 shrink-0">
              <button
                onClick={() => setSelectedGuest(null)}
                className="px-4 py-2 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl text-xs font-medium transition-colors"
              >
                Tutup
              </button>
              {selectedGuest.invitationStatus !== "dikirim" && (
                <button
                  onClick={() => {
                    sendWaInvitation(
                      selectedGuest.id,
                      selectedGuest.name,
                      selectedGuest.phone,
                    );
                    setSelectedGuest(null);
                  }}
                  className="inline-flex items-center gap-1.5 bg-taupe-800 hover:bg-taupe-800/90 text-white px-4 py-2 rounded-xl text-xs font-medium transition-colors"
                >
                  <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kirim WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
