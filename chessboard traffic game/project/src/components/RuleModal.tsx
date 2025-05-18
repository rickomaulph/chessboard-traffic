import React from 'react';

interface RuleModalProps {
  onClose: () => void;
}

const RuleModal: React.FC<RuleModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Peraturan Catur Lalu Lintas</h2>
          
          <div className="space-y-4">
            <section>
              <h3 className="text-xl font-semibold mb-2">Persiapan Permainan</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Papan 8×8 dengan kotak putih berisi rambu lalu lintas dan kotak hitam kosong</li>
                <li>Dua tim (A & B), masing-masing dengan 16 bidak traffic cone</li>
                <li>Setiap tim mulai dengan 10 poin</li>
                <li>Dua set kartu: "Kartu Putih" (pertanyaan rambu) & "Kartu Hitam" (pertanyaan umum)</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Cara Bergerak</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pilih bidak untuk melihat gerakan yang valid (disorot hijau)</li>
                <li>Bidak bergerak 1 kotak ke segala arah (seperti Raja dalam catur)</li>
                <li>Bergerak ke kotak kosong mengakhiri giliran</li>
                <li>Bergerak ke kotak dengan bidak lawan memulai proses "makan"</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Aturan Makan</h3>
              <p className="mb-2"><strong>Di Kotak Putih (dengan rambu):</strong></p>
              <ul className="list-disc pl-5 space-y-1 mb-2">
                <li>Harus mengidentifikasi rambu yang ditampilkan</li>
                <li>Jawaban benar: makan bidak lawan dan lanjut giliran</li>
                <li>Jawaban salah: kehilangan 1 poin dan ambil kartu "Putih"</li>
                <li>Jika masih salah: kehilangan 2 poin lagi dan giliran berakhir</li>
              </ul>
              
              <p className="mb-2"><strong>Di Kotak Hitam (kosong):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Langsung ambil kartu "Hitam"</li>
                <li>Jawaban benar: makan bidak lawan dan lanjut giliran</li>
                <li>Jawaban salah: kehilangan 1 poin dan giliran berakhir</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Cara Menang</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Makan semua bidak lawan (checkmate)</li>
                <li>ATAU kurangi poin lawan sampai nol atau di bawahnya</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-2">Fitur Khusus</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Timer giliran 30 detik (jawaban terlambat kehilangan 1 poin)</li>
                <li>Fitur "Petunjuk" (bayar 1 poin untuk melihat petunjuk tentang rambu)</li>
                <li>Briefing 2 menit sebelum permainan menunjukkan semua rambu lalu lintas</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Mulai Bermain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleModal;