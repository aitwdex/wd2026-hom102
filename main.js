import { codeToText } from './weatherUtils.js';

// HTMLのタグをJSで使えるように取得する
const citySelect = document.getElementById('citySelect');
const fetchBtn = document.getElementById('fetchBtn');
const resultArea = document.getElementById('resultArea');
const cityNameDisplay = document.getElementById('cityName');
const weatherTextDisplay = document.getElementById('weatherText');
const temperatureDisplay = document.getElementById('temperature');

fetchBtn.addEventListener('click', async () => {
  
  // 選ばれている都市緯度,経度の文字列を取得
  const selectValue = citySelect.value;
  
  // コンマ「,」で分割（それぞれの変数に分ける
  const [lat, lon] = selectValue.split(',');
  
  // 画面に表示するために、選ばれた都市の名前（東京、大阪、愛知（名古屋）も取得しておく
  const selectedCityName = citySelect.options[citySelect.selectedIndex].text;
  
  // 分解した緯度と経度のAPIURLへの埋め込み
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    // 外部APIからデータを取得する
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // 今の天気データだけを取り出す
    const currentWeather = data.current_weather;

    // 数字のコードを日本語のテキストにする
    const weatherJapanese = codeToText(currentWeather.weathercode);

    // 取得したデータをHTMLの画面にセットする
    cityNameDisplay.textContent = selectedCityName; // 都市名
    weatherTextDisplay.textContent = weatherJapanese; // 天気
    temperatureDisplay.textContent = currentWeather.temperature; // 気温
    
    // 結果を見せる
    resultArea.style.display = 'block';
  } catch (error) {
    alert("天気の取得に失敗しました"); 
  }
});