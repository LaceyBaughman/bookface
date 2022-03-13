import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class SquaresService {
  async getSquares() {
    const res = await api.get('api/ads')
    logger.log('[BillsService:]', res.data)

    AppState.squares = res.data
  }

}

export const squaresService = new SquaresService