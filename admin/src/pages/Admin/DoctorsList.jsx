import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {doctors, getAllDoctors,aToken,ChangeAvailability} = useContext(AdminContext )

  useEffect(() => {
    getAllDoctors()
  }, [])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item,index)=>(
          <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:shadow-lg hover:shadow-[#5f6fff]/20 hover:border-[#5f6fff] transition-all duration-300 transform hover:-translate-y-1 bg-white'>
            <div className='relative overflow-hidden'>
              <img 
                src={item.image} 
                alt={item.name}
                className='w-full h-48 object-cover bg-indigo-50 group-hover:bg-[#5f6fff]/10 transition-all duration-500 group-hover:scale-105'
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTAgMTQwQzUwIDEyNS42NDMgNjEuNjQzIDExNCA3NiAxMTRIMTI0QzEzOC4zNTcgMTE0IDE1MCAxMjUuNjQzIDE1MCAxNDBWMjAwSDUwVjE0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
                }}
              />
              <div className='absolute top-2 right-2'>
                <div className={`w-3 h-3 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'} shadow-sm`}></div>
              </div>
            </div>
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium group-hover:text-[#5f6fff] transition-colors duration-300'>{item.name}</p>
              <p className='text-zinc-600 text-sm mt-1'>{item.speciality}</p>
              <div className='mt-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <input 
                    type="checkbox" 
                    onChange={() => ChangeAvailability(item._id)} 
                    checked={item.available} 
                    className='w-4 h-4 text-[#5f6fff] bg-gray-100 border-gray-300 rounded focus:ring-[#5f6fff] focus:ring-2'
                    readOnly
                  />
                  <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-500'>Experience</p>
                  <p className='text-sm font-semibold text-[#5f6fff]'>{item.experience} years</p>
                </div>
              </div>
              <div className='mt-3 pt-3 border-t border-gray-100'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>Fees</span>
                  <span className='text-sm font-bold text-[#5f6fff]'>₹{item.fees}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
