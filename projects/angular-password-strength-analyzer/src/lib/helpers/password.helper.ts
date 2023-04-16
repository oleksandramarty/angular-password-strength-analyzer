import {IPasswordStrengthOptions} from "../models/password.model";
import {defaultConfig} from "./data,helper";

export function pwdWeightAnalyze(pwd: string | null | undefined, minLength: number = 8): number {
  let weight = 0;

  if (!pwd || pwd.length < minLength) {
    return 0; // password is too short
  }

  weight = pwd.length * 3;
  weight = weight + compressPassword(pwd).length;

  // If the password contains at least 3 digits, then increase the weight by 5, then reduce the weight of the password by 5.
  weight = countDigits(pwd) >= 3 ? weight + 5 : weight - 5;
  // If the password contains at least 2 characters, then increase the weight by 5, then reduce the weight of the password by 5.
  weight = countSpecialChars(pwd) >= 2 ? weight + 5 : weight - 5;
  // If the password contains letters in both upper and lower case, then increase the weight of the password by 10, then reduce the weight of the password by 5.
  weight = hasUpperCaseAndLowerCase(pwd) ? weight + 10 : weight - 5;
  // If the password contains letters and numbers, then increase the password weight by 15, then reduce the weight of the password by 5.
  weight = hasLettersAndDigits(pwd) ? weight + 15 : weight - 5;
  // If the password contains characters and numbers, then increase the weight by 15, then reduce the weight of the password by 5.
  weight = hasSpecialCharsAndDigits(pwd) ? weight + 15 : weight - 5;
  // If the password contains letters and signs, then increase the weight by 15, then reduce the weight of the password by 5.
  weight = hasLettersAndSpecialChars(pwd) ? weight + 15 : weight - 5;
  // If the password consists of only letters or only numbers, then reduce the weight of the password by 10.
  weight = isAllLettersOrAllDigits(pwd) ? weight - 10 : weight + 10;

  return weight > 100 ? 100 : weight < 0 ? 0 : weight;
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
  options?: IPasswordStrengthOptions[] | null): string | null | undefined {
  if (!pwd) {
    return '';
  }
  const weight = pwdWeightAnalyze(pwd, minLength);

  if (!options) {
    options = defaultConfig;
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
