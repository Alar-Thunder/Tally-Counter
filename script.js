document.addEventListener('DOMContentLoaded', function() {
    
    // Core Elements
    const tallyCount = document.getElementById('tally-count');
    const maxDisplay = document.getElementById('max-display');
    const availableLabel = document.getElementById('available-label');
    const incBtn = document.getElementById('increment');
    const decBtn = document.getElementById('decrement');
    const resetBtn = document.querySelector('.reset-btn');
    
    // Sidebar Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');

    // Settings Elements
    const fontSelect = document.getElementById('font-select');
    const bgColorInput = document.getElementById('bg-color');
    const maxCountInput = document.getElementById('max-count-input');
    const limitToggle = document.getElementById('limit-toggle');

    let state = {
        count: 0,
        maxCount: 10,
        bgColor: '#000000',
        font: 'sans-serif',
        limitEnabled: true // New state property
    };

    function updateUI() {
        tallyCount.textContent = state.count;
        
        const remaining = state.maxCount - state.count;
        
        if (remaining < 0) {
            // Show -1, -2, etc. if over the limit
            maxDisplay.textContent = remaining; 
            availableLabel.textContent = "OVER LIMIT";
            maxDisplay.style.color = "#ff4444"; // Visual cue for exceeding
        } else {
            maxDisplay.textContent = remaining;
            availableLabel.textContent = "AVAILABLE";
            maxDisplay.style.color = "white";
        }

        document.body.style.backgroundColor = state.bgColor;
        document.body.style.fontFamily = state.font;

        tallyCount.classList.add('pop');
        setTimeout(() => tallyCount.classList.remove('pop'), 100);
    }

    function saveState() {
        localStorage.setItem('tallyAppState', JSON.stringify(state));
    }

    function loadState() {
        const saved = localStorage.getItem('tallyAppState');
        if (saved) {
            state = JSON.parse(saved);

            bgColorInput.value = state.bgColor;
            fontSelect.value = state.font;
            maxCountInput.value = state.maxCount;
            limitToggle.checked = state.limitEnabled;
        }
        updateUI();
    }

    // --- Counter Logic ---

    incBtn.addEventListener('click', () => {
        // If limit is ON, don't allow incrementing past max
        if (state.limitEnabled && state.count >= state.maxCount) {
            return; 
        }
        state.count++; 
        updateUI();
        saveState();
    });

    decBtn.addEventListener('click', () => {
        // Allow decrementing as long as it's not 0 
        // (Or allow negative counts if you prefer, but standard is 0)
        if (state.count > 0) {
            state.count--;
            updateUI();
            saveState();
        }
    });

    resetBtn.addEventListener('click', () => {
        state.count = 0;
        updateUI();
        saveState();
    });

    // --- Settings Listeners ---

    limitToggle.addEventListener('change', (e) => {
        state.limitEnabled = e.target.checked;
        saveState();
    });

    bgColorInput.addEventListener('input', (e) => {
        state.bgColor = e.target.value;
        updateUI();
        saveState();
    });

    fontSelect.addEventListener('change', (e) => {
        state.font = e.target.value;
        updateUI();
        saveState();
    });

    maxCountInput.addEventListener('input', (e) => {
        state.maxCount = parseInt(e.target.value) || 0;
        updateUI();
        saveState();
    });

    // --- Sidebar Logic ---

    function openSidebar() {
        sidebar.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('hidden');
    }

    sidebarToggle.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);

    // Close sidebar when clicking outside of it
    window.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
            closeSidebar();
        }
    });

    loadState();
});