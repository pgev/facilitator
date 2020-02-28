// Copyright 2020 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  DataTypes, Model, InitOptions,
} from 'sequelize';
import assert from 'assert';
import BigNumber from 'bignumber.js';
import Subject from '../../common/observer/Subject';
import Transaction from '../models/Transaction';
import Utils from '../../common/Utils';

/**
 * An interface, that represents an each row of TransactionRepository.
 */
class TransactionModel extends Model {
  public readonly avatarAccount!: string;

  public readonly gas!: BigNumber;

  public readonly rawTx!: string;

  public readonly id!: BigNumber;

  public readonly transactionHash!: string;

  public readonly nonce!: BigNumber;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

/**
 * Stores instance of Transaction.
 *
 * Class enables creation, update and retrieval of Transaction objects.
 * On construction it initializes underlying sequelize model.
 */
export default class TransactionRepository extends Subject<Transaction> {
  /* Public Functions */

  public constructor(initOptions: InitOptions) {
    super();

    TransactionModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        transactionHash: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        rawTx: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatarAccount: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gas: {
          type: DataTypes.DECIMAL(78),
          allowNull: false,
        },
        nonce: {
          type: DataTypes.DECIMAL(78),
          allowNull: false,
        },
      },
      {
        ...initOptions,
        modelName: 'Transaction',
        tableName: 'transactions',
      },
    );
  }

  /**
   * Create/update transaction model in database.
   *
   * @param transaction Transaction model object.
   */
  public async save(transaction: Transaction): Promise<Transaction> {
    let savedTransaction: Transaction | null;
    if (transaction.id && transaction.id.gt(0)) {
      const definedOwnProps: string[] = Utils.getDefinedOwnProps(transaction);
      await TransactionModel.update(
        transaction,
        {
          where: {
            id: transaction.id.toNumber(),
          },
          fields: definedOwnProps,
        },
      );
      savedTransaction = await this.get(
        transaction.id,
      );
    } else {
      savedTransaction = this.convertToTransaction(await TransactionModel.create(
        transaction,
      ));
    }

    assert(
      savedTransaction !== null,
      `Updated transaction record not found for id: ${transaction.id}`,
    );

    return savedTransaction as Transaction;
  }

  /**
   * Fetches transaction based on id.
   *
   * @param id Unique auto increment transaction id.
   */
  public async get(id: BigNumber): Promise<Transaction | null> {
    const transactionModel = await TransactionModel.findOne({
      where: {
        id: id.toNumber(),
      },
    });

    if (transactionModel === null) {
      return null;
    }

    return this.convertToTransaction(transactionModel);
  }


  /** Private Functions */

  // eslint-disable-next-line class-methods-use-this
  private convertToTransaction(transactionModel: TransactionModel): Transaction {
    return new Transaction(
      transactionModel.avatarAccount,
      transactionModel.gas,
      transactionModel.rawTx,
      transactionModel.id ? new BigNumber(transactionModel.id) : transactionModel.id,
      transactionModel.transactionHash,
      transactionModel.nonce ? new BigNumber(transactionModel.nonce) : transactionModel.nonce,
      transactionModel.createdAt,
      transactionModel.updatedAt,
    );
  }
}
