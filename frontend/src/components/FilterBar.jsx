import React from 'react';
export default function FilterBar({ status, setStatus }) {
    return (
      <div className="filter-bar">
        {['All', 'Active', 'Completed'].map(s => (
          <button
            key={s}
            className={status === s ? 'active' : ''}
            onClick={() => setStatus(s)}
          >{s}</button>
        ))}
      </div>
    );
  }
  