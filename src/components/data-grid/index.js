import React from 'react';
import './data-grid.css';
import { useDebouncedCallback } from 'use-debounce';

export default function DataGrid(props) {
  const [filteredRows, setFilteredRows] = React.useState(() => props.rows);

  const getColumnHeader = (column) => {
    return <th key={column.field}>{column.header}</th>;
  };

  const getCellValue = (row, column) => {
    const value = row[column.field];
    if (column.type === 'date') {
      return value.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
    }
    return value;
  };

  const getCell = (row, column) => {
    return (
      <td key={column.field}>
        {column.prefix ? (
          <>
            {column.prefix} {String(getCellValue(row, column))}
          </>
        ) : (
          String(getCellValue(row, column))
        )}
      </td>
    );
  };

  const getRow = (row) => {
    return <tr key={row.id}>{props.columns.map((column) => getCell(row, column))}</tr>;
  };

  const onSearch = useDebouncedCallback((event) => {
    const search = event.target.value;

    if (!search) {
      setFilteredRows(props.rows);
      return;
    }

    const lowerSearch = search.toLowerCase();
    const filtered = props.rows.filter((row) => {
      return props.columns.some((column) => {
        const value = String(row[column.field]).toLowerCase();
        return value.includes(lowerSearch);
      });
    });

    setFilteredRows(filtered);
  }, 600);

  return (
    <div className='isi-datagrid-container shadow-md'>
      <div className='isi-datagrid-toolbar'>
        <div className='isi-datagrid-search'>
          <input type='text' placeholder='Search...' onChange={onSearch} />
        </div>
        <div className='isi-datagrid-toolbar-items'>{props.toolbar}</div>
      </div>
      <table>
        <thead>
          <tr>{props.columns.map(getColumnHeader)}</tr>
        </thead>
        <tbody>{filteredRows.map(getRow)}</tbody>
      </table>
    </div>
  );
}
