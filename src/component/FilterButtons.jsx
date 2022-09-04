const FilterButtons = ({ activeIndex, filterItems }) => {
  const filterButtons = ['all', 'active', 'completed']
  return (
    <>{filterButtons.map((type, index) => {
      return <button key={index} onClick={() => filterItems(type, index)} className={`${activeIndex === index ? 'text-brightBlue' : 'text-darkGrayishBlue dark:text-veryDarkGrayishBlueDt3 dark:hover:text-lightGrayishBlueDtHover hover:text-veryDarkGrayishBlue'} capitalize text-sm transition-colors `}>{type}</button>
    })}</>
  )
}

export default FilterButtons