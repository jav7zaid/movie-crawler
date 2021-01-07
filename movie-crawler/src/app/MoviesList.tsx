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
    movieList: [perItem]
}

export interface DispatchProps {
    loadData: (data: []) => void
    searchByValue: (data: string) => void
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
        } else if( input.length == 0) {
            this.props.searchByValue(input)
        }
    }

    render() {
        return (
            <div className='App'>
                <section className='section'>
                    <div className='container'>
                        <div className='row container' style={{flexWrap: 'wrap'}}>
                            {
                                this.props.movieList.map(item => (
                                    <div className=''>
                                        <div className='tile is-child box'>
                                            <p>
                                                {item.title}
                                            </p>
                                            <p>
                                                <img src ={item.images['Poster Art'].url} style={{'height' : '50px', 'width' : '50px'}}></img>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export const  mapStateToProps  = (state: any) : StateProps => {
    return {
        movieList : state.filteredMovies
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return {
        loadData: (data: {}): void => {
            dispatch(actions.loadData(data))
        },
        searchByValue: (data: string): void => {
            dispatch(actions.searchByValue(data))
        }
    }
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(MoviesList)
