interface MathProblem {
  num1: number;
  num2: number;
  operator: '+' | '-' | '×' | '÷';
  answer: number;
}

export function generateMathProblem(): MathProblem {
  const operators: ('+' | '-' | '×' | '÷')[] = ['+', '-', '×', '÷'];
  const operator = operators[globalThis.Math.floor(globalThis.Math.random() * operators.length)];
  let num1: number, num2: number, answer: number;

  switch (operator) {
    case '+':
      num1 = globalThis.Math.floor(globalThis.Math.random() * 100) + 1;
      num2 = globalThis.Math.floor(globalThis.Math.random() * 100) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = globalThis.Math.floor(globalThis.Math.random() * 100) + 1;
      num2 = globalThis.Math.floor(globalThis.Math.random() * num1) + 1;
      answer = num1 - num2;
      break;
    case '×':
      num1 = globalThis.Math.floor(globalThis.Math.random() * 12) + 1;
      num2 = globalThis.Math.floor(globalThis.Math.random() * 12) + 1;
      answer = num1 * num2;
      break;
    case '÷':
      num2 = globalThis.Math.floor(globalThis.Math.random() * 12) + 1;
      answer = globalThis.Math.floor(globalThis.Math.random() * 12) + 1;
      num1 = num2 * answer;
      break;
  }

  return { num1, num2, operator, answer };
}