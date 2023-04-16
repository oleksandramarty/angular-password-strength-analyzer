export const passwordWeightDefaultText = {
  tooShort: 'Too short',
  weak: 'Weak',
  good: 'Good',
  excellent: 'Excellent',
}

export const defaultConfig = [
  { max: 0, text: passwordWeightDefaultText.tooShort },
  { min: 0, max: 34, text: passwordWeightDefaultText.weak },
  { min: 34, max: 67, text: passwordWeightDefaultText.good },
  { min: 67, text: passwordWeightDefaultText.excellent },
]
