
// Video source map
const videoMap = {
  "Pabrik Gula": "WhatsApp Video 2025-05-02 at 21.43.07_ddabf09d.mp4",
  "Jumbo": "WhatsApp Video 2025-05-02 at 21.43.15_656f71a7.mp4",
  "A Minecraft Movie": "WhatsApp Video 2025-05-02 at 21.43.20_9da47162.mp4",
  "Qodrat": "WhatsApp Video 2025-05-02 at 21.43.22_08dedfb7.mp4",
  "Upload: ": "upload_video_placeholder.mp4"
};

// List of film data
const filmDatabase = {
  "Pabrik Gula": {
    poster: "https://jadwalnonton.com/data/images/movies/2025/Poster-pabrik-gula-official_300x450.webp",
    deskripsi: "Sebuah kisah tentang pabrik tua dan perjuangan buruh di dalamnya."
  },
  "Jumbo": {
    poster: "https://jadwalnonton.com/data/images/movies/2025/Poster-Jumbo-Official-2_300x450.webp",
    deskripsi: "Petualangan gajah raksasa dalam dunia manusia."
  },
  "A Minecraft Movie": {
    poster: "https://jadwalnonton.com/data/images/movies/2025/Poster-A-minecraft-movi_300x450.webp",
    deskripsi: "Adaptasi film dari permainan Minecraft yang penuh petualangan."
  },
  "Qodrat": {
    poster: "https://jadwalnonton.com/data/images/movies/2025/Poster-Qodrat-official5_300x450.webp",
    deskripsi: "Film horor spiritual dengan kekuatan ruqyah melawan kejahatan."
  },
  "Moster House": {
    poster: "https://th.bing.com/th/id/OIP.YFMQNdAYEcl1poKaQB6w-gHaLH?rs=1&pid=ImgDetMain",
    deskripsi: "Sebuah rumah tua yang dihantui monster di dalamnya."
  },
  "Perang Kota": {
    poster: "https://media.21cineplex.com/webcontent/gallery/pictures/174254891077282_405x594.jpg",
    deskripsi: "Pertempuran sengit antar geng di jantung kota."
  },
  "Thunderbolts": {
    poster: "https://media.21cineplex.com/webcontent/gallery/pictures/174581329560717_405x594.jpg",
    deskripsi: "Superhero alternatif yang beraksi di luar aturan umum."
  },
  "Ngeri-Ngeri Sedap": {
    poster: "https://www.lavanguardia.com/peliculas-series/images/movie/poster/2022/6/w1280/pJA0ncjV9J9mSokynAQP9O9m2lV.jpg",
    deskripsi: "Drama keluarga Batak yang penuh emosi dan tawa."
  }
};

function showPage(page) {
  const pages = ['login', 'register', 'home', 'upload', 'pembayaran', 'riwayat', 'daftarSaya'];
  pages.forEach(p => document.getElementById(p).style.display = 'none');
  document.getElementById(page).style.display = 'block';

  if (page === 'home') {
    updateWelcome();
    renderFilmList();
  }
  if (page === 'riwayat') loadRiwayat();
  if (page === 'daftarSaya') loadDaftarSaya();
}

function updateWelcome() {
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const welcomeText = document.getElementById('welcomeText');
  if (loginUser) {
    welcomeText.innerHTML = `Selamat Datang, ${loginUser.username}!`;
  }
}

function renderFilmList() {
  const filmContainer = document.getElementById('filmContainer');
  if (!filmContainer) return;
  filmContainer.innerHTML = '';

  for (const judul in filmDatabase) {
    const film = filmDatabase[judul];
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    col.innerHTML = `
      <div class="card h-100 bg-dark text-white">
        <img src="${film.poster}" class="card-img-top" alt="${judul}">
        <div class="card-body">
          <h5 class="card-title">${judul}</h5>
          <p class="card-text">${film.deskripsi}</p>
          <button class="btn btn-success btn-sm" onclick="beli('${judul}', 5000)">Beli Rp5.000</button>
        </div>
      </div>
    `;
    filmContainer.appendChild(col);
  }
}
