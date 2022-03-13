import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class SquaresService {
  async getSquares() {
    const res = await api.get('api/ads')
    AppState.squares = res.data
    logger.log('[BillsService:]', res.data)
  }

}

export const squaresService = new SquaresService