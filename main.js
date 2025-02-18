const semicircle = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer')
const buttons = document.querySelectorAll('.btn button');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('reset');


let setTime = 0; // Menyimpan waktu dalam milidetik
let remainingTime = 0 // menyimpan waktu yang tersisi
let futureTime = 0;
let timerLoop;
let selectedButton = null; // Simpan tombol yang dipilih
let timerRunning = false;


// Fungsi untuk mengupdate tampilan timer
function updateTimerDisplay(ms) {
    const mins = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const secs = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');

    timer.innerHTML = `
        <div>${mins}</div>
        <div class='colon'>:</div>
        <div>${secs}</div>
    `;
}

// Atur tampilan timer saat halaman dimuat
updateTimerDisplay(0);

// Event listener untuk tombol pilihan waktu
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let minutes = parseInt(button.id.split('_')[0]); // Mengambil angka dari ID button
        setTime = minutes * 60000; // Konversi menit ke milidetik
        updateTimerDisplay(setTime); // Tampilkan waktu di timer

         // Efek visual: Tambahkan class "selected" ke tombol yang dipilih
         buttons.forEach(btn => btn.classList.remove('selected'));
         button.classList.add('selected');
         selectedButton = button;
    });
});


function countDownTimer() {
    const currentTime = Date.now();
    remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;

    // progress indicator
    if(angle > 180) {
        semicircle[2].style.display = 'none';
        semicircle[0].style.transform = 'rotate(180deg)';
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircle[2].style.display = 'block';
        semicircle[0].style.transform = `rotate(${angle}deg)`;
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    }

     // Update timer tampilan
     updateTimerDisplay(remainingTime);

     // Ubah warna jika kurang dari 5 detik
     if (remainingTime <= 5000 && remainingTime > 0) {
         semicircle[0].style.backgroundColor = 'red';
         semicircle[1].style.backgroundColor = 'red';
         timer.style.color = 'red';
     }
 
     // Hentikan timer jika sudah habis
     if (remainingTime <= 0) {
         clearInterval(timerLoop);
         semicircle.forEach(el => el.style.display = 'none');
         updateTimerDisplay(0);
         timer.style.color = 'lightgray';
         startStopBtn.innerText = 'Start';
         timerRunning = false;

         // Aktifkan kembali semua tombol
        buttons.forEach(btn => btn.disabled = false);
        if (selectedButton) selectedButton.classList.remove('selected');
     } else {
        updateTimerDisplay(remainingTime);
     }

}

// Event listener untuk tombol Start
startStopBtn.addEventListener('click', () => {
    if (timerRunning) {
        clearInterval(timerLoop);  // Hentikan timer
        startStopBtn.innerText = 'Start';  // Ubah teks tombol jadi Start
        startStopBtn.style.backgroundColor = '';  // Kembalikan warna tombol ke semula

        // Nonaktifkan tombol yang tidak dipilih
        buttons.forEach(btn => {
            btn.disabled = false;
        });

    } else {
        if (setTime > 0 || remainingTime > 0) {

            // Perbaikan perhitungan waktu
            if (remainingTime > 0) {
                futureTime = Date.now() + remainingTime;
            } else {
                futureTime = Date.now() + setTime;
            }


            clearInterval(timerLoop); // Hentikan timer sebelumnya jika ada
            timerLoop = setInterval(countDownTimer, 1000);
            countDownTimer(); // Jalankan fungsi pertama kali

            startStopBtn.innerText = 'Stop';  // Ubah teks tombol jadi Stop
            startStopBtn.style.backgroundColor = 'red';  // Ubah warna tombol jadi merah

            // Nonaktifkan tombol yang tidak dipilih
            buttons.forEach(btn => {
                if (btn !== selectedButton) {
                    btn.disabled = true;
                }
            });
        }
    }
    timerRunning = !timerRunning;  // Toggle status timer
});

// Event listener tombol Reset
resetBtn.addEventListener('click', () => {
    updateTimerDisplay(setTime);
    remainingTime = setTime;
    const angle = (remainingTime / setTime) * 360;

    // progress indicator
    if(angle > 180) {
        semicircle[2].style.display = 'none';
        semicircle[0].style.transform = 'rotate(180deg)';
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircle[2].style.display = 'block';
        semicircle[0].style.transform = `rotate(${angle}deg)`;
        semicircle[1].style.transform = `rotate(${angle}deg)`;
    }

    if (timerRunning) {
        console.log('reset sambil timer jalan')
        clearInterval(timerLoop);  // Hentikan timer
        startStopBtn.innerText = 'Start';  // Ubah teks tombol jadi Start
        startStopBtn.style.backgroundColor = '';  // Kembalikan warna tombol ke semula
        timerRunning = !timerRunning;  // Toggle status timer
    }
    
});
