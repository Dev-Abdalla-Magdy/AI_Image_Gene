const api = `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`;
const results = document.querySelector('.results');
const geneInput = document.querySelector('.gene-input');
const geneBtn = document.querySelector('.gene-btn');

const generateImages = async () => {
  if (geneInput.value !== '') {
    // send a request
    const methods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api}`
      },
      body:JSON.stringify({
        "prompt": geneInput.value,
        "n": 4,
        "size": "1024x1024"
      })
    }
    const res = await fetch(`https://api.openai.com/v1/images/generations`, methods)
    // waiting animation function
    waitResponse(res.status);
    // receive a response
    const data = await res.json();
    const listImages = data.data;
    results.innerHTML = '';
    listImages.map(item => {
      geneInput.value = '';
      const imgBox = document.createElement('div');
      imgBox.className = 'img-box';
      const img = document.createElement('img');
      img.src = item.url;
      results.appendChild(imgBox);
      imgBox.appendChild(img);
      imgBox.style.border = 'none';
    })
  } else {
    alert('please write something');
  }
}

geneBtn.addEventListener('click', generateImages);

function waitResponse(state) {
  if (state !== 200) {
    results.style.animation = 'loading 2s linear infinite';
  } else {
    results.style.animation = '';
  }
}