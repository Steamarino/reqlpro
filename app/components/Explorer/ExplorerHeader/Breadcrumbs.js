import React, { PropTypes } from 'react';

const Breadcrumbs = ({ connection, table }) => {

  const userCrumb = <span><span className="crumb-icon"><i className="fa fa-user"/></span> {connection.user || 'admin'} </span>;
  const dbCrumb = <span><span className="crumb-icon"><i className="fa fa-database"/></span> {table.databaseName} </span>;
  const tableCrumb = <span><span className="crumb-icon"><i className="fa fa-table"/></span> {table.name} </span>;

  let actionCrumb;
  if (table.view.current === 'code') {
    if (table.codeAction === 'update') {
      actionCrumb = <span><span className="crumb-icon"><i className="fa fa-angle-right"/></span> Edit (Replace)</span>;
    }
    if (table.codeAction === 'add') {
      actionCrumb = <span><span className="crumb-icon"><i className="fa fa-angle-right"/></span> Insert</span>;
    }
  }

  return (
    <div className="breadcrumb-text-container">
      {userCrumb}
      <span className="crumb-icon"><i className="fa fa-angle-right"/></span>
      {dbCrumb}
      <span className="crumb-icon"><i className="fa fa-angle-right"/></span>
      {tableCrumb}
      {actionCrumb}
    </div>
  );
};

Breadcrumbs.propTypes = {
  database: PropTypes.object,
  table: PropTypes.object
};

export default Breadcrumbs;
