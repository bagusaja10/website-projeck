// Video map
const videoMap = {
  "Pabrik Gula": "WhatsApp Video 2025-05-02 at 21.43.07_ddabf09d.mp4"
};

// Helper: show page
function showPage(page) {
  ["login","register","home","upload","pembayaran","riwayat","daftarSaya"]
    .forEach(p=>document.getElementById(p).style.display = "none");
  document.getElementById(page).style.display="block";
  if(page==="home")updateWelcome();
  if(page==="riwayat")loadRiwayat();
  if(page==="daftarSaya")loadDaftarSaya();
}

// Auth
function login(){
  const u=document.getElementById("loginUsername").value.trim();
  const p=document.getElementById("loginPassword").value.trim();
  const user=JSON.parse(localStorage.getItem(u));
  if(user&&user.password===p){
    sessionStorage.setItem("loginUser",JSON.stringify({username:u}));
    alert("Login berhasil!");showPage("home");
  }else{alert("Username atau password salah.");}
}
function register(){
  const u=document.getElementById("registerUsername").value.trim();
  const p=document.getElementById("registerPassword").value.trim();
  if(u&&p){
    if(localStorage.getItem(u)){alert("Username sudah terdaftar.");}
    else{localStorage.setItem(u,JSON.stringify({username:u,password:p}));
      alert("Registrasi berhasil!");showPage("login");}
  }else alert("Semua field wajib diisi!");
}
function logout(){sessionStorage.removeItem("loginUser");showPage("login");}

// Welcome
function updateWelcome(){
  const user=JSON.parse(sessionStorage.getItem("loginUser"));
  document.getElementById("welcomeText").textContent=
    user?`Selamat Datang, ${user.username}!`:"";}

// Pembelian dummy
function beli(j,h){sessionStorage.setItem("currentPurchase",JSON.stringify({judul:j,harga:h,tanggal:new Date().toISOString().split("T")[0],status:"Proses"}));showPage("pembayaran");}
function bayar(){}
function kirimPembayaran(){}

// Riwayat & Daftar
function loadRiwayat(){}
function loadDaftarSaya(){}

// Init
showPage("login");