## Setting up in `module's imports`
```ts
AngularPasswordStrengthAnalyzerModule
```

## Usage `Password analyzer` in `ts`
```ts
import {pwdWeightAnalyze, pwdWeightAnalyzeWithTitle} from "angular-password-strength-analyzer";

...

public password: string | null | undefined;
public passwordWeight: number | null | undefined;
public passwordStrength: string | null | undefined;
public passwordStrengthCustom: string | null | undefined;
public passwordWeightCustom: number | null | undefined;

...

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

## Usage `pwdWeightAnalyze` function

| Key               | Type                       | Optional | Default value       |
|-------------------|----------------------------|----------|---------------------|
| `pwd`             | `string`                   | `no`     | `N/A`               |
| `minLength`       | `number`                   | `yes`    | `8`                 |
| `analyzerOptions` | `IPasswordAnalyzerOptions` | `yes`    | `default`           |

## Usage `pwdWeightAnalyzeWithTitle` function

| Key               | Type                         | Optional | Default value       |
|-------------------|------------------------------|----------|---------------------|
| `pwd`             | `string`                     | `no`     | `N/A`               |
| `minLength`       | `number`                     | `yes`    | `8`                 |
| `options`         | `IPasswordStrengthOptions[]` | `yes`    | `default`           |
| `analyzerOptions` | `IPasswordAnalyzerOptions`   | `yes`    | `default`           |

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
    { max: 0, text: 'empty' },
    { min: 1, max: 34, text: 'weak' },
    { min: 35, max: 67, text: 'good' },
    { min: 68, text: 'excellent' },
  ]
```



## About
For password handling you can use ngModel, rxjs etc.
