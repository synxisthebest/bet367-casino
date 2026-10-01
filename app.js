/**
 * BET367 ROYALE - CASINO, TÀI XỈU MD5 & LÔ ĐỀ 1 ĂN 99.5
 */

// Trạng thái hội viên Bet367
let currentUser = {
  isLoggedIn: true,
  username: "newplayer3667",
  email: "newplayer3667@bet367.vn",
  balance: 0,
  totalDeposited: 0,
  totalWithdrawn: 0,
  vipLevel: "Hội Viên Mới",
  history: []
};

// Định dạng thời gian chuẩn giao dịch
function getFormattedTimestamp(d = new Date()) {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${mins}`;
}

// Định dạng tiền tệ VNĐ
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
}

// Cập nhật giao diện theo trạng thái người dùng
function updateUI() {
  const topUserName = document.getElementById("top-user-name");
  const topUserBalance = document.getElementById("top-user-balance");
  const heroDisplayBalance = document.getElementById("hero-display-balance");
  const drawerUsername = document.getElementById("drawer-username");
  const drawerBalance = document.getElementById("drawer-balance");
  const accModalUsername = document.getElementById("acc-modal-username");
  const accModalBalance = document.getElementById("acc-modal-balance");
  const accModalEmail = document.getElementById("acc-modal-email");
  const guestActions = document.getElementById("guest-actions");

  const formattedBal = formatVND(currentUser.balance);
  const formattedDeposited = formatVND(currentUser.totalDeposited || 0);
  const formattedWithdrawn = formatVND(currentUser.totalWithdrawn || 0);

  if (topUserName) topUserName.innerText = currentUser.username;
  if (topUserBalance) topUserBalance.innerText = formattedBal;
  if (heroDisplayBalance) heroDisplayBalance.innerText = formattedBal;
  if (drawerUsername) drawerUsername.innerText = currentUser.username;
  if (drawerBalance) drawerBalance.innerText = formattedBal;
  if (accModalUsername) accModalUsername.innerText = currentUser.username;
  if (accModalBalance) accModalBalance.innerText = formattedBal;
  if (accModalEmail) accModalEmail.innerText = `${currentUser.email} • ${currentUser.vipLevel}`;

  // Thống kê ví trong Modal Tài Khoản
  const accTotalDeposited = document.getElementById("acc-total-deposited");
  if (accTotalDeposited) accTotalDeposited.innerText = (currentUser.totalDeposited > 0 ? "+" : "") + formattedDeposited;

  const accTotalWithdrawn = document.getElementById("acc-total-withdrawn");
  if (accTotalWithdrawn) accTotalWithdrawn.innerText = (currentUser.totalWithdrawn > 0 ? "-" : "") + formattedWithdrawn;

  // Cập nhật số dư ở các cửa sổ nạp/rút
  const depositCurrentBal = document.getElementById("deposit-current-bal");
  if (depositCurrentBal) depositCurrentBal.innerText = formattedBal;

  const withdrawAvailableBal = document.getElementById("withdraw-available-bal");
  if (withdrawAvailableBal) withdrawAvailableBal.innerText = formattedBal;

  if (typeof updateDemoDepositPreview === 'function') updateDemoDepositPreview();
  if (typeof updateDemoWithdrawPreview === 'function') updateDemoWithdrawPreview();

  const txBadge = document.getElementById("tx-wallet-badge");
  const lodeBadge = document.getElementById("lode-wallet-badge");
  const casinoBadge = document.getElementById("casino-page-wallet-badge");
  const sportsBadge = document.getElementById("sports-wallet-badge");
  const slotsBadge = document.getElementById("slots-wallet-badge");
  if (txBadge) txBadge.innerText = formattedBal;
  if (lodeBadge) lodeBadge.innerText = formattedBal;
  if (casinoBadge) casinoBadge.innerText = formattedBal;
  if (sportsBadge) sportsBadge.innerText = formattedBal;
  if (slotsBadge) slotsBadge.innerText = formattedBal;

  if (guestActions) {
    guestActions.style.display = currentUser.isLoggedIn ? "none" : "flex";
  }

  renderHistoryTable();
}

// Render bảng lịch sử cược và giao dịch
function renderHistoryTable() {
  const tbody = document.getElementById("history-tbody");
  if (!tbody) return;

  if (!currentUser.history || currentUser.history.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 32px;"><i class="fa-solid fa-receipt" style="font-size: 1.5rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>Chưa có lịch sử giao dịch nào</td></tr>`;
    return;
  }

  tbody.innerHTML = currentUser.history.map(item => {
    const isPlus = item.amount > 0;
    const amountClass = isPlus ? "text-emerald font-bold" : "text-danger font-bold";
    const amountStr = (isPlus ? "+" : "") + formatVND(item.amount);
    const balanceAfterStr = item.balanceAfter !== undefined ? formatVND(item.balanceAfter) : "—";

    let badgeClass = "badge-emerald";
    const t = (item.type || "").toLowerCase();
    if (t.includes("deposit") || t.includes("nạp")) badgeClass = "badge-emerald";
    else if (t.includes("withdraw") || t.includes("rút")) badgeClass = "badge-danger";
    else if (t.includes("loss") || t.includes("thua") || t.includes("cược")) badgeClass = "badge-danger";
    else if (t.includes("win") || t.includes("thắng") || t.includes("trúng")) badgeClass = "badge-gold";

    const isDone = (item.status === "Completed" || item.status === "Thành công" || item.status === "Hoàn tất");
    const statusBadge = isDone
      ? `<span class="badge badge-success"><i class="fa-solid fa-check"></i> ${item.status}</span>`
      : `<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> ${item.status}</span>`;

    return `
      <tr>
        <td class="font-bold text-silver">#${item.id}</td>
        <td><span class="badge ${badgeClass}">${item.type}</span></td>
        <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${item.channel || ''}">${item.channel || 'Giao dịch ví'}</td>
        <td class="${amountClass}">${amountStr}</td>
        <td class="text-silver font-semibold">${balanceAfterStr}</td>
        <td style="white-space: nowrap; font-size: 0.8rem; color: #94a3b8;">${item.date}</td>
        <td>${statusBadge}</td>
      </tr>
    `;
  }).join('');
}

// Hiển thị thông báo Toast Hoàng Gia
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  let icon = "fa-crown text-gold";
  if (type === "error") icon = "fa-triangle-exclamation text-danger";
  if (type === "win") icon = "fa-trophy text-gold";

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.35s ease";
    setTimeout(() => toast.remove(), 350);
  }, 3800);
}

// ==================== ÂM THANH CHIẾN THẮNG CASINO (WEB AUDIO API TỰ ĐỘNG) ====================
let soundEnabled = true;

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("sound-toggle-btn");
  const icon = document.getElementById("sound-icon");
  const text = document.getElementById("sound-text");
  if (btn && icon && text) {
    if (soundEnabled) {
      btn.classList.remove("muted");
      icon.className = "fa-solid fa-volume-high";
      text.innerText = "Âm thanh";
      showToast("Đã bật âm thanh sòng bài!");
    } else {
      btn.classList.add("muted");
      icon.className = "fa-solid fa-volume-xmark";
      text.innerText = "Đã tắt";
      showToast("Đã tắt âm thanh sòng bài.");
    }
  }
}

let _sharedRoyalAudioCtx = null;
function getSharedRoyalAudioCtx() {
  try {
    if (!_sharedRoyalAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) _sharedRoyalAudioCtx = new AudioCtx();
    }
    if (_sharedRoyalAudioCtx && _sharedRoyalAudioCtx.state === 'suspended') {
      _sharedRoyalAudioCtx.resume().catch(() => {});
    }
    return _sharedRoyalAudioCtx;
  } catch (e) {
    return null;
  }
}

function playCasinoWinChime() {
  if (!soundEnabled) return;
  try {
    const ctx = getSharedRoyalAudioCtx();
    if (!ctx) return;

    // Hợp âm chiến thắng rạng rỡ (Đô - Mi - Sol - Đô cao)
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.7);
    });

    // Tiếng đồng xu keng leng keng
    for (let c = 0; c < 5; c++) {
      const coinOsc = ctx.createOscillator();
      const coinGain = ctx.createGain();
      coinOsc.type = "triangle";
      coinOsc.frequency.setValueAtTime(2400 + Math.random() * 800, ctx.currentTime + 0.5 + c * 0.08);

      coinGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.5 + c * 0.08);
      coinGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5 + c * 0.08 + 0.18);

      coinOsc.connect(coinGain);
      coinGain.connect(ctx.destination);

      coinOsc.start(ctx.currentTime + 0.5 + c * 0.08);
      coinOsc.stop(ctx.currentTime + 0.5 + c * 0.08 + 0.2);
    }
  } catch (e) {
    // Trình duyệt chặn autoplay âm thanh khi chưa tương tác
  }
}

// ==================== HIỆU ỨNG CHIẾN THẮNG BIG WIN HOÀNG GIA ====================
function triggerBigWinCelebration(amount, title = "CHIẾN THẮNG RỰC RỠ!", subtitle = "Tiền thưởng đã được cộng tức thì vào số dư khả dụng của quý khách!") {
  const overlay = document.getElementById("big-win-overlay");
  const titleEl = document.getElementById("win-title-display");
  const amountEl = document.getElementById("win-amount-display");
  const subEl = document.getElementById("win-subtitle-display");

  if (titleEl) titleEl.innerText = title;
  if (subEl) subEl.innerText = subtitle;

  // 1. Âm thanh chuông vàng chiến thắng
  playCasinoWinChime();

  // 2. Mở màn hình Big Win lộng lẫy
  if (overlay) {
    overlay.classList.add("active");
  }

  // 3. Hiệu ứng nhảy số tiền vù vù (Rolling Counter)
  animateWinAmountRoll(amountEl, amount);

  // 4. Mưa tiền vàng, kim cương & pháo hoa rơi rực rỡ
  spawnCelebrationParticles();

  // 5. Toast thắng cược mạ vàng phát sáng
  showToast(`🎉 CHÚC MỪNG! Quý khách nhận được +${formatVND(amount)}!`, "win");

  // Tự động đóng sau 5.5 giây nếu người chơi không bấm nút
  clearTimeout(window.winCelebrationTimer);
  window.winCelebrationTimer = setTimeout(() => {
    closeBigWinCelebration();
  }, 5500);
}

function closeBigWinCelebration() {
  const overlay = document.getElementById("big-win-overlay");
  if (overlay) overlay.classList.remove("active");
}

// Hiệu ứng nhảy số tiền từ 0 lên targetAmount
function animateWinAmountRoll(targetElement, targetVal) {
  if (!targetElement) return;
  const duration = 1200; // 1.2s
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing easeOutExpo
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = Math.floor(easeProgress * targetVal);

    targetElement.innerText = new Intl.NumberFormat('vi-VN').format(currentVal);

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      targetElement.innerText = new Intl.NumberFormat('vi-VN').format(targetVal);
    }
  }

  requestAnimationFrame(updateNumber);
}

