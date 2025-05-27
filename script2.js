const fileUploadContainer = document.getElementById('file-upload');
  const fileInput = document.getElementById('file-input');
  const fileList = document.getElementById('file-list');

  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];

  function getFileIcon(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case 'mp4':
      case 'webm':
      case 'ogg':
        return '🎥';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      default:
        return '';
    }
  }

  function displayFiles(files) {
    fileList.innerHTML = '';
    Array.from(files).forEach(file => {
      if (!allowedFileTypes.includes(file.type)) {
        alert(`File type not allowed: ${file.name}`);
        return; // Skip invalid files
      }

      const fileURL = URL.createObjectURL(file);

      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';

      // Determine if it’s an image or video
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.className = 'preview-media';
        img.src = fileURL;
        fileItem.appendChild(img);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.className = 'preview-media';
        video.src = fileURL;
        video.controls = true;
        video.width = 300;
        fileItem.appendChild(video);
      }

      // File name link
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.target = '_blank';
      fileLink.textContent = file.name;
      fileLink.className = 'file-name';

      const fileIcon = getFileIcon(file.name);
      fileItem.appendChild(document.createTextNode(fileIcon + ' '));
      fileItem.appendChild(fileLink);

      fileList.appendChild(fileItem);
    });
  }

  // Click to select files
  fileUploadContainer.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle selected files
  fileInput.addEventListener('change', (e) => {
    displayFiles(e.target.files);
  });

  // Drag & drop events
  fileUploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  fileUploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    displayFiles(files);
  });