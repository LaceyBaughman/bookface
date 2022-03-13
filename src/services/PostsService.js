import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log('[PostsService:]', res.data)

    AppState.posts = res.data.posts
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async createPost(data) {
    const res = await api.post('api/posts', data)
    logger.log('[PostServ: Create]', res.data)

    AppState.posts.unshift(res.data)
  }

  async like(id) {
    const posts = AppState.posts
    const res = await api.post(`api/posts/${id}/like`)
    const index = posts.findIndex(p => p.id == res.data.id)
    posts.splice(index, 1, res.data)
    // find post by id, find index, splice and replace with new
    // logger.log('like: ', res.data)
  }


}

export const postsService = new PostsService