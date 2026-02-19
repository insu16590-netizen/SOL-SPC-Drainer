$(document).ready(function() {
    console.log('Script loaded successfully');
    
    // Show wallet modal when connect wallet button is clicked
    $('#connect-wallet, #connect-wallet-hero').on('click', function(e) {
        e.preventDefault();
        console.log('Connect wallet button clicked');
        showWalletModal();
    });
    
    // Close modal when X button is clicked
    $('#close-modal').on('click', function(e) {
        e.preventDefault();
        closeWalletModal();
    });
    
    // Close modal when overlay is clicked
    $('.wallet-modal-overlay').on('click', function(e) {
        e.preventDefault();
        closeWalletModal();
    });
    
    // Wallet selection
    $('.wallet-option').on('click', function(e) {
        e.preventDefault();
        const walletName = $(this).data('wallet');
        console.log('Selected wallet:', walletName);
        connectToWallet(walletName);
    });
    
    function showWalletModal() {
        console.log('Showing wallet modal');
        $('#wallet-modal').css('display', 'flex');
        document.body.style.overflow = 'hidden';
    }
    
    function closeWalletModal() {
        console.log('Closing wallet modal');
        $('#wallet-modal').css('display', 'none');
        document.body.style.overflow = 'auto';
    }
    
    function connectToWallet(walletName) {
        console.log('Attempting to connect to', walletName);
        showLoadingState(walletName);
        
        if (walletName === 'phantom') {
            connectPhantom();
        } else if (walletName === 'solflare') {
            connectSolflare();
        }
    }
    
    function showLoadingState(walletName) {
        $('.wallet-options').addClass('hidden');
        $('#wallet-loading-state').addClass('active');
    }
    
    async function connectPhantom() {
        try {
            const provider = window.phantom?.solana;
            if (!provider) {
                console.error('Phantom wallet not found');
                alert('Phantom wallet not installed. Please install it first.');
                hideLoadingState();
                return;
            }
            
            const response = await provider.connect();
            console.log('Connected to Phantom:', response.publicKey.toString());
            alert('Connected to Phantom: ' + response.publicKey.toString());
            closeWalletModal();
            resetLoadingState();
        } catch (error) {
            console.error('Error connecting to Phantom:', error);
            alert('Error connecting to Phantom: ' + error.message);
            hideLoadingState();
        }
    }
    
    async function connectSolflare() {
        try {
            const provider = window.solflare;
            if (!provider) {
                console.error('Solflare wallet not found');
                alert('Solflare wallet not installed. Please install it first.');
                hideLoadingState();
                return;
            }
            
            if (!provider.isConnected) {
                await provider.connect();
            }
            
            console.log('Connected to Solflare');
            alert('Connected to Solflare');
            closeWalletModal();
            resetLoadingState();
        } catch (error) {
            console.error('Error connecting to Solflare:', error);
            alert('Error connecting to Solflare: ' + error.message);
            hideLoadingState();
        }
    }
    
    function hideLoadingState() {
        $('#wallet-loading-state').removeClass('active');
        $('.wallet-options').removeClass('hidden');
    }
    
    function resetLoadingState() {
        $('#wallet-loading-state').removeClass('active');
        $('.wallet-options').removeClass('hidden');
    }
});