import css from './ContactList.module.css';

export const ContactList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map(({ id, name, number }) => {
        return (
          <li key={id}>
            {name}: <span>{number}</span>
            <button
              className={css.button}
              type="button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
