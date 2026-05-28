document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const sideMenuOverlay = document.getElementById('sideMenuOverlay');
    const sideMenuClose = document.getElementById('sideMenuClose');

    if (menuToggle && sideMenu && sideMenuOverlay) {
        menuToggle.addEventListener('click', function() {
            sideMenu.classList.add('active');
            sideMenuOverlay.classList.add('active');
        });

        sideMenuClose.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            sideMenuOverlay.classList.remove('active');
        });

        sideMenuOverlay.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            sideMenuOverlay.classList.remove('active');
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
                sideMenuOverlay.classList.remove('active');
            }
        });
    }
});
