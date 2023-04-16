export interface IPasswordStrengthOptions {
  min?: number | null | undefined,
  max?: number | null | undefined,
  text: string | null | undefined,
}

export interface IPasswordAnalyzerOptions {
  isActiveOptionCountDigits?: boolean | null | undefined,
  isActiveOptionCountSpecialChars?: boolean | null | undefined,
  isActiveOptionHasUpperCaseAndLowerCase?: boolean | null | undefined,
  isActiveOptionHasLettersAndDigits?: boolean | null | undefined,
  isActiveOptionHasSpecialCharsAndDigits?: boolean | null | undefined,
  isActiveOptionHasLettersAndSpecialChars?: boolean | null | undefined,
  isActiveOptionIsAllLettersOrAllDigits?: boolean | null | undefined,
}
