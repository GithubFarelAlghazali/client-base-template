import guestList from "../helpers/guestList.json";

export default function GuestDashboard() {
  return (
    <main>
      <header className="bg-taupe-800 text-white p-5 w-full text-xl">
        <h1>Kelola Tamu Undangan</h1>
      </header>
      <table className="w-full border *:border *:*:border text-center">
        <tr>
          <th>No.</th>
          <th>Nama Tamu</th>
          <th>No. Telp.</th>
          <th>Status Kehadiran</th>
          <th>Pesan</th>
          <th>Status Undangan</th>
        </tr>
        {guestList.map((guest, idx) => {
          return (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{guest.name}</td>
              <td>{guest.phone}</td>
              <td>{guest.presenceStatus}</td>
              <td>{guest.message}</td>
              <td>
                {guest.invitationStatus === "dikirim" ? (
                  "Dikirim"
                ) : (
                  <button>Kirim via WhatsApp</button>
                )}
              </td>
            </tr>
          );
        })}
      </table>
    </main>
  );
}
