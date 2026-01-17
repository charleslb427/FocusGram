// Icare Lite - iOS Injected Script
let config = {
    reels: false,
    explore: false,
    ads: false
};

// Load config from localStorage
try {
    const saved = JSON.parse(localStorage.getItem('icare_config'));
    if (saved) config = {...config, ...saved};
} catch(e) {}

// Context functions
function isInMessages() {
    return location.pathname.startsWith('/direct');
}

function isInReelsPage() {
    return location.pathname.startsWith('/reels');
}

// Redirect if Reels blocked
function redirectIfReelsBlocked() {
    if (!config.reels && isInReelsPage()) {
        location.replace('https://www.instagram.com');
    }
}

// CSS Filters
const style = document.createElement('style');
style.id = 'icare-style';
document.documentElement.appendChild(style);

function updateCSS() {
    redirectIfReelsBlocked();
    
    if (isInMessages()) {
        style.textContent = '';
        return;
    }
    
    let css = '';
    if (!config.reels) {
        css += 'a[href*="/reels/"] { display: none !important; }';
    }
    if (!config.explore) {
        css += 'a[href="/explore/"] { display: none !important; }';
    }
    if (!config.ads) {
        css += 'article:has(span:contains("Sponsorisé")), article:has(span:contains("Sponsored")) { display: none !important; }';
    }
    
    style.textContent = css;
}

// UI Panel
function createPanel() {
    if (document.getElementById('icare-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'icare-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        background: 'rgba(0,0,0,0.35)',
        zIndex: '9999',
        display: 'none',
        backdropFilter: 'blur(2px)'
    });
    
    overlay.innerHTML = `
        <div id="icare-panel" style="background:#fff;max-width:360px;margin:80px auto;padding:20px;border-radius:18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.25);transform:translateY(20px) scale(.96);opacity:0;transition:transform .18s ease, opacity .18s ease;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <strong style="font-size:18px;">Icare Lite</strong>
                <span id="icare-close" style="font-size:22px;cursor:pointer;">×</span>
            </div>
            ${optionRow('Reels', 'icare-reels')}
            ${optionRow('Explorer', 'icare-explore')}
            ${optionRow('Publicités', 'icare-ads')}
            <div style="margin-top:16px;font-size:12px;color:#777;">
                Application indépendante, non affiliée à Meta.
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => { if (e.target === overlay) hidePanel(); };
    overlay.querySelector('#icare-close').onclick = hidePanel;
    overlay.querySelector('#icare-reels').onchange = (e) => save('reels', e.target.checked);
    overlay.querySelector('#icare-explore').onchange = (e) => save('explore', e.target.checked);
    overlay.querySelector('#icare-ads').onchange = (e) => save('ads', e.target.checked);
}

function optionRow(label, id) {
    return `
        <div class="icare-row" style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #eee;">
            <div>
                <div class="icare-label" style="font-size:15px;">${label}</div>
                <div class="icare-state" id="${id}-state" style="font-size:12px;color:#777;"></div>
            </div>
            <label class="icare-switch" style="position:relative;width:42px;height:24px;display:inline-block;">
                <input type="checkbox" id="${id}" style="display:none;">
                <span class="icare-slider" style="position:absolute;inset:0;background:#ccc;border-radius:24px;transition:.2s;"></span>
            </label>
        </div>
    `;
}

function showPanel() {
    const overlay = document.getElementById('icare-overlay');
    const panel = document.getElementById('icare-panel');
    if (!overlay || !panel) return;
    overlay.style.display = 'block';
    requestAnimationFrame(() => {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0) scale(1)';
    });
}

function hidePanel() {
    const overlay = document.getElementById('icare-overlay');
    const panel = document.getElementById('icare-panel');
    if (!overlay || !panel) return;
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(20px) scale(.96)';
    setTimeout(() => { overlay.style.display = 'none'; }, 180);
}

function syncPanel() {
    syncOption('icare-reels', config.reels);
    syncOption('icare-explore', config.explore);
    syncOption('icare-ads', config.ads);
}

function syncOption(id, enabled) {
    const input = document.getElementById(id);
    const state = document.getElementById(`${id}-state`);
    if (!input || !state) return;
    
    input.checked = enabled;
    state.textContent = enabled ? 'Visible' : 'Masqué';
}

function save(key, value) {
    config[key] = value;
    localStorage.setItem('icare_config', JSON.stringify(config));
    updateCSS();
    syncPanel();
}

// Float Button
function createButton() {
    if (document.getElementById('icare-button')) return;
    
    const btn = document.createElement('div');
    btn.id = 'icare-button';
    btn.textContent = '⚙️';
    Object.assign(btn.style, {
        position: 'fixed',
        right: '16px',
        bottom: '96px',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,.95)',
        boxShadow: '0 4px 14px rgba(0,0,0,.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        cursor: 'pointer',
        zIndex: '9998'
    });
    
    btn.onclick = showPanel;
    document.body.appendChild(btn);
}

// Start
function start() {
    if (!document.body) {
        requestAnimationFrame(start);
        return;
    }
    
    createPanel();
    createButton();
    updateCSS();
    syncPanel();
    
    new MutationObserver(() => {
        createPanel();
        createButton();
        updateCSS();
    }).observe(document.body, { childList: true, subtree: true });
}

start();
