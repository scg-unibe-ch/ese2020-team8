import { Request, Response, NextFunction } from 'express';

export function checkPasswordStrength(req: Request, res: Response, next: NextFunction) {
  const password = req.body.password;

  const upperCaseCharacters = /[A-Z]+/g;
  const lowerCaseCharacters = /[a-z]+/g;
  const numberCharacters = /[0-9]+/g;
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (
    upperCaseCharacters.test(password) === false ||
    lowerCaseCharacters.test(password) === false ||
    numberCharacters.test(password) === false ||
    specialCharacters.test(password) === false
  ) {
    res.status(400).send({
      passwordStrength:
        'Password must contain at least two of the following:' +
        ' numbers, lowercase letters, uppercase letters, or special characters.',
    });
  } else {
    next();
  }
}
