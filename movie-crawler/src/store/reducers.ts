import * as actions from './actions'
import { perItem } from '../app/MoviesList'

interface BaseState {
    appliedFilters: []
    movies: perItem[]
    filteredMovies: perItem[]
    currentCount: number
    lowerCount: number
}

const initialState: BaseState = {
    appliedFilters: [],
    movies: [],
    filteredMovies: [],
    currentCount: 0,
    lowerCount: 0
}

const mainReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case actions.LOAD_DATA:
            const filteredMovies = sortMyMovies(action.payload)
            let count = filteredMovies.length
            let countPerPage = 20
            return {
                ...state,
                movies: action.payload,
                filteredMovies: filteredMovies.slice(0, countPerPage),
                currentCount: countPerPage,
                lowerCount: 0
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
                    newState.filteredMovies = sortMyMovies(state.movies).slice(newState.lowerCount, newState.currentCount)
                }
            }
            return newState 

        case actions.SORT_BY_TITLE:
            let sortByTitle = {...state}
            let newfilteredMovies = [...state.filteredMovies]
            let sortedTitleArr = action.payload.filterBy === 'asc' ?
                newfilteredMovies.sort((a, b) => a['title'] > b['title'] ? 1 : -1) :
                newfilteredMovies.sort((a, b) => a['title'] > b['title'] ? -1 : 1)

                sortByTitle.filteredMovies = sortedTitleArr
                sortByTitle.appliedFilters = addFilterIfNotExists(actions.SORT_BY_TITLE, sortByTitle.appliedFilters)
                sortByTitle.appliedFilters = removeFilter(actions.SORT_BY_TITLE, sortByTitle.appliedFilters)

            return sortByTitle

        case actions.SORT_BY_YEAR:
            let sortByYear = {...state}
            let newfilteredMoviesByYear = [...state.filteredMovies]
            let sortedYearArr = action.payload.filterBy === 'asc' ?
                newfilteredMoviesByYear.sort((a, b) => a['releaseYear'] > b['releaseYear'] ? 1 : -1) :
                newfilteredMoviesByYear.sort((a, b) => a['releaseYear'] > b['releaseYear'] ? -1 : 1)

                sortByYear.filteredMovies = sortedYearArr
                sortByYear.appliedFilters = addFilterIfNotExists(actions.SORT_BY_YEAR, sortByYear.appliedFilters)
                sortByYear.appliedFilters = removeFilter(actions.SORT_BY_YEAR, sortByYear.appliedFilters)

            return sortByYear

        case actions.NEW_PAGE: 
            // get old state
            let oldState = {...state}
            if(action.payload.page === 1) {
                let upperCount = oldState.currentCount + 20
                let lowerCount = oldState.currentCount

                oldState.currentCount = upperCount
                oldState.lowerCount = lowerCount
                const newMovies = sortMyMovies(oldState.movies)
                oldState.filteredMovies = newMovies.slice(lowerCount, upperCount)
            }

            if(action.payload.page === -1) {
                let upperCount = oldState.currentCount - 20
                let lowerCount = oldState.lowerCount - 20

                oldState.currentCount = upperCount
                const newMovies = sortMyMovies(oldState.movies)
                oldState.filteredMovies = newMovies.slice(lowerCount, upperCount)
            }
            return oldState

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