function spawnCelebrationParticles() {
  const container = document.getElementById("celebration-particles");
  if (!container) return;
  container.innerHTML = "";

  const particleIcons = ["🪙", "✨", "👑", "💎", "⭐", "🎉", "💰", "💵"];
  const count = 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.innerText = particleIcons[Math.floor(Math.random() * particleIcons.length)];
    p.style.position = "absolute";
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${-15 - Math.random() * 25}%`;
    p.style.fontSize = `${20 + Math.random() * 28}px`;
    p.style.opacity = `${0.8 + Math.random() * 0.2}`;
    p.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.5))";
    p.style.transition = `transform ${2.2 + Math.random() * 1.8}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${2.2 + Math.random() * 1.8}s ease-out`;
    p.style.pointerEvents = "none";
    p.style.willChange = "transform, opacity";
    container.appendChild(p);

    setTimeout(() => {
      p.style.transform = `translateY(${window.innerHeight + 140}px) rotate(${Math.random() * 720 - 360}deg) scale(${0.8 + Math.random() * 0.4})`;
      p.style.opacity = "0";
    }, 50);

    p.addEventListener("transitionend", () => {
      p.remove();
    }, { once: true });
  }
}

// Đồng hồ thời gian thực
function startClock() {
  const clockEl = document.getElementById("clock-display");
  if (!clockEl) return;
  setInterval(() => {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('vi-VN');
  }, 1000);
}

// Jackpot Counter nhảy số liên tục
let currentJackpot = 188954230000;
function startJackpotTicker() {
  const jackpotEl = document.getElementById("jackpot-number");
  if (!jackpotEl) return;

  setInterval(() => {
    const randomAdd = Math.floor(Math.random() * 850000) + 150000;
    currentJackpot += randomAdd;
    jackpotEl.innerHTML = `${new Intl.NumberFormat('vi-VN').format(currentJackpot)} <span class="currency-tag">VNĐ</span>`;
  }, 2200);
}

// Cuộn đến mục chỉ định
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==================== LOGIC TÀI XỈU MD5 LIVESTREAM ====================
let txCurrentRound = 367899;
let txCountdownTime = 40;
let txUserBetGate = null;
let txUserBetAmount = 100000;
let txSelectedChip = 100000;
let txIsShaking = false;
let txPendingResult = null;

// Lịch sử các phiên lắc Tài Xỉu
let txHistoryList = [
  { roundId: 367898, d1: 4, d2: 4, d3: 5, sum: 13, result: "TAI", betGate: "TAI", betAmt: 200000, winAmt: 196000, time: "20:48:15" },
  { roundId: 367897, d1: 1, d2: 3, d3: 2, sum: 6, result: "XIU", betGate: "XIU", betAmt: 100000, winAmt: 98000, time: "20:45:00" },
  { roundId: 367896, d1: 6, d2: 5, d3: 4, sum: 15, result: "TAI", betGate: "XIU", betAmt: 50000, winAmt: -50000, time: "20:41:30" },
  { roundId: 367895, d1: 2, d2: 3, d3: 3, sum: 8, result: "XIU", betGate: "XIU", betAmt: 500000, winAmt: 490000, time: "20:38:10" },
  { roundId: 367894, d1: 5, d2: 6, d3: 1, sum: 12, result: "TAI", betGate: "TAI", betAmt: 300000, winAmt: 294000, time: "20:34:50" },
  { roundId: 367893, d1: 1, d2: 2, d3: 4, sum: 7, result: "XIU", betGate: null, betAmt: 0, winAmt: 0, time: "20:31:20" }
];

const diceIconMap = [
  "",
  "fa-dice-one",
  "fa-dice-two",
  "fa-dice-three",
  "fa-dice-four",
  "fa-dice-five",
  "fa-dice-six"
];

const diceCharMap = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

function setTaixiuChip(amt) {
  txSelectedChip = amt;
  txUserBetAmount = amt;
  const input = document.getElementById("tx-bet-amount");
  if (input) input.value = amt;

  document.querySelectorAll(".chip-coins-list .coin-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const clicked = Array.from(document.querySelectorAll(".chip-coins-list .coin-btn")).find(b => b.innerText.includes(amt >= 1000000 ? `${amt / 1000000}M` : `${amt / 1000}K`));
  if (clicked) clicked.classList.add("active");

  if (txUserBetGate) {
    updateBetGateDisplay();
  }
}

// Bắt buộc chọn TÀI hoặc XỈU trước khi lắc
function selectBetGate(gate) {
  if (txIsShaking) {
    showToast("Bát đang lắc, không thể đổi cửa cược!", "error");
    return;
  }

  const input = document.getElementById("tx-bet-amount");
  const betAmt = parseInt(input.value) || 100000;
  txUserBetAmount = betAmt;

  if (currentUser.balance < betAmt) {
    showToast("Số dư không đủ! Vui lòng nạp thêm tiền.", "error");
    openModal("deposit-modal");
    return;
  }

  txUserBetGate = gate;
  updateBetGateDisplay();
  const gateName = gate === 'TAI' ? 'TÀI' : 'XỈU';
  showToast(`Quý khách đã chọn cửa ${gateName} (${formatVND(betAmt)}). Bấm "LẮC BÁT" để bắt đầu!`);
}

function updateBetGateDisplay() {
  document.querySelectorAll(".bet-gate-box").forEach(b => b.classList.remove("active"));
  const tagTai = document.getElementById("user-bet-tai-tag");
  const tagXiu = document.getElementById("user-bet-xiu-tag");
  const noticeEl = document.getElementById("bet-notice-text");

  if (tagTai) tagTai.style.display = "none";
  if (tagXiu) tagXiu.style.display = "none";

  if (txUserBetGate === 'TAI') {
    document.getElementById("gate-tai")?.classList.add("active");
    if (tagTai) {
      tagTai.style.display = "inline-block";
      document.getElementById("bet-amt-tai-display").innerText = formatVND(txUserBetAmount);
    }
    if (noticeEl) {
      noticeEl.innerHTML = `Đang chọn: <strong class="text-danger">TÀI (11-17)</strong> - Mức cược: <strong class="text-gold">${formatVND(txUserBetAmount)}</strong>. Hãy bấm <strong>LẮC BÁT XÚC XẮC</strong>!`;
    }
  } else if (txUserBetGate === 'XIU') {
    document.getElementById("gate-xiu")?.classList.add("active");
    if (tagXiu) {
      tagXiu.style.display = "inline-block";
      document.getElementById("bet-amt-xiu-display").innerText = formatVND(txUserBetAmount);
    }
    if (noticeEl) {
      noticeEl.innerHTML = `Đang chọn: <strong class="text-blue">XỈU (4-10)</strong> - Mức cược: <strong class="text-gold">${formatVND(txUserBetAmount)}</strong>. Hãy bấm <strong>LẮC BÁT XÚC XẮC</strong>!`;
    }
  } else {
    if (noticeEl) {
      noticeEl.innerHTML = `Quý khách vui lòng chọn cửa <strong>TÀI</strong> hoặc <strong>XỈU</strong> và mức cược trước khi bấm lắc bát!`;
    }
  }
}

function cancelCurrentBet() {
  if (txIsShaking) {
    showToast("Không thể hủy khi bát đang lắc!", "error");
    return;
  }
  txUserBetGate = null;
  updateBetGateDisplay();
  showToast("Đã hủy chọn cửa cược.");
}

// Bắt đầu Lắc Bát có kiểm tra chọn cửa
function handleStartShake() {
  // 1. Kiểm tra đã chọn cửa chưa
  if (!txUserBetGate) {
    showToast("⚠️ BẠN PHẢI CHỌN CỬA TÀI HOẶC XỈU TRƯỚC KHI LẮC!", "error");
    
    // Rung cảnh báo 2 cửa
    const gateTai = document.getElementById("gate-tai");
    const gateXiu = document.getElementById("gate-xiu");
    gateTai?.classList.add("active");
    gateXiu?.classList.add("active");
    setTimeout(() => {
      if (!txUserBetGate) {
        gateTai?.classList.remove("active");
        gateXiu?.classList.remove("active");
      }
    }, 1000);
    return;
  }

  // 2. Kiểm tra số dư
  const input = document.getElementById("tx-bet-amount");
  const betAmt = parseInt(input.value) || 100000;
  txUserBetAmount = betAmt;

  if (currentUser.balance < betAmt) {
    showToast("Số dư tài khoản không đủ để đặt cược!", "error");
    openModal("deposit-modal");
    return;
  }

  // Khấu trừ tiền cược
  currentUser.balance -= betAmt;
  updateUI();

  // Khởi động trạng thái lắc: CHỈ CÁI HỘP LẮC, ẨN HOÀN TOÀN XÚC XẮC
  txIsShaking = true;
  const shakerBox = document.getElementById("royal-shaker-box");
  const statusText = document.getElementById("shaker-status-text");
  const diceStage = document.getElementById("revealed-dice-stage");
  const totalDisplay = document.getElementById("dice-total-display");
  const btnShake = document.getElementById("btn-start-shake");

  // 1. Ẩn xúc xắc hoàn toàn, chỉ hiện và rung lắc cái hộp
  if (diceStage) diceStage.style.display = "none";
  if (shakerBox) {
    shakerBox.style.display = "flex";
    shakerBox.classList.remove("opened");
    shakerBox.classList.add("shaking-box");
  }
  if (statusText) statusText.innerText = "ĐANG LẮC HỘP...";

  if (btnShake) {
    btnShake.disabled = true;
    btnShake.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ĐANG LẮC HỘP...';
  }

  // Tạo kết quả ngẫu nhiên bí mật
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const d3 = Math.floor(Math.random() * 6) + 1;
  const sum = d1 + d2 + d3;
  const result = (sum >= 11 && sum <= 17) ? "TAI" : "XIU";

  txPendingResult = { d1, d2, d3, sum, result, roundId: txCurrentRound };

  // Sau 2.2 giây lắc mạnh
  setTimeout(() => {
    if (statusText) statusText.innerText = "LẮC XONG - MỞ HỘP!";
    
    // Tự động mở hộp để lộ xúc xắc
    setTimeout(() => {
      openBowlProcess();
    }, 400);
  }, 2200);
}

function openBowlManually() {
  openBowlProcess();
}

// Lắc xong: Nhấc hộp lên và hé lộ 3 viên xúc xắc
function openBowlProcess() {
  if (!txPendingResult) return;

  const { d1, d2, d3, sum, result, roundId } = txPendingResult;

  const shakerBox = document.getElementById("royal-shaker-box");
  const diceStage = document.getElementById("revealed-dice-stage");
  const totalDisplay = document.getElementById("dice-total-display");
  const btnShake = document.getElementById("btn-start-shake");

  // 1. Hộp lắc nhấc lên và ẩn đi
  if (shakerBox) {
    shakerBox.classList.remove("shaking-box");
    shakerBox.classList.add("opened");
    setTimeout(() => {
      shakerBox.style.display = "none";
    }, 450);
  }

  // 2. Cập nhật mặt xúc xắc
  document.getElementById("dice-1").innerHTML = `<i class="fa-solid ${diceIconMap[d1]}"></i>`;
  document.getElementById("dice-2").innerHTML = `<i class="fa-solid ${diceIconMap[d2]}"></i>`;
  document.getElementById("dice-3").innerHTML = `<i class="fa-solid ${diceIconMap[d3]}"></i>`;

  // 3. HIỆN XÚC XẮC VÀ TỔNG ĐIỂM (LẮC XONG MỚI HIỆN)
  if (diceStage) {
    diceStage.style.display = "flex";
  }
  if (totalDisplay) {
    totalDisplay.innerText = `Tổng: ${sum} (${result === 'TAI' ? 'TÀI' : 'XỈU'})`;
    totalDisplay.className = `dice-sum-badge ${result === 'TAI' ? 'text-danger' : 'text-blue'}`;
  }

  // Cập nhật soi cầu
  addCauDot(result);

  // Xử lý thắng / thua
  const isWin = (txUserBetGate === result);
  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  let winAmt = 0;

  const resultName = result === 'TAI' ? 'TÀI' : 'XỈU';

  if (isWin) {
    const returnMoney = txUserBetAmount * 1.98;
    currentUser.balance += returnMoney;
    winAmt = Math.round(txUserBetAmount * 0.98);

    currentUser.history.unshift({
      id: "TX" + Math.floor(1000 + Math.random() * 9000),
      type: "Game win",
      channel: `Tài Xỉu #${roundId} (${resultName} ${sum})`,
      amount: returnMoney,
      balanceAfter: currentUser.balance,
      date: getFormattedTimestamp(),
      status: "Hoàn tất"
    });

    // HIỆU ỨNG CHIẾN THẮNG LỘNG LẪY: Vương miện, pháo hoa, ánh kim và đếm tiền
    triggerBigWinCelebration(returnMoney, `CHIẾN THẮNG ${resultName} (${sum})!`, `Chúc mừng quý khách đã dự đoán chính xác phiên #${roundId}!`);
  } else {
    winAmt = -txUserBetAmount;
    currentUser.history.unshift({
      id: "TX" + Math.floor(1000 + Math.random() * 9000),
      type: "Game loss",
      channel: `Tài Xỉu #${roundId} (${resultName} ${sum})`,
      amount: -txUserBetAmount,
      balanceAfter: currentUser.balance,
      date: getFormattedTimestamp(),
      status: "Hoàn tất"
    });

    // KHI MẤT TIỀN: KHÔNG THÔNG BÁO THẲNG TAY
    // Không bắn toast lỗi màu đỏ làm cụt hứng người chơi, chỉ nhẹ nhàng hiển thị trạng thái
    const noticeEl = document.getElementById("bet-notice-text");
    if (noticeEl) {
      noticeEl.innerHTML = `Kết quả phiên #${roundId}: <strong class="${result === 'TAI' ? 'text-danger' : 'text-blue'}">${resultName} (${sum})</strong>. Chúc quý khách may mắn ở phiên cược tiếp theo!`;
    }
  }

  // Lưu vào lịch sử phiên lắc
  txHistoryList.unshift({
    roundId: roundId,
    d1: d1,
    d2: d2,
    d3: d3,
    sum: sum,
    result: result,
    betGate: txUserBetGate,
    betAmt: txUserBetAmount,
    winAmt: winAmt,
    time: timeStr
  });

  renderTxHistoryTable();
  updateUI();

  // Khôi phục nút bấm cho phiên tiếp theo
  txIsShaking = false;
  txUserBetGate = null;
  txPendingResult = null;
  updateBetGateDisplay();

  if (btnShake) {
    btnShake.disabled = false;
    btnShake.innerHTML = '<i class="fa-solid fa-rotate"></i> LẮC HỘP XÚC XẮC';
  }

  // Tăng mã phiên
  txCurrentRound++;
  document.getElementById("tx-round-id").innerText = `#${txCurrentRound}`;
}

