const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let tracking = false;
let lastPosition = { x: -1, y: -1 };
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'l') {
    e.preventDefault();
    if (!tracking) {
      tracking = true;
      console.log("Tracking Started");
    }
  }
  if (e.ctrlKey && e.key === 'm') {
    e.preventDefault();
    if (tracking) {
      tracking = false;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'canvas_image.png';
      link.click();
      console.log("Tracking Stopped and Image Saved");
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (tracking) {
    const { x, y } = getCursorPos(e);
    if (lastPosition.x !== -1 && lastPosition.y !== -1) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastPosition = { x, y };
  }
});

function getCursorPos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

document.getElementById('save-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  if (username) {
    alert(`Username saved: ${username}`);
  }
});

document.getElementById('language-select').addEventListener('change', updateMenu);

function updateMenu() {
  const language = document.getElementById('language-select').value;
  let folders = [];

  if (language === 'en') {
    folders = ["Uppercase", "Lowercase"];
  } else if (language === 'ma') {
    folders = ["Chilaksharam", "Kootaksharam", "Swaram", "Upachinnam", "Vyanjanaksharam"];
  } else {
    folders = ["Digits", "Punctuations"];
  }

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');

  folders.forEach(folder => {
    const button = document.createElement('button');
    button.textContent = folder;
    button.classList.add('menu-button');
    button.addEventListener('click', () => loadImages(folder));
    menuContainer.appendChild(button);
  });

  const existingMenu = document.querySelector('.menu-container');
  if (existingMenu) {
    existingMenu.remove();
  }

  document.body.appendChild(menuContainer);
}

function loadImages(folder) {
  const imageList = document.getElementById('image-list');
  imageList.innerHTML = ''; // Clear previous images

  // Simulate fetching image paths (replace with actual API or file system logic)
  const imagePaths = getImagePathsForFolder(folder);

  imagePaths.forEach(path => {
    const img = document.createElement('img');
    img.src = path;
    img.alt = path.split('/').pop(); // Use filename as alt text
    img.addEventListener('click', () => displaySelectedImage(path));
    imageList.appendChild(img);
  });
}

function displaySelectedImage(imagePath) {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = ''; // Clear previous content

  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = 'Selected Image';
  img.id = 'display-image';
  imageContainer.appendChild(img);
}

