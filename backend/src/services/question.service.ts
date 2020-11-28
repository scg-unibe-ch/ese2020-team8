import { Answer } from '../models/answer.model';
import { ProductAttributes, Product} from '../models/product.model';
import { Question } from '../models/question.model';

class QuestionService {
  transporter: any;

  constructor() {}

  public async get(questionId: string) {
    return Question.findOne({
      where: {
        id: questionId,
      },
      include: Answer as any
    });
  }

  async getProductQuestions(productId: string) {
    return Question.findAll({
      where: {
        ProductId: productId
      },
      include: Answer as any
    });
  }

  async addQuestion(userId: number, productId: number, text: string) {
    return Question.create({
        UserId: userId,
        ProductId: productId,
        text,
    });
}
}

export const questionService = new QuestionService();
