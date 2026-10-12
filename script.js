/**
 * Thippeswamy K S — Portfolio Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Init Intersection Observer for Scroll Reveals
  initScrollReveal();

  // Init Mobile Nav
  initMobileMenu();

  // Set default active filter
  filterProjects('all');
});

// ==========================================
// 1. SCROLL REVEAL OBSERVER
// ==========================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ==========================================
// 2. MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close when clicking nav links
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ==========================================
// 3. PROJECT CATEGORY FILTERING
// ==========================================
function filterProjects(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || (cardCat && cardCat.includes(category))) {
      card.style.display = 'flex';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 30);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px) scale(0.97)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 250);
    }
  });
}

// ==========================================
// 4. PROJECT DETAILS MODAL
// ==========================================
const projectDatabase = {
  fraud: {
    title: "Credit Card Fraud Detection using Hidden Markov Model",
    badge: "Java • Data Mining • HMM • Security",
    tech: ["Java", "Hidden Markov Model (HMM)", "Data Mining", "Probability Modeling", "Pattern Recognition", "MySQL"],
    summary: "An intelligent automated fraud prevention and transaction anomaly detection system developed in Java. Uses Hidden Markov Models to continuously learn cardholder transaction behavioral states and accurately flag illicit credit card transactions in real time.",
    architecture: [
      "Stochastic sequence modeling using Hidden Markov Models to analyze sequential spending patterns and cardholder behavioral transitions.",
      "Profile-based behavioral classification calculating transition probabilities across purchase amount ranges, merchant categories, and frequency intervals.",
      "Real-time scoring engine that computes observation likelihoods for incoming credit card transactions to detect anomalous deviations.",
      "High accuracy classification pipeline designed to minimize false positive declines while preempting fraudulent financial charges."
    ],
    github: "https://github.com/thippeswamyks"
  },
  alarm: {
    title: "Smart Alarm System",
    badge: "AWS SNS • Java • Cloud Computing • IoT",
    tech: ["AWS SNS", "Java", "Cloud Computing", "RESTful APIs", "Event-Driven Architecture", "Amazon CloudWatch"],
    summary: "A robust, cloud-integrated smart alarm notification system engineered with Java and Amazon Simple Notification Service (SNS) that delivers immediate multi-channel critical alert broadcasts upon threshold breaches or security triggers.",
    architecture: [
      "Cloud-native notification architecture integrated with Amazon Simple Notification Service (SNS) topics and subscriber protocols.",
      "Java-based event listener evaluating telemetry data feeds and event streams to detect threshold anomalies and alarm triggers.",
      "Real-time broadcast distribution dispatching synchronized SMS, email, and mobile push notifications with sub-second latency.",
      "Fault-tolerant failover routing guaranteeing reliable message delivery even during elevated network concurrency or peak outage periods."
    ],
    github: "https://github.com/thippeswamyks"
  },
  chatbot: {
    title: "Hotel Assistant Chatbot",
    badge: "Python • Flask • HTML/CSS • JavaScript • NLP",
    tech: ["Python", "Flask", "JavaScript", "HTML5", "CSS3", "NLP Intent Parsing", "REST APIs"],
    summary: "An interactive, full-stack intelligent conversational hotel assistant chatbot built with Python and Flask. Assists potential guests with automated room booking inquiries, availability verifications, hotel amenity FAQs, and concierge recommendations in real time.",
    architecture: [
      "Lightweight Flask REST backend designed for intent recognition, entity extraction, and conversational context preservation.",
      "Interactive modern client interface featuring conversational UI/UX, instant reply suggestions, and animated typing indicators.",
      "Dynamic room reservation flow verifying room dates, guest occupancy limits, room types, and pricing dynamically.",
      "Integrated knowledge base engine instantly answering frequent queries regarding check-in timings, dining options, and local attractions."
    ],
    github: "https://github.com/thippeswamyks"
  }
};

function openProjectModal(key) {
  const item = projectDatabase[key];
  if (!item) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');

  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-3 border-b border-white/10">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium badge-tech">
          ${item.badge}
        </span>
        <button onclick="closeProjectModal()" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div>
        <h3 class="text-2xl font-bold text-white mb-2">${item.title}</h3>
        <p class="text-slate-300 text-sm leading-relaxed">${item.summary}</p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold">Key Architectural Highlights</h4>
        <div class="space-y-2.5">
          ${item.architecture.map(point => `
            <div class="flex items-start gap-3 text-xs sm:text-sm text-slate-300 bg-white/[0.02] p-3 rounded-lg border border-white/5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-[#00f0ff] flex-shrink-0 mt-0.5"></i>
              <span>${point}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">Technologies Utilized</h4>
        <div class="flex flex-wrap gap-2">
          ${item.tech.map(t => `
            <span class="px-2.5 py-1 rounded-md text-xs font-mono bg-[#080d1a] border border-[#00f0ff]/20 text-[#00f0ff]">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
        <button onclick="closeProjectModal()" class="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          Close
        </button>
        <a href="${item.github}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0284c7] text-[#080d1a] font-bold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
          <i data-lucide="github" class="w-4 h-4"></i> View Repository
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

document.getElementById('project-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') {
    closeProjectModal();
  }
});

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// ==========================================
// 5. COPY TO CLIPBOARD & TOAST NOTIFICATION
// ==========================================
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Could not copy: ${text}`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 2800);
}

// ==========================================
// 6. CONTACT FORM SUBMISSION
// ==========================================
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('sender-name')?.value || '';
  const email = document.getElementById('sender-email')?.value || '';
  const subject = document.getElementById('sender-subject')?.value || 'Software Engineer / Full Stack Role';
  const message = document.getElementById('sender-message')?.value || '';

  const mailtoUrl = `mailto:thippeswamyks.cse.2027@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Thippeswamy,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  
  window.open(mailtoUrl, '_blank');
  showToast("Opening email client to send message!");
  event.target.reset();
}
