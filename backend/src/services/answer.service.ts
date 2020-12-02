import { Answer } from '../models/answer.model';

class AnswerService {
  transporter: any;

  constructor() {}

  async addAnswer(userId: number, questionId: number, text: string) {
      return Answer.create({
          UserId: userId,
          QuestionId: questionId,
          text,
      });
  }
}

export const answerService = new AnswerService();
