add this snippets to Rsvp.tsx

const onSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (isSubmitting) return;

setIsSubmitting(true);
const success = await handleRsvp(message, presence, guestId);
setIsSubmitting(false);

if (success) {
setShowSuccessToast(true);

     // Hilangkan toast secara otomatis setelah 3 detik
     setTimeout(() => {
       setShowSuccessToast(false);
     }, 3000);

}
};

<AnimatePresence>
  {showSuccessToast && (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute bottom-10 z-50 bg-emerald-600 text-white px-6 py-3.5 rounded-xl shadow-2xl border border-emerald-400/30 flex items-center gap-3 backdrop-blur-md"
    >
      <svg
        className="w-5 h-5 text-white shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span className="font-medium text-sm tracking-wide">
        Kehadiran berhasil dikonfirmasi
      </span>
    </motion.div>
  )}
</AnimatePresence>

<button
type="submit"
disabled={isSubmitting}
className="mt-2 w-full bg-white text-rose-950 font-bold p-3.5 rounded-lg cursor-pointer transition-all hover:bg-rose-100 shadow-lg tracking-wide text-center disabled:opacity-50 disabled:cursor-not-allowed"

>

{isSubmitting ? "Mengirim..." : "Kirim"}
</button>
