const API_KEY = 'S9q5mgibXJoVZ8tOJIAIZItIz7e123bG2JxDjt6P';

function initializeDatepicker() {
  const today = new Date();
  const formattedToday = formatDate(today);
  console.log("Initializing date picker with today's date:", formattedToday);
  document.getElementById('datePicker').max = formattedToday;
  document.getElementById('datePicker').value = formattedToday;
}

function getRandomDate() {
  const start = new Date('1995-06-16');
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  console.log('Generated random date:', formatDate(randomDate)); 
  return randomDate;
}

function formatDate(date) {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function fetchAPODData(date) {
  try {
    const endpoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;
    console.log('Fetching APOD data for date:', date);
    const response = await fetch(endpoint);
    console.log('Full fetch response:', response);
    const data = await response.json();
    console.log('Received APOD data:', data);
    updateUI(data, date);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function updateUI(data, date) {
  console.log('Updating UI with APOD data for date:', date); 
  document.getElementById('apodImage').style.backgroundImage = `url('${data.hdurl}')`;
  document.getElementById('apodDescription').textContent = data.explanation;
  document.getElementById('apodDate').textContent = `Date: ${date}`;
  document.getElementById('apodTitle').textContent = data.title;
}

async function loadAPODData() {
  const date = getRandomDate();
  await fetchAPODData(formatDate(date));
}

async function loadSelectedDateAPOD() {
  const randomDate = formatDate(getRandomDate());
  console.log('Loading APOD data for a random date:', randomDate);
  await fetchAPODData(randomDate);
}

async function loadSelectedDateAPOD() {
  const selectedDate = document.getElementById('datePicker').value;
  console.log('Loading APOD data for selected date:', selectedDate); 
  await fetchAPODData(selectedDate);
}

async function loadCurrentDateAPOD() {
  initializeDatepicker();
  const currentDate = formatDate(new Date());
  console.log('Loading APOD data for the current date:', currentDate); 
  await fetchAPODData(currentDate);
}
