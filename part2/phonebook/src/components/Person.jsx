const Persons = ({persons, handleClickDestroyPerson}) => {
    return (
      <div>
        {persons.map(person => 
          <div key={person.name}>
            {person.name + ' ' + person.number} 
            <button onClick={() => handleClickDestroyPerson(person.id, person.name)}>delete</button>
          </div>
        )}
      </div>
    )
}

export default Persons
