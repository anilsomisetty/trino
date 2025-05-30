import React, { useState, useEffect } from 'react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const onSortChanged = (api, column, setSortState) => {
    if (api && column) {
        const columnStates = api.getColumnState()
        const columnState = columnStates.find((state) => state.colId === column.colId)
        if (columnState) {
            const currentSort = columnState.sort
            let newSort = null

            switch (currentSort) {
                case 'asc':
                    newSort = 'desc'
                    break
                case 'desc':
                    newSort = null // No sort
                    break
                default:
                    newSort = 'asc'
            }

            const newColumnStates = columnStates.map((colState) => ({
                colId: colState.colId,
                sort: colState.colId === column.getColId() ? newSort : null,
            }))

            api.applyColumnState({ state: newColumnStates })

            setSortState(newSort)
        }
    }
}

const useSortState = (api, column) => {
    const [sortState, setSortState] = useState(column.sort)

    useEffect(() => {
        const updateSortState = () => setSortState(column.sort)
        api.addEventListener('sortChanged', updateSortState)
        return () => api.removeEventListener('sortChanged', updateSortState)
    }, [api, column])

    return [sortState, setSortState]
}

const PauseIconHeader = (props) => {
    const { api, column } = props
    const [sortState, setSortState] = useSortState(api, column)

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onSortChanged(api, column, setSortState)}
            title="Pending splits"
        >
            <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
            {sortState === 'asc' && <span className="ag-icon ag-icon-asc" unselectable="on" role="presentation" />}
            {sortState === 'desc' && <span className="ag-icon ag-icon-desc" unselectable="on" role="presentation" />}
        </div>
    )
}

const PlayIconHeader = (props) => {
    const { api, column } = props
    const [sortState, setSortState] = useSortState(api, column)

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onSortChanged(api, column, setSortState)}
            title="Running splits"
        >
            <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
            {sortState === 'asc' && <span className="ag-icon ag-icon-asc" unselectable="on" role="presentation" />}
            {sortState === 'desc' && <span className="ag-icon ag-icon-desc" unselectable="on" role="presentation" />}
        </div>
    )
}

const BookmarkIconHeader = (props) => {
    const { api, column } = props
    const [sortState, setSortState] = useSortState(api, column)

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onSortChanged(api, column, setSortState)}
            title="Blocked splits"
        >
            <span className="glyphicon glyphicon-bookmark" aria-hidden="true"></span>
            {sortState === 'asc' && <span className="ag-icon ag-icon-asc" unselectable="on" role="presentation" />}
            {sortState === 'desc' && <span className="ag-icon ag-icon-desc" unselectable="on" role="presentation" />}
        </div>
    )
}

const OkIconHeader = (props) => {
    const { api, column } = props
    const [sortState, setSortState] = useSortState(api, column)

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onSortChanged(api, column, setSortState)}
            title="Completed splits"
        >
            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            {sortState === 'asc' && <span className="ag-icon ag-icon-asc" unselectable="on" role="presentation" />}
            {sortState === 'desc' && <span className="ag-icon ag-icon-desc" unselectable="on" role="presentation" />}
        </div>
    )
}

export { PauseIconHeader, PlayIconHeader, BookmarkIconHeader, OkIconHeader }
