import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import * as actions from '../store/actions'

const rawData = require('../store/movies.json')

export interface perItem {
    description: string
    images: any
    programType: string
    releaseYear: number
    title: string
}

export interface productList {
    appliedFilters: []
    movies: [perItem]
    filteredMovies: [perItem]
}
export interface StateProps {
    movieList: [perItem],
    pages: [],
    currentPage: any
}

export interface DispatchProps {
    loadData: (data: []) => void
    searchByValue: (data: string) => void
    sortByTitle: (data: {}) => void
    sortByYear: (data: {}) => void
    loadNewPage: (data: any) => void
}

export interface MovieListProps extends StateProps, DispatchProps { }


class MoviesList extends Component<MovieListProps, {}> {

    componentDidMount() {
        this.props.loadData(rawData.entries)
    }

    searchByInput = (e: any) => {
        let input = e.target.value.toString()
        if( input.length > 3 ){
            this.props.searchByValue(input)
        } else if( input.length === 0) {
            this.props.searchByValue(input)
        }
    }

    sortByFilter = (e: any) => {
        let value = e.target.value;
        let filterBy = value.endsWith('asc') ? 'asc' : 'desc'

        if (value.startsWith('title')){
            this.props.sortByTitle({filterBy})
        }else {
            this.props.sortByYear({filterBy})
        }
    }

    nextPage() {
        this.props.loadNewPage({page: 1})
    }

    previousPage() {
        this.props.loadNewPage({page: -1})
    }

    render() {
        return (
            <div className='App'>
                <section className='section-sort'>
                            <div className='sort-container'>
                                    <div className='select'>
                                        <select onChange={e => { this.sortByFilter(e)}}>
                                            <option value='' disabled selected>Sort by</option>
                                            <option value='releaseYear_desc'>ReleaseYear - Last to First</option>
                                            <option value='releaseYear_asc'>ReleaseYear - First to Last</option>
                                            <option value='title_desc'>Title - Z-A</option>
                                            <option value='title_asc'>Title - A-Z</option>

                                        </select>
                                    </div>
                                <div className='control' style={{minWidth: '300px'}}>
                                    <input onChange={e => {this.searchByInput(e)}} placeholder='Search Movies & Shows' type='text'/>
                                </div>
                            </div>
                        <div className='movie-container'>
                            {
                                this.props.movieList.map((item,index) => (
                                    <div className='box' key={index}>
                                            <h2>
                                                {item.title}
                                            </h2>
                                            <p>
                                                <img src ={item.images['Poster Art'].url} alt={item.title} ></img>
                                            </p>
                                    </div>
                                ))
                            }
                        </div>
                </section>
                <section className='section-paging'>
                    <div className='container-page'>
                        <nav className='pagination' role='navigation' aria-label='pagination'>
                            <button className='button pagination-previous' onClick={() => {
                                this.previousPage()
                            }}>Previous
                            </button>
                            <button className='button pagination-next' onClick={() => {
                                this.nextPage()
                            }}>Next page
                            </button>
                        </nav>

                    </div>
                </section>
            </div>

        )
    }
}

export const  mapStateToProps  = (state: any) : StateProps => {
    return {
        movieList : state.filteredMovies,
        pages : state.filteredPages,
        currentPage : state.currentPage
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return {
        loadData: (data: {}): void => {
            dispatch(actions.loadData(data))
        },
        searchByValue: (data: string): void => {
            dispatch(actions.searchByValue(data))
        },
        sortByTitle: (data: {}): void => {
            dispatch(actions.sortByTitle(data))
        },
        sortByYear: (data: {}): void => {
            dispatch(actions.sortByYear(data))
        },
        loadNewPage: (data: any): void => {
            dispatch(actions.loadNewPage(data))
        }
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(MoviesList)
