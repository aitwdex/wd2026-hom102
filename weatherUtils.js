export function codeToText(code) {
  // 0(快晴) と 1(だいたい晴れ) は「晴れ」
  if (code <= 1) {
    return "晴れ";
    
  // 2(一部曇り)、3(曇り)、45・48(霧) は「曇り」
  } else if (code <= 48) {
    return "曇り";
    
  // 51以上（雨、雪、雷雨など）は「雨」
  } else {
    return "雨"; 
  }
}