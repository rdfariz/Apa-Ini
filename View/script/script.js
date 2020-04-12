let loading = false
const body = document.body

document.getElementById('img').style.width = '300px';

async function predict() {
  body.classList.add('loading')

  const img = document.getElementById('img')
  const result = document.getElementById('result')
  // Load the model.
  await mobilenet.load().then(model => {
    // Classify the image.
    model.classify(img).then(predictions => {
      result.innerHTML = ""
      const title = document.createElement('h4')
      title.textContent = `// Result: `
      result.appendChild(title)
      predictions.forEach((el)=>{
        const li = document.createElement('li')
        const classList = document.createElement('p')
        const probability = document.createElement('p')
        classList.textContent = `Name: ${el.className}`
        probability.textContent = `Probability: ${el.probability}`
        li.appendChild(classList)
        li.appendChild(probability)
        result.appendChild(li)
      })
    }).catch(err=>{
      console.log(err)
      alert('Pastikan sudah menginput gambar bro bkn yang lain')
    }).finally(()=>{
      body.classList.remove('loading')
    })
  });
}

document.getElementById('toPredict').addEventListener('click', ()=>{
  this.predict();
})

document.getElementById('fileInput').addEventListener('change', (e)=>{
  const img = document.getElementById('img')
  const reader = new FileReader()
  reader.onload = function(e) {
    var output = img
    output.src = e.target.result;
  }
  reader.readAsDataURL(e.target.files[0])
})