function addCauDot(result) {
  const cauContainer = document.getElementById("cau-dots-list");
  if (!cauContainer) return;

  const dot = document.createElement("span");
  dot.className = result === 'TAI' ? "dot-tai" : "dot-xiu";
  dot.innerText = result === 'TAI' ? "T" : "X";
  cauContainer.appendChild(dot);

  if (cauContainer.children.length > 12) {
    cauContainer.removeChild(cauContainer.children[0]);
  }
}

// Render Bảng Lịch Sử Lắc Tài Xỉu
function renderTxHistoryTable() {
  const tbody = document.getElementById("tx-history-tbody");
  const countEl = document.getElementById("total-rounds-count");
  if (!tbody) return;

  if (countEl) countEl.innerText = txHistoryList.length;

  tbody.innerHTML = txHistoryList.slice(0, 10).map(item => {
    const isTai = item.result === "TAI";
    const resultBadge = isTai 
      ? `<span class="tx-badge-tai">TÀI</span>` 
      : `<span class="tx-badge-xiu">XỈU</span>`;

    let betInfo = `<span class="text-silver">Không cược</span>`;
    let winInfo = `-`;

    if (item.betGate) {
      const isBetTai = item.betGate === "TAI";
      const gateName = isBetTai ? "TÀI" : "XỈU";
      betInfo = `<strong class="${isBetTai ? 'text-danger' : 'text-blue'}">${gateName}</strong> (${formatVND(item.betAmt)})`;
      
      if (item.winAmt > 0) {
        winInfo = `<strong class="text-emerald font-bold">+${formatVND(item.winAmt)}</strong>`;
      } else {
        winInfo = `<strong class="text-danger font-bold">${formatVND(item.winAmt)}</strong>`;
      }
    }

    const diceChars = `${diceCharMap[item.d1]} ${diceCharMap[item.d2]} ${diceCharMap[item.d3]}`;

    return `
      <tr>
        <td class="font-bold text-gold">#${item.roundId}</td>
        <td><span class="tx-dice-mini text-gold font-bold">${diceChars}</span> (${item.d1}+${item.d2}+${item.d3})</td>
        <td class="font-bold text-white">${item.sum}</td>
        <td>${resultBadge}</td>
        <td>${betInfo}</td>
        <td>${winInfo}</td>
        <td class="text-silver">${item.time}</td>
      </tr>
    `;
  }).join('');
}

function refreshTxHistory() {
  renderTxHistoryTable();
  showToast("Đã cập nhật lịch sử các phiên Tài Xỉu!");
}

// Vòng lặp đếm ngược phiên Tài Xỉu tự động
function startTaixiuAutoLoop() {
  const cdEl = document.getElementById("tx-countdown");
  if (!cdEl) return;

  setInterval(() => {
    txCountdownTime--;
    if (txCountdownTime <= 0) {
      cdEl.innerText = "0s";
      if (!txIsShaking) {
        // Tự động kích hoạt lắc phiên nếu đang ở sảnh
        if (txUserBetGate) {
          handleStartShake();
        } else {
          // Lắc tự động không cược
          runAutoShakeNoBet();
        }
      }
      txCountdownTime = 40;
    } else {
      cdEl.innerText = `${txCountdownTime}s`;
    }
  }, 1000);
}

// Phiên lắc tự động định kỳ nếu người chơi chưa cược
function runAutoShakeNoBet() {
  const bowlLid = document.getElementById("bowl-lid");
  const diceGroup = document.getElementById("dice-group");
  const totalDisplay = document.getElementById("dice-total-display");

  if (bowlLid) {
    bowlLid.classList.remove("opened");
    bowlLid.classList.add("shaking");
  }
  if (diceGroup) diceGroup.classList.remove("revealed");
  if (totalDisplay) totalDisplay.classList.remove("revealed");

  setTimeout(() => {
    if (bowlLid) {
      bowlLid.classList.remove("shaking");
      bowlLid.classList.add("opened");
    }

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const d3 = Math.floor(Math.random() * 6) + 1;
    const sum = d1 + d2 + d3;
    const result = (sum >= 11 && sum <= 17) ? "TAI" : "XIU";

    document.getElementById("dice-1").innerHTML = `<i class="fa-solid ${diceIconMap[d1]}"></i>`;
    document.getElementById("dice-2").innerHTML = `<i class="fa-solid ${diceIconMap[d2]}"></i>`;
    document.getElementById("dice-3").innerHTML = `<i class="fa-solid ${diceIconMap[d3]}"></i>`;

    if (diceGroup) diceGroup.classList.add("revealed");
    if (totalDisplay) {
      totalDisplay.innerText = `Tổng: ${sum} (${result === 'TAI' ? 'TÀI' : 'XỈU'})`;
      totalDisplay.className = `dice-sum-badge revealed ${result === 'TAI' ? 'text-danger' : 'text-blue'}`;
    }

    addCauDot(result);

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    txHistoryList.unshift({
      roundId: txCurrentRound,
      d1: d1,
      d2: d2,
      d3: d3,
      sum: sum,
      result: result,
      betGate: null,
      betAmt: 0,
      winAmt: 0,
      time: timeStr
    });

    renderTxHistoryTable();
    txCurrentRound++;
    document.getElementById("tx-round-id").innerText = `#${txCurrentRound}`;
  }, 2000);
}

// ==================== LOGIC ĐÁNH ĐỀ / LÔ ĐỀ 1 ĂN 99.5 ====================
let selectedLodeNumbers = ["68", "86", "36"];
let currentLodeRateRatio = 99.5;

function initLodeNumberBoard() {
  const grid = document.getElementById("quick-numbers-grid");
  if (!grid) return;

  grid.innerHTML = "";
  for (let i = 0; i <= 99; i++) {
    const numStr = String(i).padStart(2, '0');
    const isSelected = selectedLodeNumbers.includes(numStr);
    const cell = document.createElement("div");
    cell.className = "num-cell" + (isSelected ? " selected" : "");
    cell.innerText = numStr;
    cell.setAttribute("role", "button");
    cell.setAttribute("tabindex", "0");
    cell.setAttribute("aria-label", `Số ${numStr}`);
    cell.setAttribute("aria-pressed", isSelected ? "true" : "false");
    cell.onclick = () => toggleLodeNumber(numStr, cell);
    cell.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLodeNumber(numStr, cell);
      }
    };
    grid.appendChild(cell);
  }

  updateLodeStakeSummary();
}

