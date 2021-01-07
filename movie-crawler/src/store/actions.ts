export const SORT_BY_TITLE = '@@SortByTitle'
export const SORT_BY_YEAR = '@@SortByYear'
export const SEARCH_BY_VALUE = '@@SearchValue'
export const NEW_PAGE = '@@NewPage'
export const SELECTED_PAGE = '@@SelectedPage'
export const LOAD_DATA = '@@LoadData'

// make payload typed
export const sortByTitle = (payload: any) => ({
    type: SORT_BY_TITLE,
    payload
})

export const sortByYear = (payload: any) => ({
    type: SORT_BY_YEAR,
    payload
})

export const searchByValue = (payload: any) => ({
    type: SEARCH_BY_VALUE,
    payload
})

export const loadNewPage = (payload: any) => ({
    type: NEW_PAGE,
    payload
})

export const loadData = (payload: any) => ({
    type: LOAD_DATA,
    payload
})