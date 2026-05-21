const storeOptionsConfig = {
  library: {
    title: "📚 Tell us more about your Library experience",
    options: [
      { type: "radio", name: "libraryOption", value: "books", label: "Book selection & availability" },
      { type: "radio", name: "libraryOption", value: "rental", label: "Book rental service" },
      { type: "radio", name: "libraryOption", value: "ambience", label: "Reading ambience & seating" },
      { type: "radio", name: "libraryOption", value: "staff", label: "Staff helpfulness" },
      { type: "text", name: "libraryOther", placeholder: "Other (please specify)" }
    ]
  },
  cafe: {
    title: "☕ Tell us more about your Café experience",
    options: [
      { type: "radio", name: "cafeOption", value: "coffee", label: "Coffee quality & variety" },
      { type: "radio", name: "cafeOption", value: "food", label: "Food items & taste" },
      { type: "radio", name: "cafeOption", value: "ambience", label: "Ambience & music" },
      { type: "radio", name: "cafeOption", value: "service", label: "Service speed & friendliness" },
      { type: "text", name: "cafeOther", placeholder: "Other (please specify)" }
    ]
  },
  flower: {
    title: "🌸 Tell us more about your Flower Shop experience",
    options: [
      { type: "radio", name: "flowerOption", value: "freshness", label: "Flower freshness & quality" },
      { type: "radio", name: "flowerOption", value: "arrangement", label: "Bouquet arrangement" },
      { type: "radio", name: "flowerOption", value: "delivery", label: "Delivery service" },
      { type: "radio", name: "flowerOption", value: "gifting", label: "Gift link feature" },
      { type: "text", name: "flowerOther", placeholder: "Other (please specify)" }
    ]
  },
  icecream: {
    title: "🍦 Tell us more about your Ice Cream experience",
    options: [
      { type: "radio", name: "iceOption", value: "flavors", label: "Flavor variety" },
      { type: "radio", name: "iceOption", value: "quality", label: "Taste & quality" },
      { type: "radio", name: "iceOption", value: "customization", label: "Scoop customization" },
      { type: "radio", name: "iceOption", value: "service", label: "Service & presentation" },
      { type: "text", name: "iceOther", placeholder: "Other (please specify)" }
    ]
  },
  overall: {
    title: "🌿 Tell us about your overall Urban Oasis experience",
    options: [
      { type: "checkbox", name: "overallLiked", value: "website", label: "Website design & ease of use" },
      { type: "checkbox", name: "overallLiked", value: "variety", label: "Variety of products" },
      { type: "checkbox", name: "overallLiked", value: "pricing", label: "Pricing & discounts" },
      { type: "checkbox", name: "overallLiked", value: "delivery", label: "Delivery experience" },
      { type: "checkbox", name: "overallLiked", value: "customerSupport", label: "Customer support" },
      { type: "text", name: "overallOther", placeholder: "Any other feedback or suggestions" }
    ]
  }
};

let currentRating = 0;

const starBtns = document.querySelectorAll('.star-btn');
const ratingValueInput = document.getElementById('ratingValue');
const ratingTextSpan = document.getElementById('ratingText');
const storeSelect = document.getElementById('storeSelect');
const storeOptionsDiv = document.getElementById('storeOptions');
const form = document.getElementById('feedbackForm');
const successMessageDiv = document.getElementById('successMessage');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

function setRating(rating) {
  currentRating = rating;
  if (ratingValueInput) ratingValueInput.value = rating;
      
  starBtns.forEach((btn, index) => {
    if (index < rating) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
      
  const ratingMessages = {
    1: "⭐ Poor - We'll do better!",
    2: '⭐⭐ Fair - Room for improvement',
    3: '⭐⭐⭐ Good - Satisfied',
    4: '⭐⭐⭐⭐ Very Good - Impressed!',
    5: '⭐⭐⭐⭐⭐ Excellent - Loved it!'
  };
  ratingTextSpan.textContent = ratingMessages[rating] || 'Select a rating';
}

starBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const rating = parseInt(btn.getAttribute('data-rating'), 10);
    setRating(rating);
  });
});

function updateStoreOptions() {
  const selectedStore = storeSelect.value;
      
  if (!selectedStore || !storeOptionsConfig[selectedStore]) {
    storeOptionsDiv.classList.remove('show');
    storeOptionsDiv.innerHTML = '';
    return;
  }
      
  const config = storeOptionsConfig[selectedStore];
  let optionsHtml = `<h4>${config.title}</h4>`;
      
  config.options.forEach(opt => {
    if (opt.type === 'radio') {
      optionsHtml += `
        <div class="option-group">
          <label>
            <input type="radio" name="${opt.name}" value="${opt.value}">
            ${opt.label}
          </label>
        </div>
      `;
    } else if (opt.type === 'checkbox') {
      optionsHtml += `
        <div class="option-group">
          <label>
            <input type="checkbox" name="${opt.name}" value="${opt.value}">
            ${opt.label}
          </label>
        </div>
      `;
    } else if (opt.type === 'text') {
      optionsHtml += `
        <div class="option-group">
          <input type="text" name="${opt.name}" placeholder="${opt.placeholder}" style="width:100%; margin-top:0.5rem;">
        </div>
      `;
    }
  });
      
  storeOptionsDiv.innerHTML = optionsHtml;
  storeOptionsDiv.classList.add('show');
}

storeSelect.addEventListener('change', updateStoreOptions);

function closeSuccess() {
  successMessageDiv.classList.remove('show');
}

if (closeSuccessBtn) {
  closeSuccessBtn.addEventListener('click', closeSuccess);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
      
  const store = storeSelect.value;
  const rating = currentRating;
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const feedbackMessage = document.getElementById('feedbackMessage').value;
      
  if (!store) {
    alert('Please select a store to share your feedback.');
    return;
  }
      
  if (rating === 0) {
    alert('Please rate your experience using the stars above.');
    return;
  }
      
  let specificResponse = '';
  if (storeOptionsConfig[store]) {
    const selectedRadio = storeOptionsDiv.querySelector('input[type="radio"]:checked');
    const selectedCheckboxes = storeOptionsDiv.querySelectorAll('input[type="checkbox"]:checked');
    const textInput = storeOptionsDiv.querySelector('input[type="text"]');
          
    if (selectedRadio) {
      const label = selectedRadio.parentElement.innerText.trim();
      specificResponse = `Selected: ${label}`;
    } else if (selectedCheckboxes.length > 0) {
      const labels = Array.from(selectedCheckboxes).map(cb => cb.parentElement.innerText.trim());
      specificResponse = `Selected: ${labels.join(', ')}`;
    } else if (textInput && textInput.value.trim()) {
      specificResponse = `Other: ${textInput.value.trim()}`;
    }
  }
      
  console.log('=== FEEDBACK SUBMITTED ===');
  console.log('Store:', store);
  console.log('Rating:', rating);
  console.log('Name:', userName || 'Anonymous');
  console.log('Email:', userEmail || 'Not provided');
  console.log('Feedback:', feedbackMessage || 'No comment');
  console.log('Specific Response:', specificResponse || 'None');
  console.log('Timestamp:', new Date().toLocaleString());
  console.log('===========================');
      
  successMessageDiv.classList.add('show');
      
  setTimeout(() => {
    form.reset();
    setRating(0);
    storeOptionsDiv.classList.remove('show');
    storeOptionsDiv.innerHTML = '';
    currentRating = 0;
    if (ratingValueInput) ratingValueInput.value = 0;
          
    document.querySelector('.feedback-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 500);
});

setRating(0);