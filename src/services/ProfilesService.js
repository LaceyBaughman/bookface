import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
  async getProfile(id) {
    const res = await api.get(`api/profiles` + id)
    AppState.profile = res.data
    logger.log('[ProfileServe: Get', res.data)
  }

  async getProfilePosts(creatorId) {
    const res = await api.get(`api/posts` + creatorId)
    logger.log(res.data.posts)
    AppState.profilePosts = res.data.posts
    AppState.totalPages = res.data.totalPages
  }
}

export const profilesService = new ProfilesService()