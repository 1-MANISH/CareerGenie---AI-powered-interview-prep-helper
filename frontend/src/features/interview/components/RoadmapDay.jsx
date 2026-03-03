

function RoadmapDay({
        day={
                day:"",
                focusArea:"",
                tasks:[]
        }
}) {
        return (
        <div className='roadmap-day'>
                        <div className='roadmap-day__header'>
                                <span className='roadmap-day__badge'>Day {day.day}</span>
                                <h3 className='roadmap-day__focus'>{day.focusArea}</h3>
                        </div>
                        <ul className='roadmap-day__tasks'>
                        {day.tasks.map((task, i) => (
                                <li key={i}>
                                <span className='roadmap-day__bullet' />
                                {task}
                                </li>
                        ))}
                </ul>
        </div>
        )
}

export default RoadmapDay