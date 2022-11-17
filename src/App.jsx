import { useState, useEffect, useRef } from 'react'
import { useLocalStorage } from './utils/getLocalStorage'
import getLocalStorage from './utils/getLocalStorage'
import sun from './assets/icon-sun.svg'
import moon from './assets/icon-moon.svg'
import { nanoid } from 'nanoid'
import FilterButtons from './component/FilterButtons'
import Item from './component/Item'
import autoAnimate from '@formkit/auto-animate'

const themeType = {
  dark: 'dark',
  light: 'light'
}

function App() {
  const [name, setName] = useState('')
  const [addName, setAddName] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [list, setList] = useState(() => getLocalStorage('todo-list'))
  const [filteredList, setFilteredList] = useState([])
  const [theme, setTheme] = useLocalStorage('theme', themeType.light)
  const parent = useRef(null)

  /* drag and drop */
  let dragStartIndex;

  const dragStart = (index) => {
    dragStartIndex = index
  }
  const dragEnter = (e) => {
    if (theme === themeType.dark) {
      e.target.classList.add('bg-dragEnterDark')
    } else if (theme === themeType.light) {
      e.target.classList.add('bg-dragEnterLight')
    }
  }

  const dragLeave = (e) => {
    e.target.classList.remove('bg-dragEnterDark')
    e.target.classList.remove('bg-dragEnterLight')
  }

  const dragOver = (e) => e.preventDefault()

  const drop = (e, index) => {
    const dragEndIndex = index
    swapItem(dragStartIndex, dragEndIndex)
    rerenderList()
    e.target.classList.remove('bg-dragEnterDark')
    e.target.classList.remove('bg-dragEnterLight')
  }

  const rerenderList = () => setList([...list])

  const swapItem = (fromIndex, toIndex) => {
    const itemOne = list[fromIndex]
    const itemTwo = list[toIndex]

    list.splice(fromIndex, 1, itemTwo)
    list.splice(toIndex, 1, itemOne)
  }
  /* end of drag and drop */

  const toggleThemeState = () => {
    setTheme(prevValue => prevValue === themeType.light ? themeType.dark : themeType.light)
  }

  const handleChange = (e) => setName(e.target.value)

  const handleCheckBoxState = (e) => {
    setAddName(prevValue => !prevValue)
    const { checked } = e.target
    if (checked && name) {
      setList(prevList => {
        const text = name.charAt(0).toUpperCase() + name.slice(1)
        const listTemp = { id: nanoid(), text, completed }
        return [listTemp, ...prevList]
      })
      setName('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAddName(true)
    if (name) {
      setList(prevList => {
        const text = name.charAt(0).toUpperCase() + name.slice(1)
        const listTemp = { id: nanoid(), text, completed }
        return [listTemp, ...prevList]
      })
    }
    setName('')
  }

  const toggleCompleted = (id) => {
    setList(prevList => {
      return prevList.map(list => {
        return list.id === id ? { ...list, completed: !list.completed } : list
      })
    })
  }

  const handleCompletedChange = (e) => setCompleted(e.target.checked)

  const all = [...list]

  const active = list.filter(item => !item.completed)

  const completedItems = list.filter(item => item.completed)

  const filterItems = (type, index) => {
    setActiveIndex(index)
    switch (type) {
      case 'all':
        setFilteredList(all)
        break
      case 'active':
        setFilteredList(active)
        break
      case 'completed':
        setFilteredList(completedItems)
        break;
      default:
        setFilteredList(all)
        break
    }
  }


  const removeItem = (id) => {
    setList(prevList => {
      return prevList.filter(list => list.id !== id)
    })
  }

  const itemProps = { filteredList, toggleCompleted, dragEnter, dragLeave, dragOver, dragStart, drop, handleCompletedChange, removeItem }

  const clearCompletedTodo = () => {
    setList(prevList => {
      return prevList.filter(list => !list.completed)
    })
  }

  const activeItemsLength = list.filter(item => !item.completed).length

  useEffect(() => {
    document.body.className = theme
    if (theme === themeType.dark) {
      document.body.style.backgroundColor = 'hsl(235, 21%, 11%)'

      document.querySelector('#checkbox').style.borderColor = 'hsl(233, 14%, 35%)'
      document.querySelectorAll('#list').forEach(input => input.style.borderColor = 'hsl(233, 14%, 35%)')
    } else if (theme === themeType.light) {
      document.body.style.backgroundColor = 'hsl(0, 0%, 98%)'

      document.querySelector('#checkbox').style.borderColor = 'hsl(233, 11%, 84%)'
      document.querySelectorAll('#list').forEach(input => input.style.borderColor = 'hsl(233, 11%, 84%)')
    }

  }, [theme])

  useEffect(() => {
    let timeout = setTimeout(() => {
      setAddName(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [addName])

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(list))
    setFilteredList(list)
  }, [list])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <main className='h-screen w-screen p-6 font-josefin select-none sm:grid sm:justify-center'>
      <div className="flex flex-col gap-5 md:mt-24">
        <div className="fixed top-0 left-0 h-[12.5rem] w-full bg-mobileLight bg-cover -z-10 dark:bg-mobileDark dark:md:bg-desktopDark transition-all md:bg-desktopLight md:h-[18.75rem]"></div>
        <div className="flex items-center justify-between mb-4">
          <h1 className='text-light font-bold text-3xl uppercase tracking-[10px]'>todo</h1>
          <button onClick={toggleThemeState}><img src={theme === themeType.light ? moon : sun} alt={theme === themeType.light ? 'moon' : 'sun'} /></button>
        </div>
        {/* add to list */}
        <form onSubmit={handleSubmit} autoComplete='off' className="bg-light w-full p-4 flex items-center gap-4 rounded-md dark:bg-veryDarkDesaturatedBlue transition-colors sm:w-[500px]">
          <input id='checkbox' type="checkbox" name="add-todo" checked={addName} onChange={handleCheckBoxState} className='flex-shrink-0' />
          <input type="text" name="todo" value={name} onChange={handleChange} className="w-full bg-light text-darkGrayishBlue placeholder:text-darkGrayishBlue placeholder:text-sm outline-none caret-lightGrayishBlue dark:bg-veryDarkDesaturatedBlue transition-colors" placeholder='Create a new todo...' />
        </form>
        {/* list container*/}
        <div ref={parent} className="bg-light w-full flex flex-col justify-center rounded-md drop-shadow-xl dark:bg-veryDarkDesaturatedBlue transition-colors sm:w-[500px]">
          {/* list */}
          <Item {...itemProps} />
          {/* end of list */}
          <div className="flex items-center justify-between p-4">
            <p className="text-darkGrayishBlue dark:text-veryDarkGrayishBlueDt3 text-sm"><span>{activeItemsLength > 0 ? activeItemsLength : 'no'}</span> {activeItemsLength > 1 ? 'items' : 'item'} left</p>
            {/* filter list buttons */}
            <div className="hidden items-center justify-center gap-6 bg-light md:flex dark:bg-veryDarkDesaturatedBlue transition-colors ">
              <FilterButtons activeIndex={activeIndex} filterItems={filterItems} />
            </div>
            <button onClick={clearCompletedTodo} className="text-darkGrayishBlue dark:text-veryDarkGrayishBlueDt3 capitalize text-sm dark:hover:text-lightGrayishBlueDtHover hover:text-veryDarkGrayishBlue">clear completed</button>
          </div>
        </div>
        {/* filter list buttons */}
        <div className="flex items-center justify-center gap-6 p-4 bg-light rounded-md drop-shadow-xl md:hidden dark:bg-veryDarkDesaturatedBlue transition-colors">
          <FilterButtons activeIndex={activeIndex} filterItems={filterItems} />
        </div>
        <h3 className="text-darkGrayishBlue dark:text-veryDarkGrayishBlueDt3 text-sm w-52 mx-auto mt-6 flex items-center justify-center">Drag and drop to reorder list</h3>
      </div>
    </main>
  )
}

export default App
