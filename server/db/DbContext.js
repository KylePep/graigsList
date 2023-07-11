import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { HousesSchema } from "../models/Houses.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Houses = mongoose.model('House', HousesSchema);
}

export const dbContext = new DbContext()
