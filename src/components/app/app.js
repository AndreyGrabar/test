import { useState } from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import nextId from "react-id-generator";
import "./app.css";

const App = () => {
  const [data, setData] = useState([
    { name: "John", salary: 800, increase: false, like: false, id: 1 },
    { name: "Alex", salary: 1000, increase: false, like: false, id: 2 },
    { name: "Tom", salary: 2000, increase: false, like: false, id: 3 },
  ]);
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const deleteItem = (id) => {
    setData((data) => data.filter((item) => item.id !== id));
  };

  const addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      like: false,
      id: nextId(),
    };
    setData((data) => [...data, newItem]);
  };

  const onToggleIncrease = (id) => {
    setData((data) =>
      data.map((item) =>
        item.id === id ? { ...item, increase: !item.increase } : item
      )
    );
  };

  const onToggleRise = (id) => {
    setData((data) =>
      data.map((item) =>
        item.id === id ? { ...item, like: !item.like } : item
      )
    );
  };

  const searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const onUpdateSearch = (term) => {
    setTerm(term);
  };

  const filterPost = (items, filter) => {
    switch (filter) {
      case "like":
        return items.filter((item) => item.like);
      case "moreThen1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  const onFilterSelect = (filter) => {
    setFilter(filter);
  };

  const employees = data.length;
  const increased = data.filter((item) => item.increase).length;
  const visibleData = filterPost(searchEmp(data, term), filter);

  return (
    <div className="app">
      <AppInfo employees={employees} increased={increased} />

      <div className="search-panel">
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <AppFilter filter={filter} onFilterSelect={onFilterSelect} />
      </div>

      <EmployeesList
        data={visibleData}
        onDelite={deleteItem}
        onToggleIncrease={onToggleIncrease}
        onToggleRise={onToggleRise}
      />
      <EmployeesAddForm onAdd={addItem} />
    </div>
  );
};

export default App;
