import { useState } from 'react';
import './EntryManager.css';

const EntryManager = ({ entries, onEntriesChange, colors, onColorsChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);

  const handleAddEntry = () => {
    if (inputValue.trim()) {
      onEntriesChange([...entries, { id: Date.now(), name: inputValue.trim() }]);
      setInputValue('');
    }
  };

  const handleBulkAdd = () => {
    const names = bulkInput
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length > 0) {
      const newEntries = names.map(name => ({
        id: Date.now() + Math.random(),
        name
      }));
      onEntriesChange([...entries, ...newEntries]);
      setBulkInput('');
      setShowBulkAdd(false);
    }
  };

  const handleRemoveEntry = (id) => {
    onEntriesChange(entries.filter(entry => entry.id !== id));
  };

  const handleEditEntry = (id, newName) => {
    onEntriesChange(
      entries.map(entry =>
        entry.id === id ? { ...entry, name: newName } : entry
      )
    );
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all entries?')) {
      onEntriesChange([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddEntry();
    }
  };

  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    onColorsChange(newColors);
  };

  return (
    <div className="entry-manager">
      <div className="entry-header">
        <h2>Entries ({entries.length})</h2>
        <div className="entry-actions">
          <button onClick={() => setShowBulkAdd(!showBulkAdd)} className="btn-secondary">
            {showBulkAdd ? 'Single Add' : 'Bulk Add'}
          </button>
          {entries.length > 0 && (
            <button onClick={handleClearAll} className="btn-danger">
              Clear All
            </button>
          )}
        </div>
      </div>

      {showBulkAdd ? (
        <div className="bulk-add-container">
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="Enter names (one per line)"
            rows="6"
            className="bulk-textarea"
          />
          <button onClick={handleBulkAdd} className="btn-primary">
            Add All
          </button>
        </div>
      ) : (
        <div className="add-entry-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a name"
            className="entry-input"
          />
          <button onClick={handleAddEntry} className="btn-primary">
            Add
          </button>
        </div>
      )}

      <div className="entries-list">
        {entries.length === 0 ? (
          <p className="empty-message">No entries yet. Add some names to get started!</p>
        ) : (
          entries.map((entry, index) => (
            <div key={entry.id} className="entry-item">
              <div
                className="entry-color"
                style={{ backgroundColor: colors[index % colors.length] }}
                title="Click to change color"
              >
                <input
                  type="color"
                  value={colors[index % colors.length]}
                  onChange={(e) => handleColorChange(index % colors.length, e.target.value)}
                  className="color-picker"
                />
              </div>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => handleEditEntry(entry.id, e.target.value)}
                className="entry-name-input"
              />
              <button
                onClick={() => handleRemoveEntry(entry.id)}
                className="btn-remove"
                title="Remove"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EntryManager;
