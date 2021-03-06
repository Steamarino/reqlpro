import React from 'react';
import classNames from 'classnames';
import ExplorerPagination from './ExplorerPagination';
import ace from 'brace';
import { connect } from "react-redux";
import { saveRow, queryTable } from '../../../actions';


const ExplorerFooter = ({
  dbConnection,
  table,
  onCancelClick,
  prevPage,
  nextPage,
  prevPageBetween,
  nextPageBetween,
  save
}) => {

  let footerBody = (
    <div className="text-center">
      <ExplorerPagination
        prevPage={prevPage}
        nextPage={nextPage}
        dbConnection={dbConnection}
        table={table}/>
    </div>
  );

  if (table.view.current === 'code') {
    footerBody = (
      <div className="not-text-center pull-right">
        <span className="btn btn-default" onClick={onCancelClick} style={{ marginRight: '10px' }}>Cancel</span>
        <span className="btn btn-primary" onClick={() => save(dbConnection, table)}>Save</span>
      </div>
    );
  } else if (table.queryError) {
    footerBody = '';
  } else if (!table.data.length) {
    footerBody = '';
  }

  return (
    <div className="explorer-footer">
      {footerBody}
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    table: state.selectedTable,
    dbConnection: state.main.dbConnection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCancelClick: () => {
      dispatch({
        type: 'CANCEL_ROW_EDIT'
      });
    },
    prevPage: function(dbConnection, table) {
      const query = {
        filterPredicate: table.query.filterPredicate,
        orderByPredicate: table.query.orderByPredicate,
        limit: table.query.limit,
        page: table.query.page - 1
      };

      dispatch(queryTable(dbConnection, table.databaseName, table.name, query));
    },
    nextPage: function(dbConnection, table) {
      const query = {
        filterPredicate: table.query.filterPredicate,
        orderByPredicate: table.query.orderByPredicate,
        limit: table.query.limit,
        page: table.query.page + 1
      };

      dispatch(queryTable(dbConnection, table.databaseName, table.name, query));

    },
    prevPageBetween: function() {
      const index = this.props.table.query.index;
      const end = this.props.table.data[0].name;
      this.props.store.query({ index, end });
    },
    nextPageBetween: function() {
      const index = this.props.table.query.index;
      const start = this.props.table.data[this.props.table.data.length - 1].name;
      this.props.store.query({ index, start });
    },
    save: function(dbConnection, selectedTable) {
      const editor = ace.edit("editor");
      let string = editor.getValue();

      // Allows new Date() to be entered on edit view
      // string = string.replace('new Date()', '"' + new Date() + '"');
      dispatch(saveRow(dbConnection, selectedTable, string));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerFooter);
