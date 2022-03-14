import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"


class PostsService {
  async getAllPosts(query = {}) {
    const res = await api.get('api/posts', { params: query })
    logger.log('[PostsService:]', res.data)

    AppState.posts = res.data.posts
    // AppState.posts = res.data.posts.map(p => new Post(p))
  }



  async createPost(data) {
    const res = await api.post('api/posts', data)
    AppState.posts.unshift(res.data)
    // logger.log('[PostServ: Create]', res.data)
  }

  async deletePost(id) {
    const yes = await Pop.confirm('Are you sure you want to delete this masterpiece?')
    if (!yes) { return }
    const res = await api.delete('api/posts/' + id)
    AppState.posts = AppState.posts.filter(p => p.id !== id)
    logger.log('[PostServe: Delete', res.data)
  }
  async like(id) {
    const posts = AppState.posts
    const res = await api.post(`api/posts/${id}/like`)
    const index = posts.findIndex(p => p.id == res.data.id)
    posts.splice(index, 1, res.data)
    // logger.log('[PostServe: Like]', res.data)
  }
  async getPages(data) {
    const res = await api.get(data)
    AppState.posts = res.data
    logger.log('[PostServ: Get Pages]', res.data)
  }
}

export const postsService = new PostsService