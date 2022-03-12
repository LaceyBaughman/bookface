import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log('[PostsService:]', res.data)

    AppState.posts = res.data.posts
  }

  async createPost() {
    const res = await api.post('api/posts')
    logger.log('[PostServ: Create]', res.data)

    AppState.posts = res.data.posts
  }


}

export const postsService = new PostsService