const fileUploadContainer = document.getElementById('file-upload');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');

    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

    function getFileIcon(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        switch (ext) {
            case 'pdf':
                return '📄';
            default:
                return '';
        }
    }

    function displayFiles(files) {
        fileList.innerHTML = '';
        Array.from(files).forEach(file => {
            if (!allowedFileTypes.includes(file.type)) {
                alert(`File type not allowed: Please upload the file in image or PDF files ${file.name}`);
                return; // Skip invalid files
            }

            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = getFileIcon(file.name) + `<span class="file-name">${file.name}</span>`;
            
            // Create a link for the file to open in a new tab
            const fileURL = URL.createObjectURL(file);
            fileItem.onclick = () => {
                window.open(fileURL, '_blank'); // Open file in a new tab
            };

            // If the file is an image, create an img element for preview
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.className = 'preview-image';
                img.src = fileURL; // Set image source
                fileItem.prepend(img); // Add image before the filename
            }

            fileList.appendChild(fileItem);
        });
    }

    fileUploadContainer.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        displayFiles(e.target.files);
    });

    fileUploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    fileUploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        displayFiles(files);
    });