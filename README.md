## Setting up in `module's imports`
```ts
import {AngularPasswordStrengthAnalyzerModule} from "angular-password-strength-analyzer";

AngularPasswordStrengthAnalyzerModule
```

## Usage `Password analyzer` in `ts`
```ts
import {pwdWeightAnalyze, pwdWeightAnalyzeWithTitle} from "angular-password-strength-analyzer";

public password: string | null | undefined;
public passwordWeight: number | null | undefined;
public passwordStrength: string | null | undefined;
public passwordStrengthCustom: string | null | undefined;
public passwordWeightCustom: number | null | undefined;

checkPasswordStrength(): void {
  this.passwordWeight = pwdWeightAnalyze(this.password);
  this.passwordWeightCustom = pwdWeightAnalyze(this.password, 6);
  this.passwordStrength = pwdWeightAnalyzeWithTitle(this.password);
  this.passwordStrengthCustom = pwdWeightAnalyzeWithTitle(this.password, 6, [
    { max: 0, text: 'your text 1' },
    { min: 0, max: 30, text: 'your text 2' },
    { min: 30, max: 60, text: 'your text 3' },
    { min: 60, text: 'your text 4' },
  ]);
}
```

## Usage `Password analyzer` in `html`
```html
<input
  type="password"
  [(ngModel)]="password"
  (ngModelChange)="checkPasswordStrength()">
<p>Weight: {{passwordWeight}}</p>
<p>Strength is: {{passwordStrength}}</p>
<p>Custom Weight is: {{passwordWeightCustom}}</p>
<p>Custom Strength is: {{passwordStrengthCustom}}</p>
```

```ts
 NOTE: For password handling you can use `ngModel`, `rxjs` etc.
```

## Usage `pwdWeightAnalyze` function
#### This is a TypeScript function that analyzes the strength of a password based on certain criteria and returns a score.
### Criterias
- If the password contains at least 3 digits
- If the password contains at least 2 symbols
- If the password contains both upper and lowercase letters
- If the password contains both letters and digits
- If the password contains both symbols and digits
- If the password contains both letters and symbols
- If the password consists only of letters or only of digits
```text
NOTE: These criteria can be changed by specifying `analyzerOptions` in `pwdWeightAnalyze` and `pwdWeightAnalyzeWithTitle` functions
```

| Key               | Type                       | Optional | Default value       |
|-------------------|----------------------------|----------|---------------------|
| `pwd`             | `string`                   | `no`     | `N/A`               |
| `minLength`       | `number`                   | `yes`    | `8`                 |
| `analyzerOptions` | `IPasswordAnalyzerOptions` | `yes`    | `default`           |
### Output value is `number` - password's complexity

## Usage `pwdWeightAnalyzeWithTitle` function
#### This is a TypeScript function that analyzes the strength of a password based on certain criteria and returns a score expressed in words.
### Criterias
- If the password weight is 0, then it is "empty"
- If the password weight is greater than 1 and less than 34, then it is "weak"
- If the password weight is greater than or equal to 35 and less than 67, then it is "good".
- If the password weight is greater than or equal to 68, then it is "excellent"
```text
NOTE: These criteria can be changed by specifying `options` in `pwdWeightAnalyzeWithTitle` function
```

| Key               | Type                         | Optional | Default value       |
|-------------------|------------------------------|----------|---------------------|
| `pwd`             | `string`                     | `no`     | `N/A`               |
| `minLength`       | `number`                     | `yes`    | `8`                 |
| `options`         | `IPasswordStrengthOptions[]` | `yes`    | `default`           |
| `analyzerOptions` | `IPasswordAnalyzerOptions`   | `yes`    | `default`           |
### Output value is `string` - password's complexity's title

## `IPasswordAnalyzerOptions` model

| Key                                       | Type      | Optional  | Default value |
|-------------------------------------------|-----------|-----------|---------------|
| `isActiveOptionCountDigits`               | `boolean` | `yes`     | `true`        |
| `isActiveOptionCountSpecialChars`         | `boolean` | `yes`     | `true`        |
| `isActiveOptionHasUpperCaseAndLowerCase`  | `boolean` | `yes`     | `true`        |
| `isActiveOptionHasLettersAndDigits`       | `boolean` | `yes`     | `true`        |
| `isActiveOptionHasSpecialCharsAndDigits`  | `boolean` | `yes`     | `true`        |
| `isActiveOptionHasLettersAndSpecialChars` | `boolean` | `yes`     | `true`        |
| `isActiveOptionIsAllLettersOrAllDigits`   | `boolean` | `yes`     | `true`        |

## `IPasswordStrengthOptions` model

| Key    | Type      | Optional | Default value  |
|--------|-----------|----------|----------------|
| `min`  | `boolean` | `yes`    | `N/A`          |
| `max`  | `boolean` | `yes`    | `N/A`          |
| `text` | `boolean` | `no`     | `N/A`          |

## Default model for `IPasswordStrengthOptions[]`
```ts
[
  { max: 0, text: 'empty' }, // don't remove it 
  { min: 1, max: 1, text: 'too short' }, // don't remove it 
  { min: 2, max: 34, text: 'weak' }, // your values
  { min: 35, max: 67, text: 'good' }, // your values
  { min: 68, text: 'excellent' }, // your values
]
```
```text
NOTE: For empty password IPasswordStrengthOptions should be with max = 0
```
```text
NOTE: For a password of insufficient length IPasswordStrengthOptions should be with min = 1 max = 1
```

## Examples
| Password                         | pwdWeightAnalyze | pwdWeightAnalyzeWithTitle | Description  |
|----------------------------------|------------------|---------------------------|--------------|
| `mz.5J#[t`                       | `97`             | `excellent`               |              |
| `PjCvz2Qf`                       | `27`             | `weak`                    |              |
| `p@$$word`                       | `16`             | `weak`                    |              |
| `1234567890`                     | `2`              | `weak`                    |              |
| `doggiesRcute!`                  | `46`             | `good`                    |              |
| `00000000000000000000000000000A` | `3`              | `weak`                    |              |
| `0`                              | `1`              | `too short`               | `minLen = 2` |
| `00`                             | `2`              | `weak`                    | `minLen = 2` |
| `000`                            | `2`              | `weak`                    | `minLen = 2` |
| `0000`                           | `2`              | `weak`                    | `minLen = 2` |
| `00000`                          | `2`              | `weak`                    | `minLen = 2` |
