import { DataBaseNotFoundException, HttpException } from "../../exceptions";
import { UserEntity } from "../../database-entities";
import { injectable } from "inversify";
import { HTTP_STATUS_CODES } from "../../constants";
import { Mutex } from "async-mutex";

const userMutexes = new Map<number, Mutex>();

@injectable()
export class UserService {
  private _userEntity: typeof UserEntity = UserEntity;

  private _getMutex(userId: number): Mutex {
    if (!userMutexes.has(userId)) {
      userMutexes.set(userId, new Mutex());
    }

    return userMutexes.get(userId);
  }

  private async _handleUserNotFound(userId: number) {
    const user = await this._userEntity.findOne({
      where: {
        userId,
      },
    });
    if (!user)
      throw new DataBaseNotFoundException(
        "",
        "users",
        JSON.stringify({ userId })
      );
    return user;
  }

  async increaseBalance(amount: number, userId: number) {
    const user = await this._handleUserNotFound(userId);
    const newBalance = Number(user.balance) + amount;

    const result = await this._userEntity.update(
      { balance: newBalance },
      {
        where: {
          userId,
          balance: user.balance, // Обновляем только ту запись, где баланс ещё не изменился на момент запроса
        },
      }
    );
    if (result[0] === 0)
      throw new HttpException(
        "Balance was modified by another request, please try again",
        HTTP_STATUS_CODES.CONFLICT
      );
    return {
      message: "Balance increased",
      newBalance,
    };
  }

  async reduceBalance(amount: number, userId: number) {
    const mutex = this._getMutex(userId);
    const release = await mutex.acquire();
    try {
      const user = await this._handleUserNotFound(userId);

      const newBalance = user.balance - amount;

      await this._userEntity.update(
        {
          balance: newBalance,
        },
        {
          where: {
            userId,
          },
        }
      );

      return {
        message: "OK",
        data: { newBalance },
      };
    } catch (error) {
      throw error;
    } finally {
      release();
    }
  }
}
