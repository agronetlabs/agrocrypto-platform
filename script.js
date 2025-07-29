// DOM Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const connectBtn = document.getElementById('connectBtn');
const demoBtn = document.getElementById('demoBtn');
const statusIndicator = document.querySelector('.status-indicator');
const statusText = document.querySelector('.status-text');
const walletStatus = document.querySelector('.wallet-status');
const portfolioContent = document.querySelector('.portfolio-content');
const transactionsContent = document.querySelector('.transactions-content');

// Wallet connection state
let isConnected = false;

// Sample transaction data for demo
const sampleTransactions = [
    {
        type: 'Stake',
        amount: '0.5 ETH',
        time: '2 hours ago',
        status: 'Completed'
    },
    {
        type: 'Carbon Credit Purchase',
        amount: '10 Credits',
        time: '1 day ago',
        status: 'Completed'
    },
    {
        type: 'Farming Reward',
        amount: '25 Points',
        time: '3 days ago',
        status: 'Completed'
    }
];

// Sample portfolio data for demo
const samplePortfolio = {
    totalValue: '1,250.00',
    assets: [
        { name: 'ETH', amount: '0.75', value: '$1,125.00' },
        { name: 'Carbon Credits', amount: '15', value: '$75.00' },
        { name: 'Farming Tokens', amount: '500', value: '$50.00' }
    ]
};

// Connect wallet function
function connectWallet(isDemo = false) {
    if (isConnected) {
        disconnectWallet();
        return;
    }

    // Simulate connection process
    const buttons = [connectWalletBtn, connectBtn];
    buttons.forEach(btn => {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = isDemo ? 
                '<span class="btn-icon">⏳</span>Connecting...' : 
                '<span class="btn-icon">⏳</span>Connecting...';
        }
    });

    setTimeout(() => {
        isConnected = true;
        updateWalletStatus();
        updatePortfolioView();
        updateTransactionsView();
        
        // Re-enable buttons and update text
        buttons.forEach(btn => {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span class="btn-icon">🔌</span>Disconnect';
            }
        });

        // Show success message
        showNotification(isDemo ? 'Demo wallet connected successfully!' : 'Wallet connected successfully!', 'success');
    }, 1500);
}

// Disconnect wallet function
function disconnectWallet() {
    isConnected = false;
    updateWalletStatus();
    updatePortfolioView();
    updateTransactionsView();
    
    // Update button text
    const buttons = [connectWalletBtn, connectBtn];
    buttons.forEach(btn => {
        if (btn) {
            btn.innerHTML = '<span class="btn-icon">👛</span>Connect Wallet';
        }
    });

    showNotification('Wallet disconnected', 'info');
}

// Update wallet status display
function updateWalletStatus() {
    if (isConnected) {
        statusIndicator.classList.remove('offline');
        statusIndicator.classList.add('online');
        statusText.textContent = 'Connected';
        statusText.classList.add('connected');
        walletStatus.classList.add('connected');
    } else {
        statusIndicator.classList.remove('online');
        statusIndicator.classList.add('offline');
        statusText.textContent = 'Not connected';
        statusText.classList.remove('connected');
        walletStatus.classList.remove('connected');
    }
}

// Update portfolio view
function updatePortfolioView() {
    if (isConnected) {
        portfolioContent.innerHTML = `
            <div class="portfolio-data">
                <div class="portfolio-summary">
                    <h3>Total Portfolio Value</h3>
                    <div class="portfolio-value">$${samplePortfolio.totalValue}</div>
                </div>
                <div class="assets-list">
                    ${samplePortfolio.assets.map(asset => `
                        <div class="asset-item">
                            <div class="asset-info">
                                <span class="asset-name">${asset.name}</span>
                                <span class="asset-amount">${asset.amount}</span>
                            </div>
                            <div class="asset-value">${asset.value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        portfolioContent.innerHTML = `
            <div class="portfolio-placeholder">
                <p>Connect your wallet to view portfolio data</p>
                <p class="portfolio-subtitle">Connect your wallet to view your assets</p>
                <button class="connect-wallet-btn" onclick="connectWallet()">
                    <span class="btn-icon">👛</span>
                    Connect Wallet
                </button>
            </div>
        `;
    }
}

// Update transactions view
function updateTransactionsView() {
    if (isConnected) {
        transactionsContent.innerHTML = `
            <div class="transactions-list">
                ${sampleTransactions.map(tx => `
                    <div class="transaction-item">
                        <div class="transaction-info">
                            <div class="transaction-type">${tx.type}</div>
                            <div class="transaction-time">${tx.time}</div>
                        </div>
                        <div class="transaction-details">
                            <div class="transaction-amount">${tx.amount}</div>
                            <div class="transaction-status ${tx.status.toLowerCase()}">${tx.status}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        transactionsContent.innerHTML = '<p class="no-transactions">No transactions available</p>';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Event listeners
if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', () => connectWallet());
}

if (connectBtn) {
    connectBtn.addEventListener('click', () => connectWallet());
}

if (demoBtn) {
    demoBtn.addEventListener('click', () => connectWallet(true));
}

// Add CSS for dynamic content
const dynamicStyles = `
<style>
.portfolio-data {
    width: 100%;
    text-align: left;
}

.portfolio-summary {
    margin-bottom: 24px;
    text-align: center;
}

.portfolio-summary h3 {
    color: #a0d4b8;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
}

.portfolio-value {
    font-size: 24px;
    font-weight: 700;
    color: #4ade80;
}

.assets-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.asset-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid #2d5a47;
}

.asset-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.asset-name {
    font-weight: 600;
    color: #ffffff;
}

.asset-amount {
    font-size: 12px;
    color: #a0d4b8;
}

.asset-value {
    font-weight: 600;
    color: #4ade80;
}

.transactions-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid #2d5a47;
}

.transaction-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.transaction-type {
    font-weight: 500;
    color: #ffffff;
    font-size: 14px;
}

.transaction-time {
    font-size: 12px;
    color: #a0d4b8;
}

.transaction-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: right;
}

.transaction-amount {
    font-weight: 600;
    color: #4ade80;
    font-size: 14px;
}

.transaction-status {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
}

.transaction-status.completed {
    background-color: rgba(74, 222, 128, 0.2);
    color: #4ade80;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 1000;
    min-width: 300px;
    animation: slideIn 0.3s ease;
}

.notification.success {
    background-color: rgba(74, 222, 128, 0.1);
    border: 1px solid #4ade80;
    color: #4ade80;
}

.notification.info {
    background-color: rgba(59, 130, 246, 0.1);
    border: 1px solid #3b82f6;
    color: #3b82f6;
}

.notification-message {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
}

.notification-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
`;

// Add dynamic styles to head
document.head.insertAdjacentHTML('beforeend', dynamicStyles);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateWalletStatus();
    updatePortfolioView();
    updateTransactionsView();
});
