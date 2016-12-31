import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'react-redux-form';
import { Modal, Button } from 'react-bootstrap';
import {deleteTable} from '../../actions';

const DeleteTableForm = ({
  showDeleteTableForm,
  selectedDatabase,
  selectedTable,
  dbConnection,
  tableToDelete,
  onClose,
  onDelete
}) => {
  if(selectedTable) {
    // console.log({selectedDatabase})
    // console.log('the same?', tableToDelete === selectedTable.name, tableToDelete, selectedTable.name)
  }
  return (
    <Modal show={showDeleteTableForm} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <Field model="main.selectedTable.name">
              <label>Type in the name of the table to permanently delete it. This action cannot be undone.</label>
              <input className="form-control" id="name" type="text" />
            </Field>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} bsStyle="default" className="pull-left">Cancel</Button>
        <Button onClick={() => onDelete(dbConnection, selectedDatabase, tableToDelete, selectedTable.name)} bsStyle="primary" className="pull-right">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};


function mapStateToProps(state) {
  return {
    showDeleteTableForm: state.main.showDeleteTableForm,
    selectedDatabase: state.main.selectedDatabase,
    selectedTable: state.main.selectedTable,
    dbConnection: state.main.dbConnection,
    tableToDelete: state.main.tableToDelete
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch({
        type: "TOGGLE_DELETE_TABLE_FORM",
        showDeleteTableForm: false
      });
    },
    onDelete: (dbConnection, selectedDatabase, tableName, confirmName) => {
      if (tableName == confirmName){
        console.log('deleeeeeeting',dbConnection, selectedDatabase, tableName, confirmName)
        dispatch(deleteTable(dbConnection, selectedDatabase.name, tableName));
        dispatch({
          type: "TOGGLE_DELETE_TABLE_FORM",
          showDeleteTableForm: false,
          database: selectedDatabase,
          tableToDelete: tableName
        });
      }else{
        //show error
      }
    }
  }
};

const DeleteTableFormContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteTableForm);

export default DeleteTableFormContainer;