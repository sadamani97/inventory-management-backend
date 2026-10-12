// src/services/base/base.service.ts

import { Op } from "sequelize";
import type {ModelStatic} from "sequelize"

export class BaseService<T extends { [key: string]: any }> {
  constructor(
    protected model: ModelStatic<any>,
    protected idField: string,
    protected uniqueField?: string,
    protected entityName = "Record"
  ) {}

  async create(data: T) {
    if (this.uniqueField) {
      const exists = await this.model.findOne({
        where: {
          [this.uniqueField]: data[this.uniqueField],
        },
      });

      if (exists) {
        throw new Error(`${this.entityName} already exists`);
      }
    }

    return await this.model.create(data);
  }

  async findAll(options: any = {}) {
    const { page, limit, ...otherOptions } = options;
    if (page !== undefined && limit !== undefined && !isNaN(page) && !isNaN(limit)) {
      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, parseInt(limit, 10));
      const offset = (pageNum - 1) * limitNum;

      const { count, rows } = await this.model.findAndCountAll({
        ...otherOptions,
        limit: limitNum,
        offset,
        distinct: true,
      });

      return { count, rows };
    }

    return await this.model.findAll(options);
  }

  async FindById(id: number, options = {}) {
    const item = await this.model.findByPk(id, options);

    if (!item) {
      throw new Error(`${this.entityName} not found`);
    }

    return item;
  }

  async Update(id: number, data: T) {
    const item = await this.model.findByPk(id);

    if (!item) {
      throw new Error(`${this.entityName} not found`);
    }

    if (this.uniqueField) {
      const exists = await this.model.findOne({
        where: {
          [this.uniqueField]: data[this.uniqueField],
          [this.idField]: {
            [Op.ne]: id,
          },
        },
      });

      if (exists) {
        throw new Error(`${this.entityName} already exists`);
      }
    }

    await item.update(data);

    return item;
  }

  async Delete(id: number) {
    const item = await this.model.findByPk(id);

    if (!item) {
      throw new Error(`${this.entityName} not found`);
    }

    await item.destroy();

    return true;
  }
}