const PersonForm = ({ onSubmit, newName, newNumber, hanldeChangeName, hanldeChangeNumber }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          <label>Name: </label>
          <input value={newName} onChange={hanldeChangeName} />
        </div>
        <div>
          <label>Number: </label>
          <input value={newNumber} onChange={hanldeChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default PersonForm