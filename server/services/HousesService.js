import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
  async getHouses() {
    const houses = await dbContext.Houses.find()
    return houses
  }
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) {
      throw new BadRequest(`No house found with id:${houseId}`)
    }
    return house
  }
  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)

    return house
  }
  async removeHouse(houseId, userId) {
    const houseToDelete = await this.getHouseById(houseId)
    if (houseToDelete.creatorId.toString() != userId) {
      throw new Forbidden(`YOU CANNOT DELETE THIS HOUSE ${houseToDelete.name}`)
    }
    await houseToDelete.remove()
  }

  async updateHouse(houseId, houseData, userId) {
    const houseToUpdate = await this.getHouseById(houseId)
    if (houseToUpdate.creatorId.toString() != userId) {
      throw new Forbidden(`YOU CANNOT CHANGE THIS HOUSE ${houseToUpdate.name}`)
    }

    houseToUpdate.name = houseData.name || houseToUpdate.name
    houseToUpdate.price = houseData.price || houseToUpdate.price
    houseToUpdate.bedrooms = houseData.bedrooms || houseToUpdate.bedrooms
    houseToUpdate.bathrooms = houseData.bathrooms || houseToUpdate.bathrooms

    await houseToUpdate.save()

    return houseToUpdate

  }

}
export const housesService = new HousesService()