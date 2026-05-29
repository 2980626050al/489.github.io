document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    setupEditButtons();
    setupAvatarUpload();
});

function loadProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    const avatarImg = document.getElementById('avatar-img');
    const avatarEmoji = document.getElementById('avatar-emoji');
    
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        document.getElementById('display-name').textContent = profile.name || '张桂兰';
        document.getElementById('display-age').textContent = profile.age + '岁';
        document.getElementById('display-gender').textContent = profile.gender || '女';
        document.getElementById('display-phone').textContent = profile.phone || '13888888888';
        document.getElementById('display-address').textContent = profile.address || '北京市朝阳区幸福小区3号楼201室';
        
        document.getElementById('edit-name').value = profile.name || '张桂兰';
        document.getElementById('edit-age').value = profile.age || '72';
        document.getElementById('edit-gender').value = profile.gender || '女';
        document.getElementById('edit-phone').value = profile.phone || '13888888888';
        document.getElementById('edit-address').value = profile.address || '北京市朝阳区幸福小区3号楼201室';
        
        document.querySelector('.profile-name').textContent = profile.name || '张桂兰';
        document.querySelector('.profile-phone').textContent = profile.phone ? profile.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '138****8888';
    }
    
    avatarImg.src = '';
    avatarEmoji.style.display = 'block';
}

function setupEditButtons() {
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const avatarOverlay = document.getElementById('avatar-overlay');

    editBtn.addEventListener('click', function() {
        toggleEditMode(true);
    });

    saveBtn.addEventListener('click', function() {
        saveProfile();
        toggleEditMode(false);
    });

    cancelBtn.addEventListener('click', function() {
        loadProfile();
        toggleEditMode(false);
    });
}

function setupAvatarUpload() {
    const avatarContainer = document.getElementById('avatar-container');
    const avatarInput = document.getElementById('avatar-input');
    const avatarImg = document.getElementById('avatar-img');
    const avatarEmoji = document.getElementById('avatar-emoji');
    const avatarOverlay = document.getElementById('avatar-overlay');
    
    avatarContainer.addEventListener('click', function() {
        if (avatarOverlay.style.display !== 'none') {
            avatarInput.click();
        }
    });

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 500000) {
                alert('图片大小不能超过500KB，请选择更小的图片！');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarImg.src = event.target.result;
                avatarEmoji.style.display = 'none';
                
                alert('头像已更新！');
            };
            reader.readAsDataURL(file);
        }
    });
}

function toggleEditMode(isEditing) {
    const displayElements = document.querySelectorAll('.info-value');
    const inputElements = document.querySelectorAll('.info-input');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const avatarOverlay = document.getElementById('avatar-overlay');

    displayElements.forEach(el => {
        el.style.display = isEditing ? 'none' : 'inline';
    });

    inputElements.forEach(el => {
        el.style.display = isEditing ? 'inline-block' : 'none';
    });

    editBtn.style.display = isEditing ? 'none' : 'inline-block';
    saveBtn.style.display = isEditing ? 'inline-block' : 'none';
    cancelBtn.style.display = isEditing ? 'inline-block' : 'none';
    
    avatarOverlay.style.display = isEditing ? 'flex' : 'none';
}

function saveProfile() {
    const profile = {
        name: document.getElementById('edit-name').value,
        age: document.getElementById('edit-age').value,
        gender: document.getElementById('edit-gender').value,
        phone: document.getElementById('edit-phone').value,
        address: document.getElementById('edit-address').value
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    document.getElementById('display-name').textContent = profile.name;
    document.getElementById('display-age').textContent = profile.age + '岁';
    document.getElementById('display-gender').textContent = profile.gender;
    document.getElementById('display-phone').textContent = profile.phone;
    document.getElementById('display-address').textContent = profile.address;
    
    document.querySelector('.profile-name').textContent = profile.name;
    document.querySelector('.profile-phone').textContent = profile.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

    alert('资料已保存成功！');
}
