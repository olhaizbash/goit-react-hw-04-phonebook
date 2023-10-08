import './Filter.module.css';
export const Filter = ({ value, onChange }) => {
  return (
    <label>
      Find contacts by name
      <input type="text" name="filter" value={value} onChange={onChange} />
    </label>
  );
};