function toggleLodeNumber(numStr, cellElement) {
  if (selectedLodeNumbers.includes(numStr)) {
    selectedLodeNumbers = selectedLodeNumbers.filter(n => n !== numStr);
    cellElement.classList.remove("selected");
    cellElement.setAttribute("aria-pressed", "false");
  } else {
    selectedLodeNumbers.push(numStr);
    cellElement.classList.add("selected");
    cellElement.setAttribute("aria-pressed", "true");
  }
  document.getElementById("lode-numbers-input").value = selectedLodeNumbers.join(", ");
  updateLodeStakeSummary();
}

function quickPickOdd() {
  selectedLodeNumbers = [];
  document.querySelectorAll(".num-cell").forEach(cell => {
    const val = parseInt(cell.innerText);
    if (val % 2 !== 0) {
      selectedLodeNumbers.push(cell.innerText);
      cell.classList.add("selected");
    } else {
      cell.classList.remove("selected");
    }
  });
  document.getElementById("lode-numbers-input").value = selectedLodeNumbers.join(", ");
  updateLodeStakeSummary();
}

function quickPickEven() {
  selectedLodeNumbers = [];
  document.querySelectorAll(".num-cell").forEach(cell => {
    const val = parseInt(cell.innerText);
    if (val % 2 === 0) {
      selectedLodeNumbers.push(cell.innerText);
      cell.classList.add("selected");
    } else {
      cell.classList.remove("selected");
    }
  });
  document.getElementById("lode-numbers-input").value = selectedLodeNumbers.join(", ");
  updateLodeStakeSummary();
}

function clearSelectedNumbers() {
  selectedLodeNumbers = [];
  document.querySelectorAll(".num-cell").forEach(c => c.classList.remove("selected"));
  document.getElementById("lode-numbers-input").value = "";
  updateLodeStakeSummary();
}

function switchStation(btn, station) {
  document.querySelectorAll(".station-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  showToast(`Đã chọn: ${btn.innerText}`);
}

function selectLodeType(card, typeName, rateStr) {
  document.querySelectorAll(".type-card").forEach(c => c.classList.remove("active"));
  card.classList.add("active");
  document.getElementById("current-lode-type").innerText = typeName;
  document.getElementById("current-lode-rate").innerText = `Tỷ lệ: ${rateStr}`;
  if (typeName.includes("99.5")) currentLodeRateRatio = 99.5;
  else if (typeName.includes("3 Càng")) currentLodeRateRatio = 960;
  else if (typeName.includes("Xiên")) currentLodeRateRatio = 17;
  else currentLodeRateRatio = 99;
  updateLodeStakeSummary();
}

function updateLodeStakeSummary() {
  const stakePerNum = parseInt(document.getElementById("lode-stake-input")?.value) || 50000;
  const count = selectedLodeNumbers.length;
  const total = count * stakePerNum;
  const potential = stakePerNum * currentLodeRateRatio;

  const totalEl = document.getElementById("lode-total-stake");
  const potentialEl = document.getElementById("lode-potential-win");
  if (totalEl) totalEl.innerText = formatVND(total);
  if (potentialEl) potentialEl.innerText = formatVND(potential);
}

document.getElementById("lode-stake-input")?.addEventListener("input", updateLodeStakeSummary);
document.getElementById("lode-numbers-input")?.addEventListener("input", (e) => {
  const parts = e.target.value.split(/[\s,]+/).filter(Boolean);
  selectedLodeNumbers = parts;
  document.querySelectorAll(".num-cell").forEach(c => {
    c.classList.toggle("selected", selectedLodeNumbers.includes(c.innerText));
  });
  updateLodeStakeSummary();
});

function confirmLodeBet() {
  if (selectedLodeNumbers.length === 0) {
    showToast("Vui lòng chọn ít nhất 1 con số may mắn!", "error");
    return;
  }
  const stakePerNum = parseInt(document.getElementById("lode-stake-input").value) || 50000;
  const total = selectedLodeNumbers.length * stakePerNum;

  if (currentUser.balance < total) {
    showToast("Số dư không đủ để chốt các con số này!", "error");
    openModal("deposit-modal");
    return;
  }

  currentUser.balance -= total;
  const typeName = document.getElementById("current-lode-type").innerText;
  currentUser.history.unshift({
    id: "DE" + Math.floor(1000 + Math.random() * 9000),
    type: "Chốt Số Đề",
    channel: `${typeName}: [${selectedLodeNumbers.slice(0, 4).join(', ')}${selectedLodeNumbers.length > 4 ? '...' : ''}]`,
    amount: -total,
    date: new Date().toLocaleTimeString('vi-VN'),
    status: "Đã ghi nhận"
  });

  updateUI();
  showToast(`Chốt số thành công: ${selectedLodeNumbers.length} số. Chúc quý khách nổ to 18h30!`);
}

// ==================== CÁC SỰ KIỆN MENU & MODAL ====================
const menuToggleBtn = document.getElementById("menu-toggle-btn");
const sideDrawer = document.getElementById("side-drawer");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const closeDrawerBtn = document.getElementById("close-drawer-btn");

function openDrawer() {
  if (sideDrawer) sideDrawer.classList.add("active");
  if (sidebarOverlay) sidebarOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  if (sideDrawer) sideDrawer.classList.remove("active");
  if (sidebarOverlay) sidebarOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (menuToggleBtn) menuToggleBtn.addEventListener("click", openDrawer);
if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeDrawer);

let _modalLastActiveElement = null;

function openModal(modalId) {
  closeDrawer();
  const modal = document.getElementById(modalId);
  if (modal) {
    _modalLastActiveElement = document.activeElement;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus the first focusable element inside the modal
    const focusable = modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      setTimeout(() => focusable[0].focus(), 50);
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    if (_modalLastActiveElement && typeof _modalLastActiveElement.focus === 'function') {
      _modalLastActiveElement.focus();
    }
  }
}

function switchModal(closeId, openId) {
  closeModal(closeId);
  setTimeout(() => openModal(openId), 200);
}

window.addEventListener("keydown", (e) => {
  const activeModal = document.querySelector(".royal-modal.active");
  if (e.key === "Escape") {
    if (activeModal) {
      closeModal(activeModal.id);
    }
    closeDrawer();
    document.body.style.overflow = "";
  } else if (e.key === "Tab" && activeModal) {
    // Trap focus inside active modal
    const focusables = Array.from(activeModal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    if (focusables.length === 0) return;
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
});

// Gán sự kiện mở modal & sound toggle
document.getElementById("sound-toggle-btn")?.addEventListener("click", toggleSound);
document.getElementById("btn-open-login")?.addEventListener("click", () => openModal("login-modal"));
document.getElementById("btn-open-register")?.addEventListener("click", () => openModal("register-modal"));
document.getElementById("btn-open-deposit")?.addEventListener("click", () => openModal("deposit-modal"));
document.getElementById("btn-open-account")?.addEventListener("click", () => openModal("account-modal"));

document.getElementById("drawer-deposit-btn")?.addEventListener("click", () => openModal("deposit-modal"));
document.getElementById("drawer-account-btn")?.addEventListener("click", () => openModal("account-modal"));
document.getElementById("drawer-history-btn")?.addEventListener("click", () => {
  openModal("account-modal");
  const tabBtn = document.querySelectorAll(".acc-tab-btn")[1];
  if (tabBtn) switchAccountTab("acc-history", tabBtn);
});

function switchAccountTab(tabId, btnElement) {
  document.querySelectorAll(".royal-tab-pane").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".acc-tab-btn").forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-selected", "false");
  });

  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");
  if (btnElement) {
    btnElement.classList.add("active");
    btnElement.setAttribute("aria-selected", "true");
  }
}

document.getElementById("drawer-logout-btn")?.addEventListener("click", () => {
  if (confirm("Quý khách có chắc chắn muốn đăng xuất tài khoản Bet367?")) {
    currentUser.isLoggedIn = false;
    currentUser.username = "Khách Quý";
    currentUser.balance = 0;
    updateUI();
    closeDrawer();
    showToast("Đã đăng xuất an toàn khỏi Bet367.");
  }
});

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const btn = input.nextElementSibling;
  if (input.type === "password") {
    input.type = "text";
    if (btn) btn.innerHTML = '<i class="fa-regular fa-eye-slash text-gold"></i>';
  } else {
    input.type = "password";
    if (btn) btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
  }
}

// ==================== HỆ THỐNG NẠP / RÚT TIỀN TỰ ĐỘNG ====================
let activeDepositChannel = 'demo-fast';

function selectDepositChannel(element, channelKey) {
  document.querySelectorAll(".deposit-channels-col .channel-card").forEach(c => c.classList.remove("active"));
  if (element) element.classList.add("active");
  activeDepositChannel = channelKey;
  const channelName = element ? element.querySelector("strong")?.innerText : "Kênh Nạp";
  showToast(`Đã chọn: ${channelName}`);
}

function selectDemoDepositAmount(amount) {
  const input = document.getElementById("demo-deposit-input");
  if (input) input.value = amount;

  document.querySelectorAll("#deposit-modal .chip-btn").forEach(btn => btn.classList.remove("active"));
  const clicked = Array.from(document.querySelectorAll("#deposit-modal .chip-btn")).find(b =>
    b.innerText.replace(/[^0-9]/g, '') === String(amount)
  );
  if (clicked) clicked.classList.add("active");

  updateDemoDepositPreview();
}

function updateDemoDepositPreview() {
  const input = document.getElementById("demo-deposit-input");
  const amt = parseInt(input?.value) || 0;
  const previewAmt = document.getElementById("deposit-preview-amount");
  const previewAfter = document.getElementById("deposit-preview-after");

  if (previewAmt) previewAmt.innerText = "+" + formatVND(amt);
  if (previewAfter) previewAfter.innerText = formatVND(currentUser.balance + amt);
}

