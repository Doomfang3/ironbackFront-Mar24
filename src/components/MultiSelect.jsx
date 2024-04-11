import { useEffect, useState } from 'react'
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core'

const hobbiesData = ['Gaming', 'Sports', 'Gardening']

export function MultiSelectCreatable({ hobbies, setHobbies }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  })

  const [search, setSearch] = useState('')
  const [data, setData] = useState(Array.from(new Set([...hobbiesData, ...hobbies].toSorted())))
  const [value, setValue] = useState(hobbies)

  const exactOptionMatch = data.some(item => item === search)

  const handleValueSelect = val => {
    setSearch('')

    if (val === '$create') {
      setData(current => [...current, search])
      setValue(current => [...current, search])
    } else {
      setValue(current =>
        current.includes(val) ? current.filter(v => v !== val) : [...current, val]
      )
    }
  }

  const handleValueRemove = val => setValue(current => current.filter(v => v !== val))

  const values = value.map(item => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ))

  const options = data
    .filter(item => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map(item => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap='sm'>
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ))

  useEffect(() => {
    setHobbies(value)
  }, [value])

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder='Search values'
                onChange={event => {
                  combobox.updateSelectedOptionIndex()
                  setSearch(event.currentTarget.value)
                }}
                onKeyDown={event => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault()
                    handleValueRemove(value[value.length - 1])
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value='$create'>+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
