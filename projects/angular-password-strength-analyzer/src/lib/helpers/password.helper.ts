import {IPasswordAnalyzerOptions, IPasswordStrengthOptions} from "../models/password.model";
import {defaultAnalyzerConfig, defaultConfig} from "./data.helper";

export function pwdWeightAnalyze(pwd: string | null | undefined, minLength: number = 8, analyzerOptions?: IPasswordAnalyzerOptions | null | undefined): number | null | undefined {
  let weight = 0;

  if (!pwd || pwd.length < minLength) {
    return !pwd ? 0 : 1; // password is too short
  }

  if (!analyzerOptions) {
    analyzerOptions = defaultAnalyzerConfig;
  }

  weight = compressPassword(pwd).length;

  // If the password contains at least 3 digits, then increase the weight by 5, then reduce the weight of the password by 5.
  weight = countDigits(pwd) >= 3 ? weight + 5 : weight - getReduce(analyzerOptions.isActiveOptionCountDigits ?? defaultAnalyzerConfig.isActiveOptionCountDigits, 5);
  // If the password contains at least 2 characters, then increase the weight by 5, then reduce the weight of the password by 5.
  weight = countSpecialChars(pwd) >= 2 ? weight + 5 : weight - getReduce(analyzerOptions.isActiveOptionCountSpecialChars ?? defaultAnalyzerConfig.isActiveOptionCountSpecialChars, 5);
  // If the password contains letters in both upper and lower case, then increase the weight of the password by 10, then reduce the weight of the password by 5.
  weight = hasUpperCaseAndLowerCase(pwd) ? weight + 10 : weight - getReduce(analyzerOptions.isActiveOptionHasUpperCaseAndLowerCase ?? defaultAnalyzerConfig.isActiveOptionHasUpperCaseAndLowerCase, 10);
  // If the password contains letters and numbers, then increase the password weight by 15, then reduce the weight of the password by 5.
  weight = hasLettersAndDigits(pwd) ? weight + 15 : weight - getReduce(analyzerOptions.isActiveOptionHasLettersAndDigits ?? defaultAnalyzerConfig.isActiveOptionHasLettersAndDigits, 15);
  // If the password contains characters and numbers, then increase the weight by 15, then reduce the weight of the password by 5.
  weight = hasSpecialCharsAndDigits(pwd) ? weight + 15 : weight - getReduce(analyzerOptions.isActiveOptionHasSpecialCharsAndDigits ?? defaultAnalyzerConfig.isActiveOptionHasSpecialCharsAndDigits, 15);
  // If the password contains letters and signs, then increase the weight by 15, then reduce the weight of the password by 5.
  weight = hasLettersAndSpecialChars(pwd) ? weight + 15 : weight - getReduce(analyzerOptions.isActiveOptionHasLettersAndSpecialChars ?? defaultAnalyzerConfig.isActiveOptionHasLettersAndSpecialChars, 15);
  // If the password consists of only letters or only numbers, then reduce the weight of the password by 10.
  weight = isAllLettersOrAllDigits(pwd) ? weight - getReduce(analyzerOptions.isActiveOptionIsAllLettersOrAllDigits ?? defaultAnalyzerConfig.isActiveOptionIsAllLettersOrAllDigits, 10) : weight + 10;

  return weight > 100 ? 100 : weight < 0 ? (pwd.length > 0 ? 2 : 0) : weight;
}

function getReduce(isActive: boolean, value: number): number {
  return isActive ? value : 0;
}

function compressPassword(pwd: string): string {
  let compressPwd = '';
  let last = '';
  for (let i = 0; i < 4; i++) {
    const step = i + 1;
    let arr: string[] = [];
    arr = splitPassword(pwd, step);
    removeConsecutiveDuplicates(arr).forEach((x) => {
      compressPwd += x;
    });
  }
  return compressPwd;
}

function removeConsecutiveDuplicates(arr: string[]): string[] {
  return arr.reduce((acc: string[], curr) => {
    if (acc.length === 0 || acc[acc.length - 1] !== curr) {
      acc.push(curr);
    }
    return acc;
  }, []);
}


function splitPassword(pwd: string, length: number): string[] {
  return pwd.match(new RegExp(`.{1,${length}}`, 'g')) ?? [];
}

function countDigits(pwd: string): number {
  return (pwd.match(/\d/g) || []).length;
}

function countSpecialChars(pwd: string): number {
  return (pwd.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g) || []).length;
}

function hasUpperCaseAndLowerCase(pwd: string): boolean {
  return pwd.match(/[A-Z]/) !== null && pwd.match(/[a-z]/) !== null;
}

function hasLettersAndDigits(pwd: string): boolean {
  return /[a-zA-Z]/.test(pwd) && /\d/.test(pwd);
}

function hasSpecialCharsAndDigits(pwd: string): boolean {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pwd) && /\d/.test(pwd);
}

function hasLettersAndSpecialChars(pwd: string): boolean {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pwd) && /[a-zA-Z]/.test(pwd);
}

function isAllLettersOrAllDigits(pwd: string): boolean {
  return (/^[a-zA-Z]*$/.test(pwd) || /^\d*$/.test(pwd));
}

export function pwdWeightAnalyzeWithTitle(
  pwd: string | null | undefined,
  minLength: number = 8,
  options?: IPasswordStrengthOptions[] | null,
  analyzerOptions?: IPasswordAnalyzerOptions | null | undefined): string | null | undefined {
  const weight = pwdWeightAnalyze(pwd, minLength, analyzerOptions) ?? 0;

  if (!options) {
    options = defaultConfig;
  }

  if (!pwd || pwd.length === 0) {
    return options.find(x => x.max === 0)?.text ?? '';
  }

  let result: string | null | undefined = '';
  options.forEach((item) => {
    if (!result) {
      if (typeof item.min === 'number' && typeof item.max === 'number') {
        if (item.min <= weight && weight <= item.max) {
          result = item.text;
        }
      }
      if (typeof item.min === 'number' && typeof item.max !== 'number') {
        if (item.min <= weight) {
          result = item.text;
        }
      }
      if (typeof item.min !== 'number' && typeof item.max === 'number') {
        if (item.max >= weight) {
          result = item.text;
        }
      }
    }
  });
  return result;
}