function handleConfirmDemoDeposit() {
  const input = document.getElementById("demo-deposit-input");
  const amount = parseInt(input?.value) || 0;
  const btn = document.getElementById("btn-confirm-demo-deposit");
  const statusBox = document.getElementById("deposit-status-box");

  if (amount < 10000) {
    showToast("Vui lòng nhập số tiền nạp tối thiểu 10,000 ₫!", "error");
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý giao dịch nạp tiền...`;
  }
  if (statusBox) {
    statusBox.className = "transaction-status-feedback processing";
    statusBox.style.display = "flex";
    statusBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang kết nối cổng ngân hàng, xác nhận giao dịch...</span>`;
  }

  setTimeout(() => {
    currentUser.balance += amount;
    currentUser.totalDeposited = (currentUser.totalDeposited || 0) + amount;

    let channelTitle = "Nạp Nhanh VietQR 24/7";
    if (activeDepositChannel === 'demo-bank') channelTitle = "MB Bank: 3678.9999.367";
    if (activeDepositChannel === 'demo-wallet') channelTitle = "Ví MoMo Pay";

    const transId = "NAP-" + Math.floor(1000 + Math.random() * 9000);
    currentUser.history.unshift({
      id: transId,
      type: "Nạp Tiền",
      channel: channelTitle,
      amount: amount,
      balanceAfter: currentUser.balance,
      date: getFormattedTimestamp(),
      status: "Thành công"
    });

    playCasinoWinChime();
    updateUI();

    if (statusBox) {
      statusBox.className = "transaction-status-feedback success";
      statusBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Nạp tiền thành công <strong>+${formatVND(amount)}</strong>! Mã GD #${transId}. Số dư mới: <strong>${formatVND(currentUser.balance)}</strong>.</span>`;
    }

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Nạp Thêm Tiền`;
    }

    showToast(`Nạp tiền thành công +${formatVND(amount)}!`);
  }, 650);
}

function selectDemoWithdrawAmount(amount) {
  const input = document.getElementById("demo-withdraw-input");
  if (input) input.value = amount;

  document.querySelectorAll("#withdraw-modal .chip-btn").forEach(btn => btn.classList.remove("active"));
  const clicked = Array.from(document.querySelectorAll("#withdraw-modal .chip-btn")).find(b =>
    b.innerText.replace(/[^0-9]/g, '') === String(amount)
  );
  if (clicked) clicked.classList.add("active");

  updateDemoWithdrawPreview();
}

function selectDemoWithdrawAll() {
  const input = document.getElementById("demo-withdraw-input");
  if (input) input.value = Math.max(0, currentUser.balance);

  document.querySelectorAll("#withdraw-modal .chip-btn").forEach(btn => btn.classList.remove("active"));
  const allBtn = Array.from(document.querySelectorAll("#withdraw-modal .chip-btn")).find(b => b.innerText.includes("RÚT HẾT"));
  if (allBtn) allBtn.classList.add("active");

  updateDemoWithdrawPreview();
}

function updateDemoWithdrawPreview() {
  const input = document.getElementById("demo-withdraw-input");
  const amt = parseInt(input?.value) || 0;
  const previewAmt = document.getElementById("withdraw-preview-amount");
  const previewAfter = document.getElementById("withdraw-preview-after");
  const errorBox = document.getElementById("withdraw-error-box");
  const errorText = document.getElementById("withdraw-error-text");
  const btn = document.getElementById("btn-confirm-demo-withdraw");

  if (previewAmt) previewAmt.innerText = "-" + formatVND(amt);
  const remaining = currentUser.balance - amt;
  if (previewAfter) previewAfter.innerText = formatVND(Math.max(0, remaining));

  if (amt > currentUser.balance) {
    if (errorBox) errorBox.style.display = "flex";
    if (errorText) errorText.innerText = `Số dư khả dụng (${formatVND(currentUser.balance)}) không đủ để rút ${formatVND(amt)}!`;
    if (btn) btn.disabled = true;
  } else {
    if (errorBox) errorBox.style.display = "none";
    if (btn) btn.disabled = false;
  }
}

function handleConfirmDemoWithdraw() {
  const input = document.getElementById("demo-withdraw-input");
  const amount = parseInt(input?.value) || 0;
  const btn = document.getElementById("btn-confirm-demo-withdraw");
  const statusBox = document.getElementById("withdraw-status-box");

  if (amount < 50000) {
    showToast("Hạn mức rút tối thiểu là 50,000 ₫!", "error");
    return;
  }

  if (amount > currentUser.balance) {
    showToast("Số dư khả dụng không đủ để thực hiện giao dịch!", "error");
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý lệnh rút tiền...`;
  }
  if (statusBox) {
    statusBox.className = "transaction-status-feedback processing";
    statusBox.style.display = "flex";
    statusBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Hệ thống đang chuyển lệnh tới MB Bank (STK 3678.9999.367)...</span>`;
  }

  setTimeout(() => {
    currentUser.balance -= amount;
    currentUser.totalWithdrawn = (currentUser.totalWithdrawn || 0) + amount;

    const transId = "RUT-" + Math.floor(1000 + Math.random() * 9000);
    currentUser.history.unshift({
      id: transId,
      type: "Rút Tiền",
      channel: "MB Bank (STK 3678.9999.367)",
      amount: -amount,
      balanceAfter: currentUser.balance,
      date: getFormattedTimestamp(),
      status: "Thành công"
    });

    updateUI();

    if (statusBox) {
      statusBox.className = "transaction-status-feedback success";
      statusBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Rút tiền thành công <strong>-${formatVND(amount)}</strong>! Mã GD #${transId}. Số dư còn lại: <strong>${formatVND(currentUser.balance)}</strong>.</span>`;
    }

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Tiếp Tục Rút Tiền`;
    }

    showToast(`Rút tiền thành công -${formatVND(amount)}!`);
  }, 750);
}

function resetDemoSystem() {
  currentUser.balance = 0;
  currentUser.totalDeposited = 0;
  currentUser.totalWithdrawn = 0;
  currentUser.history = [];

  updateUI();
  showToast("Đã làm mới số dư ví tài khoản về 0 ₫!", "success");
}

function applyStartingBalance(amount) {
  currentUser.balance = amount;
  updateUI();
  showToast(`Đã cập nhật số dư: ${formatVND(amount)}!`, "success");
}

function applyCustomStartingBalance() {
  const input = document.getElementById("custom-starting-balance-input");
  const amt = parseInt(input?.value);
  if (isNaN(amt) || amt < 0) {
    showToast("Vui lòng nhập số tiền hợp lệ!", "error");
    return;
  }
  applyStartingBalance(amt);
}

document.getElementById("register-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fullname = document.getElementById("reg-fullname").value;
  const username = document.getElementById("reg-username").value;
  const pwd = document.getElementById("reg-password").value;
  const confirmPwd = document.getElementById("reg-confirm-password").value;

  if (pwd !== confirmPwd) {
    showToast("Mật khẩu xác nhận không trùng khớp!", "error");
    return;
  }

  currentUser.isLoggedIn = true;
  currentUser.username = fullname.toUpperCase() || username || "newplayer3667";
  currentUser.balance = 100000;
  
  updateUI();
  closeModal("register-modal");
  showToast(`Chào mừng thành viên VIP Bet367: ${currentUser.username}! Quà tân thủ +100,000 ₫!`);
});

document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;

  currentUser.isLoggedIn = true;
  currentUser.username = username || "newplayer3667";

  updateUI();
  closeModal("login-modal");
  showToast(`Chào mừng trở lại Bet367 VIP: ${currentUser.username}!`);
});

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Đã sao chép: ${text}`);
  }).catch(() => {
    showToast(`Đã sao chép: ${text}`);
  });
}

// ==================== HỆ THỐNG LIVE CASINO BET367 ROYALE ====================
let currentCasinoGame = 'baccarat';
let currentCasinoChip = 50000;
let casinoBets = {}; // { gateKey: amount }
let isCasinoDealing = false;
let baccaratRoadmap = ['P', 'B', 'B', 'P', 'T', 'B', 'B', 'P', 'B', 'P', 'P', 'B'];
let rouletteHistory = [14, 28, 9, 31, 0, 7, 22, 18];

// Bộ bài chuẩn 52 lá
const CARD_SUITS = [
  { symbol: '♠', name: 'spade', color: 'black' },
  { symbol: '♥', name: 'heart', color: 'red' },
  { symbol: '♦', name: 'diamond', color: 'red' },
  { symbol: '♣', name: 'club', color: 'black' }
];
const CARD_RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function getRandomCard() {
  const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
  const rank = CARD_RANKS[Math.floor(Math.random() * CARD_RANKS.length)];
  let value = 0;
  if (rank === 'A') value = 1;
  else if (['10', 'J', 'Q', 'K'].includes(rank)) value = 0;
  else value = parseInt(rank);

  let rawRankNum = CARD_RANKS.indexOf(rank) + 1; // 1 to 13 cho Rồng Hổ
  return { rank, suit: suit.symbol, color: suit.color, value, rankNum: rawRankNum };
}

function createCardHTML(card) {
  return `
    <div class="casino-card">
      <div class="card-inner suit-${card.color}">
        <div class="card-corner-top">
          <span class="card-rank">${card.rank}</span>
          <span class="card-suit">${card.suit}</span>
        </div>
        <div class="card-center-suit">${card.suit}</div>
        <div class="card-corner-bottom">
          <span class="card-rank">${card.rank}</span>
          <span class="card-suit">${card.suit}</span>
        </div>
      </div>
    </div>
  `;
}

// Chuyển đổi Game Casino
function switchCasinoGame(gameName, btnElement) {
  if (isCasinoDealing) {
    showToast("Ván bài đang diễn ra, vui lòng chờ kết thúc!", "error");
    return;
  }
  currentCasinoGame = gameName;
  document.querySelectorAll(".casino-tab-btn").forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-selected", "false");
  });
  if (btnElement) {
    btnElement.classList.add("active");
    btnElement.setAttribute("aria-selected", "true");
  }

  document.querySelectorAll(".casino-game-pane").forEach(p => p.classList.remove("active"));
  const targetPane = document.getElementById(`casino-game-${gameName}`);
  if (targetPane) targetPane.classList.add("active");

  clearCasinoBets();
  showToast(`Đã chuyển sảnh: ${btnElement ? btnElement.innerText.trim() : gameName.toUpperCase()}`);
}

