import {pwdWeightAnalyze, pwdWeightAnalyzeWithTitle} from "./password.helper";
import {passwordWeightDefaultText} from "./data.helper";

describe('pwdWeightAnalyze function', () => {

  const testData: { id: number, pwd: string, expected: number, expectedTitle: string, minLen?: number }[] = [
    { id: 1, pwd: 'mz.5J#[t', expected: 97, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 2, pwd: 'PjCvz2Qf', expected: 27, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 3, pwd: 'p@$$word', expected: 16, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 4, pwd: 'qwertyuiop', expected: 1, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 5, pwd: '1234567890', expected: 1, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 6, pwd: 'PaSsWoRd123', expected: 49, expectedTitle: passwordWeightDefaultText.good, },
    { id: 7, pwd: 'doggiesRcute!', expected: 46, expectedTitle: passwordWeightDefaultText.good, },
    { id: 8, pwd: 'n0Tsecure', expected: 31, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 9, pwd: 'sTRaNg3Pa$$', expected: 100, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 10, pwd: 'password123', expected: 28, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 11, pwd: 'H3llo!W0rld', expected: 98, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 12, pwd: 'h1dden!treasur3', expected: 94, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 13, pwd: 'abcdefg123!', expected: 89, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 14, pwd: '1qaz@WSX', expected: 87, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 15, pwd: 'C00kieM0nster', expected: 56, expectedTitle: passwordWeightDefaultText.good, },
    { id: 16, pwd: 'p@$$word123', expected: 98, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 17, pwd: 'password1', expected: 10, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 18, pwd: '8ALPHAdogs', expected: 35, expectedTitle: passwordWeightDefaultText.good, },
    { id: 19, pwd: '1q2w3e4r5t', expected: 25, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 20, pwd: 'sEcuriTyR0cks!', expected: 100, expectedTitle: passwordWeightDefaultText.excellent, },
    { id: 21, pwd: 'passssasssss', expected: 1, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 22, pwd: '', expected: 0, expectedTitle: passwordWeightDefaultText.empty, },
    { id: 23, pwd: '123', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 24, pwd: '00000000000000000000000000000A', expected: 3, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 25, pwd: '0', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 26, pwd: '00', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 27, pwd: '000', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 28, pwd: '0000', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 29, pwd: '00000', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 30, pwd: '000000', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 31, pwd: '0000000', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
    { id: 32, pwd: '00000000', expected: 1, minLen: 2, expectedTitle: passwordWeightDefaultText.weak, },
  ];

  it('All data IDs are unique', () => {
    const nonUniqueObjects = testData.filter((obj, index, array) => {
      return array.findIndex(o => o.id === obj.id) !== index;
    });

    const nonUniqueIds = nonUniqueObjects.map(obj => obj.id);
    // if (nonUniqueObjects.length > 0) {
    //   console.log(`phone-format-pipe IDs ${nonUniqueIds.join(', ')} are not unique.`);
    // }

    expect(nonUniqueIds.length === 0).toBeTrue();
  });

  testData.forEach((item ,index) => {
    let message = `Test ID:password-helper-${item.id} check password ${item.pwd} with complexity ${item.expected} and min length ${item.minLen ?? '8'} should be ${item.expectedTitle}`;
    it(message, () => {
      expect(pwdWeightAnalyze(item.pwd, item.minLen ?? 8)).toEqual(item.expected);
      // console.log(`PASSED: ${message}`);
    });

    it(message, () => {
      expect(pwdWeightAnalyzeWithTitle(item.pwd, item.minLen ?? 8)).toEqual(item.expectedTitle);
      // console.log(`PASSED: ${message}`);
    });
  });
});
