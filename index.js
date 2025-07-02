import { useState, useEffect } from "react";

const produkList = [{"id": "sc-vincent", "nama": "SC VINCENT", "harga": 65000, "kategori": "Script"}, {"id": "sc-floids", "nama": "SC FLOIDS", "harga": 50000, "kategori": "Script"}, {"id": "apk-viral", "nama": "APK VIRAL", "harga": 110000, "kategori": "APK"}, {"id": "panel", "nama": "PANEL PTERODACTYL", "harga": 10000, "kategori": "Panel"}, {"id": "bot-wa", "nama": "BOT WHATSAPP", "harga": 75000, "kategori": "Bot"}, {"id": "tool-ddos", "nama": "TOOL DDoS", "harga": 55000, "kategori": "Tool"}, {"id": "autoenc", "nama": "AUTO ENCRYPT JS", "harga": 45000, "kategori": "Tool"}, {"id": "osint-prem", "nama": "OSINT PREMIUM", "harga": 60000, "kategori": "Tool"}, {"id": "apk-stalk", "nama": "APK STALKER", "harga": 50000, "kategori": "APK"}, {"id": "sc-v2ray", "nama": "SC V2RAY", "harga": 70000, "kategori": "Script"}];

export default function Home() {
  const [mode, setMode] = useState("dark");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [nomor, setNomor] = useState("");
  const [qris, setQris] = useState(null);
  const [metode, setMetode] = useState("qris");

  useEffect(() => {
    document.body.style.background = mode === "dark" ? "#0a0f2c" : "#ffffff";
    document.body.style.color = mode === "dark" ? "#ffffff" : "#000000";
  }, [mode]);

  const filteredProduk = produkList
    .filter((p) => p.nama.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filter ? p.kategori === filter : true));

  const handleBeli = async () => {
    if (metode === "qris") {
      const res = await fetch("https://api-kuota.sidelink.my.id/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, telegram, nomor, produk: selected }),
      });
      const data = await res.json();
      setQris(data);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🛒 Qud-Store</h1>
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        Switch Mode
      </button><br />
      <input placeholder="Cari produk..." onChange={(e) => setSearch(e.target.value)} />
      <select onChange={(e) => setFilter(e.target.value)} defaultValue="">
        <option value="">Semua</option>
        <option value="Script">Script</option>
        <option value="APK">APK</option>
        <option value="Tool">Tool</option>
        <option value="Bot">Bot</option>
        <option value="Panel">Panel</option>
      </select>
      <hr />
      {filteredProduk.map((p) => (
        <div key={p.id} style={{ border: "1px solid #00aaff", padding: 10, marginBottom: 10, borderRadius: 5 }}>
          <strong>{p.nama}</strong><br />
          Harga: Rp{p.harga.toLocaleString()}<br />
          <button onClick={() => setSelected(p)}>Beli Sekarang</button>
        </div>
      ))}

      {selected && (
        <div style={{ marginTop: 20 }}>
          <h3>Form Pembelian</h3>
          <input placeholder="Email kamu (WAJIB)" onChange={(e) => setEmail(e.target.value)} /><br />
          <input placeholder="@usn Telegram (opsional)" onChange={(e) => setTelegram(e.target.value)} /><br />
          <input placeholder="Nomor pengirim Dana/OVO/GoPay" onChange={(e) => setNomor(e.target.value)} /><br />

          <p>Pilih Metode Pembayaran:</p>
          <select onChange={(e) => setMetode(e.target.value)} value={metode}>
            <option value="qris">QRIS (semua e-wallet)</option>
            <option value="manual">Transfer ke Nomor Dana/OVO/GoPay</option>
          </select><br />

          <button onClick={handleBeli}>Lanjutkan ke Pembayaran</button>

          {metode === "manual" && (
            <div style={{ marginTop: 15 }}>
              <h4>💸 Silakan Transfer Manual ke:</h4>
              <p>Dana: <b>081466725874</b></p>
              <p>OVO: <b>081328256241</b></p>
              <p>GoPay: <b>081466725874</b></p>
              <p><b>Setelah transfer, kirim bukti via Telegram ke @Biyalue2</b></p>
            </div>
          )}
        </div>
      )}

      {qris && (
        <div style={{ marginTop: 20 }}>
          <h3>QRIS (Berlaku 5 Menit)</h3>
          <img src={qris.qris_url} width="300" />
          <p>Expired: {qris.expired} detik</p>
        </div>
      )}
    </div>
  );
}