// Chọn Chip cược
function selectCasinoChip(amount, btnElement) {
  currentCasinoChip = amount;
  document.querySelectorAll(".casino-chip").forEach(c => c.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
  showToast(`Đã chọn chip ${new Intl.NumberFormat('vi-VN').format(amount)} ₫`);
}

// Đặt cược vào cửa
function placeCasinoBet(gateKey, element) {
  if (isCasinoDealing) {
    showToast("Nhà cái đang chia bài, không thể đặt thêm cược!", "error");
    return;
  }

  if (currentUser.balance < currentCasinoChip) {
    showToast("Số dư khả dụng không đủ cho chip này!", "error");
    openModal("deposit-modal");
    return;
  }

  // Khấu trừ tiền cược
  currentUser.balance -= currentCasinoChip;
  casinoBets[gateKey] = (casinoBets[gateKey] || 0) + currentCasinoChip;

  updateCasinoUI();
  updateUI();

  // Hiển thị chip trên cửa
  const chipContainer = document.getElementById(`chip-${gateKey}`);
  if (chipContainer) {
    chipContainer.classList.add("active");
    chipContainer.innerHTML = `<span class="chip-token">${formatVND(casinoBets[gateKey])}</span>`;
  }

  const statusEl = document.getElementById("casino-status-text");
  if (statusEl) {
    statusEl.innerHTML = `Đã cược <strong class="text-gold">${formatVND(casinoBets[gateKey])}</strong> vào ô <strong>${gateKey}</strong>`;
  }
}

// Hủy tất cả cược
function clearCasinoBets() {
  if (isCasinoDealing) {
    showToast("Không thể hủy cược khi bài đang chia!", "error");
    return;
  }

  let totalRefund = 0;
  for (let key in casinoBets) {
    totalRefund += casinoBets[key];
    const chipContainer = document.getElementById(`chip-${key}`);
    if (chipContainer) {
      chipContainer.classList.remove("active");
      chipContainer.innerHTML = "";
    }
  }

  currentUser.balance += totalRefund;
  casinoBets = {};
  updateCasinoUI();
  updateUI();
  showToast("Đã hủy và hoàn trả tất cả chip cược.");
}

// Nhân đôi cược (X2)
function doubleCasinoBets() {
  if (isCasinoDealing) return;
  const currentTotal = Object.values(casinoBets).reduce((a, b) => a + b, 0);
  if (currentTotal === 0) {
    showToast("Vui lòng đặt cược trước khi nhân đôi!", "error");
    return;
  }

  if (currentUser.balance < currentTotal) {
    showToast("Số dư không đủ để nhân đôi cược!", "error");
    openModal("deposit-modal");
    return;
  }

  currentUser.balance -= currentTotal;
  for (let key in casinoBets) {
    casinoBets[key] *= 2;
    const chipContainer = document.getElementById(`chip-${key}`);
    if (chipContainer) {
      chipContainer.classList.add("active");
      chipContainer.innerHTML = `<span class="chip-token">${formatVND(casinoBets[key])}</span>`;
    }
  }

  updateCasinoUI();
  updateUI();
  showToast("Đã nhân đôi tất cả cửa cược (X2)!");
}

// Cập nhật giao diện Casino
function updateCasinoUI() {
  const totalStaked = Object.values(casinoBets).reduce((a, b) => a + b, 0);
  const stakedEl = document.getElementById("casino-total-staked");
  const walletEl = document.getElementById("casino-wallet-bal");

  if (stakedEl) stakedEl.innerText = formatVND(totalStaked);
  if (walletEl) walletEl.innerText = formatVND(currentUser.balance);
}

// Xử lý nút "BẮT ĐẦU VÁN BÀI"
function handleCasinoDealAction() {
  const totalStaked = Object.values(casinoBets).reduce((a, b) => a + b, 0);
  if (totalStaked === 0) {
    showToast("⚠️ Quý khách vui lòng chọn chip và nhấp vào cửa cược trước!", "error");
    return;
  }

  if (currentCasinoGame === 'baccarat') {
    runBaccaratGame();
  } else if (currentCasinoGame === 'roulette') {
    runRouletteGame();
  } else if (currentCasinoGame === 'dragontiger') {
    runDragonTigerGame();
  }
}

// ==================== LOGIC BACCARAT ROYALE ====================
function runBaccaratGame() {
  isCasinoDealing = true;
  const dealBtn = document.getElementById("btn-casino-deal");
  if (dealBtn) {
    dealBtn.disabled = true;
    dealBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ĐANG CHIA BÀI...';
  }

  const pCardsEl = document.getElementById("baccarat-player-cards");
  const bCardsEl = document.getElementById("baccarat-banker-cards");
  const pScoreEl = document.getElementById("baccarat-player-score");
  const bScoreEl = document.getElementById("baccarat-banker-score");
  const statusEl = document.getElementById("casino-status-text");

  // Rút 2 lá đầu cho mỗi bên
  const p1 = getRandomCard();
  const p2 = getRandomCard();
  const b1 = getRandomCard();
  const b2 = getRandomCard();

  let playerCards = [p1, p2];
  let bankerCards = [b1, b2];

  let pScore = (p1.value + p2.value) % 10;
  let bScore = (b1.value + b2.value) % 10;

  pCardsEl.innerHTML = "";
  bCardsEl.innerHTML = "";
  pScoreEl.innerText = `${pScore} Điểm`;
  bScoreEl.innerText = `${bScore} Điểm`;
  if (statusEl) statusEl.innerText = "Dealer Jessica Wang đang chia bài...";

  // Hiệu ứng lật 2 lá đầu
  setTimeout(() => {
    pCardsEl.innerHTML = createCardHTML(p1) + createCardHTML(p2);
    pScore = (p1.value + p2.value) % 10;
    pScoreEl.innerText = `${pScore} Điểm`;
  }, 400);

  setTimeout(() => {
    bCardsEl.innerHTML = createCardHTML(b1) + createCardHTML(b2);
    bScore = (b1.value + b2.value) % 10;
    bScoreEl.innerText = `${bScore} Điểm`;
  }, 900);

  // Luật rút lá thứ 3
  setTimeout(() => {
    const isNatural = (pScore >= 8 || bScore >= 8);
    let pDraws = false;
    let p3 = null;

    if (!isNatural) {
      if (pScore <= 5) {
        pDraws = true;
        p3 = getRandomCard();
        playerCards.push(p3);
        pScore = (pScore + p3.value) % 10;
        pCardsEl.innerHTML += createCardHTML(p3);
        pScoreEl.innerText = `${pScore} Điểm`;
      }

      // Banker rút tùy theo Player
      let bDraws = false;
      let b3 = null;
      if (!pDraws) {
        if (bScore <= 5) bDraws = true;
      } else {
        const p3Val = p3.value;
        if (bScore <= 2) bDraws = true;
        else if (bScore === 3 && p3Val !== 8) bDraws = true;
        else if (bScore === 4 && [2,3,4,5,6,7].includes(p3Val)) bDraws = true;
        else if (bScore === 5 && [4,5,6,7].includes(p3Val)) bDraws = true;
        else if (bScore === 6 && [6,7].includes(p3Val)) bDraws = true;
      }

      if (bDraws) {
        b3 = getRandomCard();
        bankerCards.push(b3);
        bScore = (bScore + b3.value) % 10;
        bCardsEl.innerHTML += createCardHTML(b3);
        bScoreEl.innerText = `${bScore} Điểm`;
      }
    }

    // Kết luận ván Baccarat
    setTimeout(() => {
      finishBaccaratRound(pScore, bScore, playerCards, bankerCards);
    }, 800);

  }, 1600);
}

function finishBaccaratRound(pScore, bScore, pCards, bCards) {
  let outcome = "TIE";
  if (pScore > bScore) outcome = "PLAYER";
  else if (bScore > pScore) outcome = "BANKER";

  const isPlayerPair = (pCards[0].rank === pCards[1].rank);
  const isBankerPair = (bCards[0].rank === bCards[1].rank);

  let totalReturn = 0;
  let winSummary = [];

  if (outcome === 'PLAYER' && casinoBets['PLAYER']) {
    const winAmt = casinoBets['PLAYER'] * 2;
    totalReturn += winAmt;
    winSummary.push(`PLAYER (+${formatVND(winAmt)})`);
  }
  if (outcome === 'BANKER' && casinoBets['BANKER']) {
    const winAmt = Math.round(casinoBets['BANKER'] * 1.95);
    totalReturn += winAmt;
    winSummary.push(`BANKER (+${formatVND(winAmt)})`);
  }
  if (outcome === 'TIE') {
    if (casinoBets['TIE']) {
      const winAmt = casinoBets['TIE'] * 9;
      totalReturn += winAmt;
      winSummary.push(`TIE 1:8 (+${formatVND(winAmt)})`);
    }
    // Hoàn trả cược Player và Banker khi Hòa
    if (casinoBets['PLAYER']) totalReturn += casinoBets['PLAYER'];
    if (casinoBets['BANKER']) totalReturn += casinoBets['BANKER'];
  }
  if (isPlayerPair && casinoBets['P_PAIR']) {
    const winAmt = casinoBets['P_PAIR'] * 12;
    totalReturn += winAmt;
    winSummary.push(`CON ĐÔI (+${formatVND(winAmt)})`);
  }
  if (isBankerPair && casinoBets['B_PAIR']) {
    const winAmt = casinoBets['B_PAIR'] * 12;
    totalReturn += winAmt;
    winSummary.push(`CÁI ĐÔI (+${formatVND(winAmt)})`);
  }

  // Cập nhật số dư & lịch sử
  currentUser.balance += totalReturn;

  const resultStr = `${outcome === 'PLAYER' ? 'CON THẮNG' : outcome === 'BANKER' ? 'CÁI THẮNG' : 'HÒA'} (${pScore} - ${bScore})`;
  const statusEl = document.getElementById("casino-status-text");

  const totalStaked = Object.values(casinoBets).reduce((a, b) => a + b, 0);
  if (totalReturn > 0) {
    currentUser.history.unshift({
      id: "BAC-" + Math.floor(1000 + Math.random() * 9000),
      type: "Game win",
      channel: `Baccarat (${resultStr})`,
      amount: totalReturn,
      balanceAfter: currentUser.balance,
      date: getFormattedTimestamp(),
      status: "Hoàn tất"
    });
    triggerBigWinCelebration(totalReturn, `BACCARAT: ${resultStr}!`, `Chúc mừng quý khách đã thắng: ${winSummary.join(', ')}!`);
    if (statusEl) statusEl.innerHTML = `🎉 <strong class="text-gold">KẾT QUẢ: ${resultStr}</strong>. Quý khách nhận được <strong>+${formatVND(totalReturn)}</strong>!`;
  } else {
    if (totalStaked > 0) {
      currentUser.history.unshift({
        id: "BAC-" + Math.floor(1000 + Math.random() * 9000),
        type: "Game loss",
        channel: `Baccarat (${resultStr})`,
        amount: -totalStaked,
        balanceAfter: currentUser.balance,
        date: getFormattedTimestamp(),
        status: "Hoàn tất"
      });
    }
    // Không thông báo thẳng tay khi mất tiền
    if (statusEl) statusEl.innerHTML = `Kết quả: <strong>${resultStr}</strong>. Chúc quý khách may mắn ván sau!`;
  }

  // Thêm vào Soi Cầu Baccarat
  addBaccaratRoadmap(outcome === 'PLAYER' ? 'P' : outcome === 'BANKER' ? 'B' : 'T');

  // Khôi phục nút bấm & chip
  resetCasinoRound();
}

function addBaccaratRoadmap(dotType) {
  baccaratRoadmap.push(dotType);
  if (baccaratRoadmap.length > 20) baccaratRoadmap.shift();
  renderBaccaratRoadmap();
}

function renderBaccaratRoadmap() {
  const container = document.getElementById("baccarat-roadmap-dots");
  if (!container) return;
  container.innerHTML = baccaratRoadmap.map(dot => {
    let cls = "dot-player";
    let txt = "P";
    if (dot === 'B') { cls = "dot-banker"; txt = "B"; }
    if (dot === 'T') { cls = "dot-tie"; txt = "T"; }
    return `<div class="roadmap-dot ${cls}">${txt}</div>`;
  }).join('');
}

// ==================== LOGIC ROULETTE CHÂU ÂU ====================
const ROULETTE_REDS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const ROULETTE_BLACKS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

function runRouletteGame() {
  isCasinoDealing = true;
  const dealBtn = document.getElementById("btn-casino-deal");
  if (dealBtn) {
    dealBtn.disabled = true;
    dealBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ĐANG QUAY VÒNG BÀI...';
  }

  const wheelInner = document.getElementById("roulette-wheel-wheel");
  const ballEl = document.getElementById("roulette-ball");
  const resultBadge = document.getElementById("roulette-result-badge");
  const statusEl = document.getElementById("casino-status-text");

  // Kết quả ngẫu nhiên 0 đến 36
  const winningNum = Math.floor(Math.random() * 37);
  let color = "green";
  if (ROULETTE_REDS.includes(winningNum)) color = "red";
  else if (ROULETTE_BLACKS.includes(winningNum)) color = "black";

  // Hiệu ứng quay bánh xe & lăn bóng
  const randomRot = 360 * 5 + Math.floor(Math.random() * 360);
  if (wheelInner) {
    wheelInner.style.transform = `rotate(${randomRot}deg)`;
  }
  if (ballEl) {
    ballEl.style.transform = `translateX(-50%) rotate(-${randomRot * 1.5}deg) translateY(${35 + Math.random() * 15}px)`;
  }

  if (statusEl) statusEl.innerText = "Bóng đang lăn quanh trục bánh xe Roulette...";

  setTimeout(() => {
    // Kết thúc vòng quay
    if (resultBadge) {
      const colorLabel = color === 'red' ? 'ĐỎ' : color === 'black' ? 'ĐEN' : 'XANH LÁ';
      resultBadge.innerHTML = `
        <span class="num text-${color === 'red' ? 'danger' : color === 'black' ? 'white' : 'emerald'}">${winningNum}</span>
        <span class="meta">${colorLabel} • ${winningNum % 2 === 0 ? 'CHẴN' : 'LẺ'}</span>
      `;
    }

    // Tính tiền thắng
    let totalReturn = 0;
    let winSummary = [];

    // Cược 0
    if (winningNum === 0 && casinoBets['ROU_0']) {
      const winAmt = casinoBets['ROU_0'] * 36;
      totalReturn += winAmt;
      winSummary.push(`SỐ 0 (+${formatVND(winAmt)})`);
    }
    // Cược Đỏ
    if (color === 'red' && casinoBets['ROU_RED']) {
      const winAmt = casinoBets['ROU_RED'] * 2;
      totalReturn += winAmt;
      winSummary.push(`ĐỎ (+${formatVND(winAmt)})`);
    }
    // Cược Đen
    if (color === 'black' && casinoBets['ROU_BLACK']) {
      const winAmt = casinoBets['ROU_BLACK'] * 2;
      totalReturn += winAmt;
      winSummary.push(`ĐEN (+${formatVND(winAmt)})`);
    }
    // Cược Chẵn / Lẻ
    if (winningNum > 0) {
      if (winningNum % 2 === 0 && casinoBets['ROU_EVEN']) {
        const winAmt = casinoBets['ROU_EVEN'] * 2;
        totalReturn += winAmt;
        winSummary.push(`CHẴN (+${formatVND(winAmt)})`);
      } else if (winningNum % 2 !== 0 && casinoBets['ROU_ODD']) {
        const winAmt = casinoBets['ROU_ODD'] * 2;
        totalReturn += winAmt;
        winSummary.push(`LẺ (+${formatVND(winAmt)})`);
      }
      // 1-18 và 19-36
      if (winningNum <= 18 && casinoBets['ROU_1_18']) {
        const winAmt = casinoBets['ROU_1_18'] * 2;
        totalReturn += winAmt;
        winSummary.push(`1-18 (+${formatVND(winAmt)})`);
      } else if (winningNum >= 19 && casinoBets['ROU_19_36']) {
        const winAmt = casinoBets['ROU_19_36'] * 2;
        totalReturn += winAmt;
        winSummary.push(`19-36 (+${formatVND(winAmt)})`);
      }
    }

    currentUser.balance += totalReturn;

    if (totalReturn > 0) {
      triggerBigWinCelebration(totalReturn, `ROULETTE NỔ SỐ ${winningNum}!`, `Chúc mừng quý khách đã thắng: ${winSummary.join(', ')}!`);
      if (statusEl) statusEl.innerHTML = `🎉 <strong class="text-gold">ROULETTE RA SỐ ${winningNum}</strong>. Quý khách nhận được <strong>+${formatVND(totalReturn)}</strong>!`;
    } else {
      if (statusEl) statusEl.innerHTML = `Roulette dừng ở số: <strong>${winningNum} (${color.toUpperCase()})</strong>. Chúc quý khách may mắn ván sau!`;
    }

    // Thêm vào lịch sử
    rouletteHistory.unshift(winningNum);
    if (rouletteHistory.length > 8) rouletteHistory.pop();
    renderRouletteHistory();

    resetCasinoRound();
  }, 3600);
}

function renderRouletteHistory() {
  const pillsEl = document.getElementById("roulette-history-pills");
  if (!pillsEl) return;
  pillsEl.innerHTML = rouletteHistory.map(num => {
    let col = "green";
    if (ROULETTE_REDS.includes(num)) col = "red";
    else if (ROULETTE_BLACKS.includes(num)) col = "black";
    return `<div class="roulette-pill ${col}">${num}</div>`;
  }).join('');
}

// ==================== LOGIC RỒNG HỔ (DRAGON TIGER) ====================
function runDragonTigerGame() {
  isCasinoDealing = true;
  const dealBtn = document.getElementById("btn-casino-deal");
  if (dealBtn) {
    dealBtn.disabled = true;
    dealBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ĐANG QUYẾT ĐẤU...';
  }

  const dCardEl = document.getElementById("dt-dragon-card");
  const tCardEl = document.getElementById("dt-tiger-card");
  const dScoreEl = document.getElementById("dt-dragon-score");
  const tScoreEl = document.getElementById("dt-tiger-score");
  const statusEl = document.getElementById("casino-status-text");

  const dCard = getRandomCard();
  const tCard = getRandomCard();

  dCardEl.innerHTML = "";
  tCardEl.innerHTML = "";
  dScoreEl.innerText = "Đang lật...";
  tScoreEl.innerText = "Đang lật...";
  if (statusEl) statusEl.innerText = "Rồng Hổ tranh hùng! Dealer đang lật bài...";

  setTimeout(() => {
    dCardEl.innerHTML = createCardHTML(dCard);
    dScoreEl.innerText = `Điểm: ${dCard.rank}`;
  }, 500);

  setTimeout(() => {
    tCardEl.innerHTML = createCardHTML(tCard);
    tScoreEl.innerText = `Điểm: ${tCard.rank}`;

    // So sánh
    let outcome = "DT_TIE";
    if (dCard.rankNum > tCard.rankNum) outcome = "DT_DRAGON";
    else if (tCard.rankNum > dCard.rankNum) outcome = "DT_TIGER";

    let totalReturn = 0;
    let winSummary = [];

    if (outcome === 'DT_DRAGON' && casinoBets['DT_DRAGON']) {
      const winAmt = casinoBets['DT_DRAGON'] * 2;
      totalReturn += winAmt;
      winSummary.push(`RỒNG (+${formatVND(winAmt)})`);
    }
    if (outcome === 'DT_TIGER' && casinoBets['DT_TIGER']) {
      const winAmt = casinoBets['DT_TIGER'] * 2;
      totalReturn += winAmt;
      winSummary.push(`HỔ (+${formatVND(winAmt)})`);
    }
    if (outcome === 'DT_TIE') {
      if (casinoBets['DT_TIE']) {
        const winAmt = casinoBets['DT_TIE'] * 9;
        totalReturn += winAmt;
        winSummary.push(`HÒA (+${formatVND(winAmt)})`);
      }
      // Trả lại 50% cược Rồng và Hổ khi Hòa
      if (casinoBets['DT_DRAGON']) totalReturn += Math.round(casinoBets['DT_DRAGON'] * 0.5);
      if (casinoBets['DT_TIGER']) totalReturn += Math.round(casinoBets['DT_TIGER'] * 0.5);
    }

    currentUser.balance += totalReturn;
    const resText = outcome === 'DT_DRAGON' ? 'RỒNG THẮNG' : outcome === 'DT_TIGER' ? 'HỔ THẮNG' : 'HÒA PHÂN TRANH';

    if (totalReturn > 0) {
      triggerBigWinCelebration(totalReturn, `RỒNG HỔ: ${resText}!`, `Chúc mừng quý khách đã thắng: ${winSummary.join(', ')}!`);
      if (statusEl) statusEl.innerHTML = `🎉 <strong class="text-gold">RỒNG HỔ: ${resText}</strong>. Quý khách nhận được <strong>+${formatVND(totalReturn)}</strong>!`;
    } else {
      if (statusEl) statusEl.innerHTML = `Kết quả: <strong>${resText}</strong> (Rồng: ${dCard.rank} vs Hổ: ${tCard.rank}).`;
    }

    resetCasinoRound();
  }, 1200);
}

// Dọn dẹp ván cược sau khi có kết quả
function resetCasinoRound() {
  setTimeout(() => {
    isCasinoDealing = false;
    casinoBets = {};

    document.querySelectorAll(".gate-chip-placed").forEach(c => {
      c.classList.remove("active");
      c.innerHTML = "";
    });

    const dealBtn = document.getElementById("btn-casino-deal");
    if (dealBtn) {
      dealBtn.disabled = false;
      dealBtn.innerHTML = '<i class="fa-solid fa-play"></i> BẮT ĐẦU VÁN BÀI';
    }

    updateCasinoUI();
    updateUI();
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  startClock();
  startJackpotTicker();
  startTaixiuAutoLoop();
  initLodeNumberBoard();
  renderTxHistoryTable();
  renderBaccaratRoadmap();
  renderRouletteHistory();
  updateCasinoUI();
});

// ==================== HỆ THỐNG ĐIỀU HƯỚNG ĐA SẢNH (MULTI-PAGE SYSTEM) ====================
let currentPageKey = 'home';

function navigateToPage(pageKey, scrollToGuide = false) {
  currentPageKey = pageKey;

  // 1. Chuyển đổi hiển thị view
  document.querySelectorAll(".page-view").forEach(v => v.classList.remove("active"));
  const targetView = document.getElementById(`view-${pageKey}`);
  if (targetView) {
    targetView.classList.add("active");
  }

  // 2. Cập nhật active trên thanh Navigation
  document.querySelectorAll(".royal-nav .nav-item").forEach(item => item.classList.remove("active"));
  const activeNav = document.getElementById(`nav-btn-${pageKey}`);
  if (activeNav) {
    activeNav.classList.add("active");
  }

  // 2b. Cập nhật active trên thanh Navigation Mobile
  document.querySelectorAll(".mobile-nav-btn").forEach(item => item.classList.remove("active"));
  const activeMobNav = document.getElementById(`mob-nav-${pageKey}`);
  if (activeMobNav) {
    activeMobNav.classList.add("active");
  }
  closeDrawer();

  // 3. Cập nhật URL hash
  if (window.location.hash !== `#${pageKey}`) {
    history.pushState(null, '', `#${pageKey}`);
  }

  // 4. Đồng bộ ví và giao diện
  updateUI();
  updateCasinoUI();

  // 5. Cuộn trang
  if (scrollToGuide) {
    setTimeout(() => {
      const guideEl = document.getElementById(`${pageKey}-guide`);
      if (guideEl) {
        guideEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pageNames = {
    'home': 'Sảnh Chính Bet367',
    'taixiu': 'Tài Xỉu MD5 Bát Úp',
    'lode': 'Lô Đề 1 Ăn 99.5',
    'casino': 'Live Casino Thượng Lưu 4K',
    'sports': 'Kèo Bóng Đá & Thể Thao Live',
    'slots': 'Nổ Hũ Thần Tài 777'
  };
  showToast(`Đang ở: ${pageNames[pageKey] || 'Trang Trò Chơi'}`);
}

// Lắng nghe thay đổi hash trên trình duyệt
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (['home', 'taixiu', 'lode', 'casino', 'sports', 'slots'].includes(hash)) {
    navigateToPage(hash);
  }
});

// ==================== LOGIC KÈO THỂ THAO & BÓNG ĐÁ ====================
let currentSelectedOdd = null;

function selectSportsOdd(oddName, rate, btnElement) {
  document.querySelectorAll(".odd-btn").forEach(b => b.classList.remove("active"));
  btnElement.classList.add("active");

  currentSelectedOdd = { name: oddName, rate: rate };

  const nameEl = document.getElementById("selected-sports-odd-name");
  const rateEl = document.getElementById("selected-sports-odd-rate");
  const stakeInput = document.getElementById("sports-bet-stake");
  const stake = parseInt(stakeInput?.value) || 200000;
  const potentialWin = Math.round(stake * rate);

  if (nameEl) nameEl.innerText = `Đã chọn: ${oddName}`;
  if (rateEl) rateEl.innerHTML = `Tỷ lệ Odd: <strong class="text-gold">${rate}</strong> • Thắng ước tính: <strong class="text-emerald">${formatVND(potentialWin)}</strong>`;

  showToast(`Đã chọn: ${oddName} (Odd: ${rate})`);
}

function confirmSportsBet() {
  if (!currentSelectedOdd) {
    showToast("Vui lòng nhấp chọn một tỷ lệ kèo bóng đá ở trên trước!", "error");
    return;
  }

  const stakeInput = document.getElementById("sports-bet-stake");
  const stake = parseInt(stakeInput.value) || 200000;

  if (currentUser.balance < stake) {
    showToast("Số dư không đủ đặt cược kèo này!", "error");
    openModal("deposit-modal");
    return;
  }

  // Khấu trừ tiền cược
  currentUser.balance -= stake;
  const potentialWin = Math.round(stake * currentSelectedOdd.rate);

  currentUser.history.unshift({
    id: "SB" + Math.floor(1000 + Math.random() * 9000),
    type: "Cược Bóng Đá",
    channel: `${currentSelectedOdd.name} @ ${currentSelectedOdd.rate}`,
    amount: -stake,
    date: new Date().toLocaleTimeString('vi-VN'),
    status: "Đang đá trực tiếp"
  });

  updateUI();
  showToast(`Đặt cược thành công ${formatVND(stake)} vào ${currentSelectedOdd.name}. Trận đấu đang phát trực tiếp!`);

  // Mô phỏng kết quả sau 4 giây
  setTimeout(() => {
    const isWin = Math.random() > 0.45; // Tỷ lệ thắng 55%
    if (isWin) {
      currentUser.balance += potentialWin;
      currentUser.history[0].status = "Thắng Kèo";
      currentUser.history.unshift({
        id: "WIN-" + Math.floor(1000 + Math.random() * 9000),
        type: "Thắng Cược Bóng Đá",
        channel: `${currentSelectedOdd.name} (Thắng Trọn Kèo)`,
        amount: potentialWin,
        date: new Date().toLocaleTimeString('vi-VN'),
        status: "Thành công"
      });
      updateUI();
      triggerBigWinCelebration(potentialWin, `THẮNG KÈO BÓNG ĐÁ: ${currentSelectedOdd.name}!`, `Trận đấu kết thúc với chiến thắng rực rỡ!`);
    } else {
      currentUser.history[0].status = "Thua Kèo";
      const nameEl = document.getElementById("selected-sports-odd-name");
      if (nameEl) nameEl.innerHTML = `Kết quả trận đấu: Kèo <strong class="text-silver">${currentSelectedOdd.name}</strong> không thắng. Chúc may mắn trận sau!`;
    }
    updateUI();
  }, 4000);
}

document.getElementById("sports-bet-stake")?.addEventListener("input", (e) => {
  if (currentSelectedOdd) {
    const stake = parseInt(e.target.value) || 0;
    const potentialWin = Math.round(stake * currentSelectedOdd.rate);
    const rateEl = document.getElementById("selected-sports-odd-rate");
    if (rateEl) {
      rateEl.innerHTML = `Tỷ lệ Odd: <strong class="text-gold">${currentSelectedOdd.rate}</strong> • Thắng ước tính: <strong class="text-emerald">${formatVND(potentialWin)}</strong>`;
    }
  }
});

// ==================== LOGIC NỔ HŨ THẦN TÀI (SLOTS) ====================
let isSlotSpinning = false;
const SLOT_SYMBOLS = ["👑", "💎", "7️⃣", "🪙", "🔔", "⭐"];

function spinSlotMachine() {
  if (isSlotSpinning) return;

  const betSelect = document.getElementById("slot-bet-level");
  const betVal = parseInt(betSelect.value) || 50000;

  if (currentUser.balance < betVal) {
    showToast("Số dư không đủ để quay hũ!", "error");
    openModal("deposit-modal");
    return;
  }

  currentUser.balance -= betVal;
  updateUI();

  isSlotSpinning = true;
  const btnSpin = document.getElementById("btn-spin-slot");
  const resultText = document.getElementById("slot-result-text");
  if (btnSpin) {
    btnSpin.disabled = true;
    btnSpin.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ĐANG QUAY...';
  }
  if (resultText) resultText.innerText = "Cuộn quay đang xoay tít...";

  const reelBoxes = [
    document.getElementById("reel-1"),
    document.getElementById("reel-2"),
    document.getElementById("reel-3"),
    document.getElementById("reel-4"),
    document.getElementById("reel-5")
  ];

  reelBoxes.forEach(r => r?.classList.add("spinning"));

  // Tạo kết quả 5 cuộn
  const finalSymbols = [
    SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
    SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
    SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
    SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
    SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]
  ];

  // Cơ hội nổ hũ nếu may mắn
  if (Math.random() < 0.15) {
    // 3 hoặc 4 biểu tượng giống nhau
    const luckySym = SLOT_SYMBOLS[Math.floor(Math.random() * 3)];
    finalSymbols[0] = luckySym;
    finalSymbols[1] = luckySym;
    finalSymbols[2] = luckySym;
    if (Math.random() < 0.3) finalSymbols[3] = luckySym;
  }

  // Dừng tuần tự từng cuộn
  reelBoxes.forEach((reel, idx) => {
    setTimeout(() => {
      if (reel) {
        reel.classList.remove("spinning");
        reel.innerText = finalSymbols[idx];
      }
    }, 600 + idx * 250);
  });

  // Tính kết quả sau khi cuộn thứ 5 dừng
  setTimeout(() => {
    isSlotSpinning = false;
    if (btnSpin) {
      btnSpin.disabled = false;
      btnSpin.innerHTML = '<i class="fa-solid fa-rotate text-black"></i> QUAY HŨ';
    }

    // Đếm số lượng biểu tượng
    const counts = {};
    finalSymbols.forEach(s => counts[s] = (counts[s] || 0) + 1);
    let maxMatch = 0;
    let matchSym = "";
    for (let s in counts) {
      if (counts[s] > maxMatch) {
        maxMatch = counts[s];
        matchSym = s;
      }
    }

    if (maxMatch === 5 && matchSym === "👑") {
      // NỔ JACKPOT TRĂM TỶ
      const jackpotWin = 18895423000; // 18 tỷ
      currentUser.balance += jackpotWin;
      triggerBigWinCelebration(jackpotWin, "🎉 NỔ HŨ JACKPOT HOÀNG GIA ĐẠI PHÁT! 🎉", "CHÚC MỪNG QUÝ KHÁCH ĐÃ TRÚNG TRỌN QUỸ HŨ TRĂM TỶ!");
      if (resultText) resultText.innerHTML = `👑 <strong class="text-gold">NỔ JACKPOT ĐẠI PHÁT!</strong> Quý khách nhận được +${formatVND(jackpotWin)}!`;
    } else if (maxMatch >= 4) {
      const winAmt = betVal * (matchSym === "👑" ? 150 : (matchSym === "💎" ? 80 : 40));
      currentUser.balance += winAmt;
      triggerBigWinCelebration(winAmt, `THẮNG LỚN SLOTS: 4x ${matchSym}!`, `Chúc mừng quý khách đã trúng 4 biểu tượng may mắn!`);
      if (resultText) resultText.innerHTML = `✨ <strong class="text-gold">THẮNG LỚN ${maxMatch}x ${matchSym}</strong>: +${formatVND(winAmt)}!`;
    } else if (maxMatch === 3) {
      const winAmt = betVal * (matchSym === "👑" ? 12 : (matchSym === "💎" ? 8 : 4));
      currentUser.balance += winAmt;
      triggerBigWinCelebration(winAmt, `THẮNG CƯỢC SLOTS: 3x ${matchSym}!`, `Tiền thưởng đã cộng vào ví Bet367 của quý khách!`);
      if (resultText) resultText.innerHTML = `⭐ <strong class="text-gold">Trúng 3x ${matchSym}</strong>: Nhận +${formatVND(winAmt)}!`;
    } else {
      if (resultText) resultText.innerText = "Chúc quý khách may mắn ở lượt quay hũ tiếp theo!";
    }

    updateUI();
  }, 1900);
}

// Khởi chạy khi tải trang
const origDomInit = window.onload;
window.addEventListener('DOMContentLoaded', () => {
  const initialHash = window.location.hash.replace('#', '');
  if (['home', 'taixiu', 'lode', 'casino', 'sports', 'slots'].includes(initialHash)) {
    navigateToPage(initialHash);
  } else {
    navigateToPage('home');
  }
});
