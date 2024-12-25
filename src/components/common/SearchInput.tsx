import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  className = ''
}) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full bg-gray-700 text-white px-4 py-2 rounded-lg pl-10 ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default SearchInput;