function getImagePathsForFolder(folder) {
  const mockPaths = {
    
    Uppercase: [
      './character_set/english/uppercase/A.png',
      './character_set/english/uppercase/B.png',
      './character_set/english/uppercase/C.png',
      './character_set/english/uppercase/F.png',
      './character_set/english/uppercase/X.png',
      './character_set/english/uppercase/D.png',
      './character_set/english/uppercase/Y.png',
      './character_set/english/uppercase/M.png',
      './character_set/english/uppercase/K.png',
      './character_set/english/uppercase/V.png',
      './character_set/english/uppercase/U.png',
      './character_set/english/uppercase/T.png',
      './character_set/english/uppercase/E.png',
      './character_set/english/uppercase/L.png',
      './character_set/english/uppercase/R.png',
      './character_set/english/uppercase/S.png',
      './character_set/english/uppercase/Q.png',
      './character_set/english/uppercase/Z.png',
      './character_set/english/uppercase/H.png',
      './character_set/english/uppercase/W.png',
      './character_set/english/uppercase/I.png',
      './character_set/english/uppercase/P.png',
      './character_set/english/uppercase/J.png',
      './character_set/english/uppercase/O.png',
      './character_set/english/uppercase/B.png',
      './character_set/english/uppercase/G.png',
    ],
    Lowercase: [
      './character_set/english/lowercase/a.png',
      './character_set/english/lowercase/b.png',
      './character_set/english/lowercase/c.png',
      './character_set/english/lowercase/t.png',
      './character_set/english/lowercase/z.png',
      './character_set/english/lowercase/l.png',
      './character_set/english/lowercase/s.png',
      './character_set/english/lowercase/p.png',
      './character_set/english/lowercase/e.png',
      './character_set/english/lowercase/j.png',
      './character_set/english/lowercase/o.png',
      './character_set/english/lowercase/m.png',
      './character_set/english/lowercase/u.png',
      './character_set/english/lowercase/x.png',
      './character_set/english/lowercase/r.png',
      './character_set/english/lowercase/d.png',
      './character_set/english/lowercase/g.png',
      './character_set/english/lowercase/w.png',
      './character_set/english/lowercase/i.png',
      './character_set/english/lowercase/q.png',
      './character_set/english/lowercase/h.png',
      './character_set/english/lowercase/k.png',
      './character_set/english/lowercase/n.png',
      './character_set/english/lowercase/v.png',
      './character_set/english/lowercase/y.png',
      './character_set/english/lowercase/f.png',
    ],
    Punctuations: [
        './character_set/characters/punctuations/FullStop.png',
        './character_set/characters/punctuations/QuotationMarks.png',
        './character_set/characters/punctuations/Dash.png',
        './character_set/characters/punctuations/QnMark.png',
        './character_set/characters/punctuations/Colon.png',
        './character_set/characters/punctuations/Ellipsis.png',
        './character_set/characters/punctuations/RoundBrackets.png',
        './character_set/characters/punctuations/Comma.png',
        './character_set/characters/punctuations/Exclamation.png',
        './character_set/characters/punctuations/Apostrophe.png',
        './character_set/characters/punctuations/SquareBrackets.png',
        './character_set/characters/punctuations/Slash.png',
        './character_set/characters/punctuations/Brace.png',
        './character_set/characters/punctuations/Atsign.png',
        './character_set/characters/punctuations/Hyphen.png',
        './character_set/characters/punctuations/Asterisk.png',
        './character_set/characters/punctuations/Semicolon.png',
      ],
      Digits: [
        './character_set/characters/digits/6.png',
        './character_set/characters/digits/2.png',
        './character_set/characters/digits/8.png',
        './character_set/characters/digits/7.png',
        './character_set/characters/digits/9.png',
        './character_set/characters/digits/5.png',
        './character_set/characters/digits/0.png',
        './character_set/characters/digits/4.png',
        './character_set/characters/digits/1.png',
        './character_set/characters/digits/3.png',
      ],
    
      Chilaksharam: [
        './character_set/malayalam/chilaksharam/1.png',
        './character_set/malayalam/chilaksharam/2.png',
        './character_set/malayalam/chilaksharam/3.png',
        './character_set/malayalam/chilaksharam/4.png',
        './character_set/malayalam/chilaksharam/5.png',
      ],
      Swarams: [
        './character_set/malayalam/swaram/1.png',
        './character_set/malayalam/swaram/2.png',
        './character_set/malayalam/swaram/3.png',
        './character_set/malayalam/swaram/4.png',
        './character_set/malayalam/swaram/5.png',
        './character_set/malayalam/swaram/6.png',
        './character_set/malayalam/swaram/7.png',
        './character_set/malayalam/swaram/8.png',
      ],
      Upachinnam: [
        './character_set/malayalam/upachinnam/1.png',
        './character_set/malayalam/upachinnam/2.png',
        './character_set/malayalam/upachinnam/3.png',
        './character_set/malayalam/upachinnam/4.png',
        './character_set/malayalam/upachinnam/5.png',
        './character_set/malayalam/upachinnam/6.png',
        './character_set/malayalam/upachinnam/7.png',
        './character_set/malayalam/upachinnam/8.png',
        './character_set/malayalam/upachinnam/9.png',
        './character_set/malayalam/upachinnam/10.png',
        './character_set/malayalam/upachinnam/11.png',
        './character_set/malayalam/upachinnam/12.png',
        './character_set/malayalam/upachinnam/13.png',
        './character_set/malayalam/upachinnam/14.png',
        './character_set/malayalam/upachinnam/15.png',
        './character_set/malayalam/upachinnam/16.png',
      ],
      Vyanjanaksharam: [
        './character_set/malayalam/vyanjanaksharam/1.png',
        './character_set/malayalam/vyanjanaksharam/2.png',
        './character_set/malayalam/vyanjanaksharam/3.png',
        './character_set/malayalam/vyanjanaksharam/4.png',
        './character_set/malayalam/vyanjanaksharam/5.png',
        './character_set/malayalam/vyanjanaksharam/6.png',
        './character_set/malayalam/vyanjanaksharam/7.png',
        './character_set/malayalam/vyanjanaksharam/8.png',
        './character_set/malayalam/vyanjanaksharam/9.png',
        './character_set/malayalam/vyanjanaksharam/10.png',
        './character_set/malayalam/vyanjanaksharam/11.png',
        './character_set/malayalam/vyanjanaksharam/12.png',
        './character_set/malayalam/vyanjanaksharam/13.png',
        './character_set/malayalam/vyanjanaksharam/14.png',
        './character_set/malayalam/vyanjanaksharam/15.png',
        './character_set/malayalam/vyanjanaksharam/16.png',
        './character_set/malayalam/vyanjanaksharam/17.png',
        './character_set/malayalam/vyanjanaksharam/18.png',
        './character_set/malayalam/vyanjanaksharam/19.png',
        './character_set/malayalam/vyanjanaksharam/20.png',
        './character_set/malayalam/vyanjanaksharam/21.png',
        './character_set/malayalam/vyanjanaksharam/22.png',
        './character_set/malayalam/vyanjanaksharam/23.png',
        './character_set/malayalam/vyanjanaksharam/24.png',
        './character_set/malayalam/vyanjanaksharam/25.png',
        './character_set/malayalam/vyanjanaksharam/26.png',
        './character_set/malayalam/vyanjanaksharam/27.png',
        './character_set/malayalam/vyanjanaksharam/28.png',
        './character_set/malayalam/vyanjanaksharam/29.png',
        './character_set/malayalam/vyanjanaksharam/30.png',
        './character_set/malayalam/vyanjanaksharam/31.png',
        './character_set/malayalam/vyanjanaksharam/32.png',
        './character_set/malayalam/vyanjanaksharam/33.png',
        './character_set/malayalam/vyanjanaksharam/34.png',
        './character_set/malayalam/vyanjanaksharam/35.png',
        './character_set/malayalam/vyanjanaksharam/36.png',
      ],
      Kootaksharam: [
        './character_set/malayalam/kootaksharam/1.png',
        './character_set/malayalam/kootaksharam/2.png',
        './character_set/malayalam/kootaksharam/3.png',
        './character_set/malayalam/kootaksharam/4.png',
        './character_set/malayalam/kootaksharam/5.png',
        './character_set/malayalam/kootaksharam/6.png',
        './character_set/malayalam/kootaksharam/7.png',
        './character_set/malayalam/kootaksharam/8.png',
        './character_set/malayalam/kootaksharam/9.png',
        './character_set/malayalam/kootaksharam/10.png',
        './character_set/malayalam/kootaksharam/11.png',
        './character_set/malayalam/kootaksharam/12.png',
        './character_set/malayalam/kootaksharam/13.png',
        './character_set/malayalam/kootaksharam/14.png',
        './character_set/malayalam/kootaksharam/15.png',
        './character_set/malayalam/kootaksharam/16.png',
        './character_set/malayalam/kootaksharam/17.png',
        './character_set/malayalam/kootaksharam/18.png',
        './character_set/malayalam/kootaksharam/19.png',
        './character_set/malayalam/kootaksharam/20.png',
        './character_set/malayalam/kootaksharam/21.png',
        './character_set/malayalam/kootaksharam/22.png',
        './character_set/malayalam/kootaksharam/23.png',
        './character_set/malayalam/kootaksharam/24.png',
        './character_set/malayalam/kootaksharam/25.png',
        './character_set/malayalam/kootaksharam/26.png',
        './character_set/malayalam/kootaksharam/27.png',
        './character_set/malayalam/kootaksharam/28.png',
        './character_set/malayalam/kootaksharam/29.png',
        './character_set/malayalam/kootaksharam/30.png',
        './character_set/malayalam/kootaksharam/31.png',
        './character_set/malayalam/kootaksharam/32.png',
        './character_set/malayalam/kootaksharam/33.png',
        './character_set/malayalam/kootaksharam/34.png',
        './character_set/malayalam/kootaksharam/35.png',
        './character_set/malayalam/kootaksharam/36.png',
        './character_set/malayalam/kootaksharam/37.png',
        './character_set/malayalam/kootaksharam/38.png',
        './character_set/malayalam/kootaksharam/39.png',
        './character_set/malayalam/kootaksharam/40.png',
        './character_set/malayalam/kootaksharam/41.png',
        './character_set/malayalam/kootaksharam/42.png',
        './character_set/malayalam/kootaksharam/43.png',
        './character_set/malayalam/kootaksharam/44.png',
        './character_set/malayalam/kootaksharam/45.png',
        './character_set/malayalam/kootaksharam/46.png',
        './character_set/malayalam/kootaksharam/47.png',
        './character_set/malayalam/kootaksharam/48.png',
        './character_set/malayalam/kootaksharam/49.png',
        './character_set/malayalam/kootaksharam/50.png',
        './character_set/malayalam/kootaksharam/51.png',
        './character_set/malayalam/kootaksharam/52.png',
        './character_set/malayalam/kootaksharam/53.png',
        './character_set/malayalam/kootaksharam/54.png',
        './character_set/malayalam/kootaksharam/55.png',
        './character_set/malayalam/kootaksharam/56.png',
        './character_set/malayalam/kootaksharam/57.png',
        './character_set/malayalam/kootaksharam/58.png',
        './character_set/malayalam/kootaksharam/59.png',
        './character_set/malayalam/kootaksharam/60.png',
        './character_set/malayalam/kootaksharam/61.png',
        './character_set/malayalam/kootaksharam/62.png',
        './character_set/malayalam/kootaksharam/63.png',
        './character_set/malayalam/kootaksharam/64.png',
        './character_set/malayalam/kootaksharam/65.png',
      ],
    
  };
  

  return mockPaths[folder] || [];
}

// Initialize with default menu for English
window.onload = () => {
  updateMenu(); // Call updateMenu to display the default English menu
};