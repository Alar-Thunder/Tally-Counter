document.addEventListener('DOMContentLoaded', function() {
    
    const tallyCount = document.getElementById('tally-count');
    const maxDisplay = document.getElementById('max-display');
    const availableLabel = document.getElementById('available-label');
    const incBtn = document.getElementById('increment');
    const decBtn = document.getElementById('decrement');
    const resetBtn = document.querySelector('.reset-btn');
    
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');

    const fontSelect = document.getElementById('font-select');
    const bgColorInput = document.getElementById('bg-color');
    const maxCountInput = document.getElementById('max-count-input');
    const limitToggle = document.getElementById('limit-toggle');

    let state = {
        count: 0,
        maxCount: 10,
        bgColor: '#000000',
        font: 'sans-serif',
        limitEnabled: true 
    };

    function updateUI() {
        tallyCount.textContent = state.count;
        
        const remaining = state.maxCount - state.count;
        
        if (remaining < 0) {
           
            maxDisplay.textContent = remaining; 
            availableLabel.textContent = "OVER LIMIT";
            maxDisplay.style.color = "#ff4444"; 
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


    incBtn.addEventListener('click', () => {
       
        if (state.limitEnabled && state.count >= state.maxCount) {
            return; 
        }
        state.count++; 
        updateUI();
        saveState();
    });

    decBtn.addEventListener('click', () => {
        
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


    function openSidebar() {
        sidebar.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('hidden');
    }

    sidebarToggle.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);

    window.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
            closeSidebar();
        }
    });

    loadState();
});
