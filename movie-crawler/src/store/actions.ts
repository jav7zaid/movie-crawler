export const SORT_BY_PROGRAM_TYPE = '@@ProgramType'
export const SEARCH_BY_VALUE = '@@SearchValue'
export const NEW_PAGE = '@@NewPage'
export const LOAD_DATA = '@@LoadData'

// make payload typed
export const sortByProgram = (payload: any) => ({
    type: SORT_BY_PROGRAM_TYPE,
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