import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';

function HabitSearchBar({ value, onChange, onSubmit }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 d-flex justify-content-center"
    >
      <InputGroup
        className={`rounded-pill shadow-sm transition-all ${
          isFocused ? 'border-primary border-2' : ''
        }`}
        style={{ maxWidth: '600px', width: '100%' }}
      >
        <FormControl
          type="search"
          placeholder="Search habits..."
          aria-label="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="rounded-start-pill px-4"
          style={{
            transition: 'box-shadow 0.3s ease',
            boxShadow: isFocused ? '0 0 8px rgba(0, 123, 255, 0.5)' : 'none',
          }}
        />
        <Button
          variant="primary"
          type="submit"
          className="rounded-end-pill d-flex align-items-center justify-content-center"
          style={{ width: '50px' }}
        >
          <MdSearch size={20} />
        </Button>
      </InputGroup>
    </form>
  );
}

export default HabitSearchBar;
