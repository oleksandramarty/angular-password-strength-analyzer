export const passwordWeightDefaultText = {
  empty: 'empty',
  tooShort: 'too short',
  weak: 'Weak',
  good: 'Good',
  excellent: 'Excellent',
}

export const defaultConfig = [
  { max: 0, text: passwordWeightDefaultText.empty },
  { min: 1, max: 1, text: passwordWeightDefaultText.tooShort },
  { min: 2, max: 34, text: passwordWeightDefaultText.weak },
  { min: 35, max: 67, text: passwordWeightDefaultText.good },
  { min: 68, text: passwordWeightDefaultText.excellent },
]

export const defaultAnalyzerConfig = {
  isActiveOptionCountDigits: true,
  isActiveOptionCountSpecialChars: true,
  isActiveOptionHasUpperCaseAndLowerCase: true,
  isActiveOptionHasLettersAndDigits: true,
  isActiveOptionHasSpecialCharsAndDigits: true,
  isActiveOptionHasLettersAndSpecialChars: true,
  isActiveOptionIsAllLettersOrAllDigits: true,
}
