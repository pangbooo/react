import { get } from '../get'

export function getInfoData(id) {
    const result = get('/api/detail/info/' + id)
    return result
}
