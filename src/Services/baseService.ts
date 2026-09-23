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

  async findAll(options = {}) {
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