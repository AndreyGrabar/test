import EmployeesListItem from '../employees-list-item/employees-list-item';
import './employees-list.css'

const EmployeesList = ({data, onDelite, onToggleIncrease, onToggleRise}) => {

    const elements = data.map(item => {
      const {id, ...itemsProps} = item;
      return (
        <EmployeesListItem
          key={id}
          {...itemsProps}
          onDelite={() => onDelite(id)}
          onToggleIncrease ={() => onToggleIncrease(id)}
          onToggleRise = {() => onToggleRise(id)}
        />
      );
    })

    return (
      <ul className="app-list list-group">
        {elements}
      </ul>
    ); 
}


export default EmployeesList;