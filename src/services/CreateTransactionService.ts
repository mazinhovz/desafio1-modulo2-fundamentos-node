import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw Error('Saldo insuficiente');
    }
    const transaction = this.transactionsRepository.create({
      type,
      value,
      title,
    });
    return transaction;
  }
}

export default CreateTransactionService;
