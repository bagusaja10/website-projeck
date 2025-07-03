const videoMap = {
  "Pabrik Gula": "WhatsApp Video 2025-05-02 at 21.43.07_ddabf09d.mp4",
  "Jumbo": "WhatsApp Video 2025-05-02 at 21.43.15_656f71a7.mp4",
  "A Minecraft Movie": "WhatsApp Video 2025-05-02 at 21.43.20_9da47162.mp4",
  "Qodrat": "WhatsApp Video 2025-05-02 at 21.43.22_08dedfb7.mp4",
  "Upload: ": "upload_video_placeholder.mp4"
};

function showPage(page) {
  const pages = ['login', 'register', 'home', 'upload', 'pembayaran', 'riwayat', 'daftarSaya'];
  pages.forEach(p => document.getElementById(p).style.display = 'none');
  document.getElementById(page).style.display = 'block';

  if (page === 'home') updateWelcome();
  if (page === 'riwayat') loadRiwayat();
  if (page === 'daftarSaya') loadDaftarSaya();
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const user = JSON.parse(localStorage.getItem(username));
  if (user && user.password === password) {
    sessionStorage.setItem('loginUser', JSON.stringify({ username }));
    alert('Login berhasil!');
    showPage('home');
  } else {
    alert('Username atau password salah.');
  }
}

function register() {
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  if (username && password) {
    if (localStorage.getItem(username)) {
      alert('Username sudah terdaftar.');
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password }));
      alert('Registrasi berhasil, silakan login.');
      showPage('login');
    }
  } else {
    alert('Semua field wajib diisi!');
  }
}

function logout() {
  sessionStorage.removeItem('loginUser');
  alert('Logout berhasil!');
  showPage('login');
}

function updateWelcome() {
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const welcomeText = document.getElementById('welcomeText');
  if (loginUser) {
    welcomeText.innerHTML = `Selamat Datang, ${loginUser.username}!`;
  }
}

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

function beli(judul = "Video Premium", harga = 5000) {
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  if (!loginUser) {
    alert('Silakan login dahulu untuk membeli!');
    showPage('login');
  } else {
    const dataFilm = filmDatabase[judul] || {};
    sessionStorage.setItem('currentPurchase', JSON.stringify({
      tanggal: new Date().toISOString().split('T')[0],
      judul: judul,
      harga: harga,
      status: "Proses",
      poster: dataFilm.poster || "",
      deskripsi: dataFilm.deskripsi || ""
    }));
    showPage('pembayaran');
  }
}

function bayar() {
  const judul = document.getElementById('uploadJudul').value.trim();
  const deskripsi = document.getElementById('uploadDeskripsi').value.trim();
  const file = document.getElementById('uploadFile').files[0];
  const durasi = document.getElementById('uploadDurasi').value.trim();

  if (!judul || !deskripsi || !file || !durasi) {
    alert('Semua field upload wajib diisi!');
    return;
  }

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  if (!loginUser) {
    alert('Silakan login dahulu!');
    showPage('login');
  } else {
    sessionStorage.setItem('currentPurchase', JSON.stringify({
      tanggal: new Date().toISOString().split('T')[0],
      judul: "Upload: " + judul,
      harga: 10000,
      status: "Proses"
    }));
    showPage('pembayaran');
  }
}

function kirimPembayaran() {
  const pembelian = JSON.parse(sessionStorage.getItem('currentPurchase'));
  if (pembelian) {
    pembelian.status = "Sukses";

    let riwayat = JSON.parse(sessionStorage.getItem('riwayatPembelian')) || [];
    riwayat.push(pembelian);
    sessionStorage.setItem('riwayatPembelian', JSON.stringify(riwayat));

    let daftar = JSON.parse(sessionStorage.getItem('daftarSaya')) || [];
    const sudahAda = daftar.some(item => item.judul === pembelian.judul);
    if (!sudahAda) {
      daftar.push({
        judul: pembelian.judul,
        tanggal: pembelian.tanggal,
        poster: pembelian.poster || "",
        deskripsi: pembelian.deskripsi || ""
      });
      sessionStorage.setItem('daftarSaya', JSON.stringify(daftar));
    }

    alert('Pembayaran berhasil!');
    showPage('home');
  } else {
    alert('Tidak ada pembelian yang diproses.');
    showPage('home');
  }
}

function loadRiwayat() {
  const riwayatList = document.getElementById('riwayatList');
  riwayatList.innerHTML = '';
  const riwayat = JSON.parse(sessionStorage.getItem('riwayatPembelian')) || [];

  if (riwayat.length === 0) {
    riwayatList.innerHTML = '<li class="list-group-item bg-dark text-white">Belum ada riwayat.</li>';
    return;
  }

  riwayat.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item bg-dark text-white';
    li.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-3 mb-3 mb-md-0">
          <img src="${item.poster || ''}" class="img-fluid rounded mb-2" alt="${item.judul}">
          <p class="small">${item.deskripsi || ''}</p>
        </div>
        <div class="col-md-9">
          <strong>${item.judul}</strong><br>
          Tanggal: ${item.tanggal}<br>
          Harga: Rp${item.harga}<br>
          Status: <span class="${item.status === 'Sukses' ? 'text-success' : 'text-warning'}">${item.status}</span><br>
          ${item.status === 'Sukses' && videoMap[item.judul] 
            ? `<button class="btn btn-sm btn-info mt-2" onclick="tontonVideo('${videoMap[item.judul]}', ${index})">Tonton</button>` 
            : ''}
          <div id="videoContainer${index}" class="mt-3"></div>
        </div>
      </div>
    `;
    riwayatList.appendChild(li);
  });
}

function tontonVideo(videoSrc, index) {
  const container = document.getElementById('videoContainer' + index);
  container.innerHTML = `
    <video controls class="w-100 mt-2 rounded shadow">
      <source src="${videoSrc}" type="video/mp4">
      Browser tidak mendukung pemutaran video.
    </video>
  `;
}

function loadDaftarSaya() {
  const daftarSayaList = document.getElementById('daftarSayaList');
  daftarSayaList.innerHTML = '';
  const daftar = JSON.parse(sessionStorage.getItem('daftarSaya')) || [];

  if (daftar.length === 0) {
    daftarSayaList.innerHTML = '<li class="list-group-item bg-dark text-white">Belum ada daftar film.</li>';
    return;
  }

  daftar.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item bg-dark text-white';
    li.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.poster || 'https://via.placeholder.com/80x120?text=No+Poster'}" 
             class="me-3" style="width: 80px; height: 120px; object-fit: cover;">
        <div>
          <h5>${item.judul}</h5>
          <small>Dibeli pada: ${item.tanggal}</small>
        </div>
      </div>
    `;
    daftarSayaList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const toggler = document.querySelector('.navbar-toggler');
  if (toggler) {
    toggler.addEventListener('click', function () {
      document.querySelector('.navbar-nav').classList.toggle('active');
    });
  }
});
