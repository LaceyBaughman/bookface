class SquaresService {
  async getSquares() {
    const res = await api.get('api/ads')
    logger.log('[BillsService:]', res.data)

    AppState.squares = res.data
  }

}

export const squaresService = new SquaresService