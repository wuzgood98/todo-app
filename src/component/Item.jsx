import cross from '../assets/icon-cross.svg'

const Item = ({ filteredList, toggleCompleted, dragStart, dragEnter, dragLeave, dragOver, drop, handleCompletedChange, removeItem }) => {
  return (
    <>{filteredList && filteredList.map((listItem, index) => {
      const { id, text, completed } = listItem
      return <div id='todo-item' key={id} onClick={() => toggleCompleted(id)} draggable={true} onDragStart={() => dragStart(index)} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragOver} onDrop={(e) => drop(e, index)} className="flex items-center justify-between border-b border-lightGrayishBlue p-4 dark:border-veryDarkGrayishBlueDt transition-colors cursor-pointer">
        <div className="flex gap-4 items-center">
          <input type="checkbox" name="todo" id='list' onChange={handleCompletedChange} checked={completed} className='flex-shrink-0 cursor-pointer' />
          <p className={`text-base ${completed ? 'text-lightGrayishBlue line-through dark:text-veryDarkGrayishBlueDt' : 'text-veryDarkGrayishBlue dark:text-lightGrayishBlueDt'} transition-colors`}>{text}</p>
        </div>
        <button id='delete-btn' onClick={() => removeItem(id)} className='flex-shrink-0 xl:hidden'><img src={cross} alt="cross" /></button>
      </div>
    })}</>
  )
}

export default Item