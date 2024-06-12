import { IAttribute } from '@/lib/interface';
import { useState } from 'react';

interface MultiSelectProps {
  options: IAttribute[];
  change: (value: number[]) => void;
}

export const TSelect: React.FC<MultiSelectProps> = ({ options, change }) => {
  const [selectedOptions, setSelectedOptions] = useState<IAttribute[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: IAttribute) => {
    if (!selectedOptions.find((selectedOption) => selectedOption.id === option.id)) {
      setSelectedOptions([...selectedOptions, option]);
      change([...selectedOptions.map((item) => item.id), option.id]);
      setInputValue('');
    }
  };

  const removeTag = (tag: IAttribute) => {
    const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption.id !== tag.id);
    setSelectedOptions(updatedOptions);
    change(updatedOptions.map((item) => item.id));
  };

  return (
    <div className="multi-select">
      <div className="tags">
        {selectedOptions.map((option) => (
          <div className="tag" key={option.id}>
            {option.value}
            <span className="close-icon" onClick={() => removeTag(option)}>
              x
            </span>
          </div>
        ))}
      </div>
      <input type="text" placeholder="Select options" onClick={toggleDropdown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      {isOpen && (
        <div className="dropdown">
          {options.map((option) => (
            <div className="option" key={option.id} onClick={() => handleOptionClick(option)}>
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TSelect;
