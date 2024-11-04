import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    // Fetch doctor info
    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    // Fetch available slots for the selected date
    const getAvailableSlots = async (date) => {
        if (!date) return
        setDocSlots([]) // Clear previous slots

        // Format selected date in YYYY-MM-DD for consistency
        const slotDate = date.toISOString().split('T')[0]
        console.log("Selected date for slot fetching:", slotDate) // Debugging

        const currentDate = new Date(date)
        currentDate.setHours(8, 0, 0, 0) // Start at 8:00 AM
        const endTime = new Date(date)
        endTime.setHours(18, 30, 0, 0) // End time at 6:30 PM

        let timeSlots = []

        while (currentDate < endTime) {
            const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            // Check if the slot is available
            const isSlotAvailable = !(docInfo.slots_booked?.[slotDate]?.includes(formattedTime))
            if (isSlotAvailable) {
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                })
            }

            // Increment by 30 minutes
            currentDate.setMinutes(currentDate.getMinutes() + 30)
        }

        setDocSlots(timeSlots.length > 0 ? timeSlots : [])
        if (timeSlots.length === 0) toast.info("No available slots for this date.")
    }

    // Book an appointment
    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book an appointment')
            return navigate('/login')
        }
        if (!selectedDate || !slotTime) {
            toast.error("Please select a date and time slot")
            return
        }

        // Use the same date format for consistency (YYYY-MM-DD)
        const slotDate = selectedDate.toISOString().split('T')[0]

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/book-appointment`,
                { docId, slotDate, slotTime },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (selectedDate && docInfo) {
            getAvailableSlots(selectedDate)
        }
    }, [selectedDate, docInfo])


 

    return docInfo ? (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>
    
                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span></p>

                    
                    {/* Only display date & time if both are defined */}
                    {selectedDate && slotTime ? (
                        <p className='text-gray-600 font-medium mt-4'>
                            Date & Time: {selectedDate.toLocaleDateString()} | {slotTime}
                        </p>
                    ) : ( 
                        <p className='text-gray-600 font-medium mt-4'>
                            Please select both a date and time slot.
                        </p>
                    )}
                </div>
            </div>
    
            {/* Calendar for selecting a date */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <h3>Select a Date</h3>
                <Calendar
                    onChange={(date) => {
                        console.log("User selected date:", date.toISOString().split('T')[0])  // For debugging
                        setSelectedDate(date)
                        setSlotTime('') // Reset slotTime whenever a new date is selected
                    }}
                    value={selectedDate}
                    minDate={new Date()} // Only future dates
                />
    
                {/* Display time slots after a date is selected */}
                {selectedDate && (
                    <>
                        <h3 className='mt-4'>Select a Time Slot</h3>
                        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                            {docSlots.map((item, index) => (
                                <p
                                    key={index}
                                    onClick={() => setSlotTime(item.time)}
                                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))}
                        </div>
                    </>
                )}
    
                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
            </div>
    
            {/* Related doctors section */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
    
    
}

export default Appointment
