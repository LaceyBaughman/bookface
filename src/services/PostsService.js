import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log('[PostsService:]', res.data)
    AppState.posts = res.data
  }


}

export const postsService = new PostsService