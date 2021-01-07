import * as actions from './actions'
import { perItem } from '../app/MoviesList'

interface BaseState {
    appliedFilters: []
    movies: perItem[]
    filteredMovies: perItem[]
}

const initialState: BaseState = {
    appliedFilters: [],
    movies: [],
    filteredMovies: []
}

const mainReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case actions.LOAD_DATA:
            const filteredMovies = sortMyMovies(action.payload)
            return {
                ...state,
                movies: action.payload,
                filteredMovies
            }

        case actions.SEARCH_BY_VALUE:
            let newState = {...state}
            let value = action.payload
            let filteredValues = state.movies.filter(item => {
                return item.title.toLowerCase().includes(value)
            })

            let appliedFilters = state.appliedFilters

            if (value) {
                appliedFilters = addFilterIfNotExists(actions.SEARCH_BY_VALUE, appliedFilters)
                newState.filteredMovies = filteredValues

            } else {
                appliedFilters = removeFilter(actions.SEARCH_BY_VALUE, appliedFilters)

                if (appliedFilters.length === 0) {
                    newState.filteredMovies = sortMyMovies(state.movies)
                }
            }
            return newState 
        default:
            return state

    }
}

export default mainReducer


const addFilterIfNotExists = (filter: any, appliedFilters: any) => {
    let index = appliedFilters.indexOf(filter)
    if (index===-1) appliedFilters.push(filter)

    return appliedFilters
}

const removeFilter = (filter: any, appliedFilters: any) => {
    let index = appliedFilters.indexOf(filter)
    appliedFilters.splice(index, 1)
    return appliedFilters
}

const sortMyMovies = (data: perItem[]) => {
    let filteredMovies = data.filter( (movie: any) => movie.releaseYear >= 2010)
    const sortAlphaNum = (a: any, b: any) => a.title.toString().localeCompare(b.title, 'en', { numeric: true })
    return filteredMovies.sort(sortAlphaNum)
}