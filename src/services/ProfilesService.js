import { AppState } from '../AppState'
import { api } from "./AxiosService"
import { logger } from '../utils/Logger'


class ProfilesService {
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.profile = res.data
    logger.log('[ProfileServ: Get]', res.data)
  }

  async findProfile(query) {
    const res = await api.get(`api/profiles?query=${query}`)
    AppState.profiles = res.data
    logger.log('[ProfileServ: Find]', res.data)
  }
}

export const profilesService = new ProfilesService