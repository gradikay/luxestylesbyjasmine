// ===========================================
// LUXE STYLES BY JASMINE - BUSINESS HOURS
// ===========================================
// EASY TO EDIT - Just change the times below!
// Format: Use regular time with AM/PM (like "9:00 AM" or "6:00 PM")

const businessHours = {
    MONDAY: {
        isOpen: true,
        openTime: "9:00 AM",
        closeTime: "6:00 PM"
    },
    
    TUESDAY: {
        isOpen: true,
        openTime: "9:00 AM", 
        closeTime: "6:00 PM"
    },
    
    WEDNESDAY: {
        isOpen: true,
        openTime: "9:00 AM",
        closeTime: "6:00 PM"
    },
    
    THURSDAY: {
        isOpen: true,
        openTime: "9:00 AM",
        closeTime: "8:00 PM"
    },
    
    FRIDAY: {
        isOpen: true,
        openTime: "8:00 AM",
        closeTime: "8:00 PM"
    },
    
    SATURDAY: {
        isOpen: true,
        openTime: "8:00 AM",
        closeTime: "7:00 PM"
    },
    
    SUNDAY: {
        isOpen: true,
        openTime: "11:00 AM",
        closeTime: "5:00 PM"
    }
};

// ===============================================
// SPECIAL CLOSED DATES (holidays, vacations)
// ===============================================
// Add dates when salon is closed (format: "YYYY-MM-DD")

const specialClosedDates = [
    "2025-12-25",  // Christmas Day
    "2025-01-01",  // New Year's Day  
    "2025-07-04",  // Independence Day
    "2025-11-28"   // Thanksgiving Day
    // Add your vacation dates here like: "2025-08-15"
];

// Warning time (minutes before closing to show "closing soon")
const closingWarningMinutes = 30;

// Time to show "opening soon" (minutes before opening)
const openingSoonMinutes = 60;

// Helper function to convert 12-hour time to 24-hour format
function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
}

// Helper function to convert 24-hour time to 12-hour format
function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Helper functions
function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}

function getNextOpenTime() {
    const now = new Date();
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    
    for (let i = 1; i <= 7; i++) {
        const checkDate = new Date(now);
        checkDate.setDate(now.getDate() + i);
        const dayName = days[checkDate.getDay()];
        
        if (businessHours[dayName].isOpen) {
            const dayDisplay = checkDate.toLocaleDateString('en-US', { weekday: 'long' });
            return `${dayDisplay} at ${businessHours[dayName].openTime}`;
        }
    }
    return "Check back soon";
}

function getTodayHours() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const todayHours = businessHours[currentDay];
    
    if (!todayHours.isOpen) return "Closed";
    
    return `${todayHours.openTime} - ${todayHours.closeTime}`;
}

// Function to get current status
function getBusinessStatus() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Check if today is a special closure date
    if (specialClosedDates.includes(currentDate)) {
        return {
            status: "closed",
            message: "Closed Today - Special Holiday",
            timeUntilChange: null,
            nextOpen: getNextOpenTime()
        };
    }
    
    const todayHours = businessHours[currentDay];
    
    if (!todayHours.isOpen) {
        return {
            status: "closed",
            message: "Closed Today",
            timeUntilChange: null,
            nextOpen: getNextOpenTime()
        };
    }
    
    const openTime = timeToMinutes(convertTo24Hour(todayHours.openTime));
    const closeTime = timeToMinutes(convertTo24Hour(todayHours.closeTime));
    const currentMinutes = timeToMinutes(currentTime);
    
    if (currentMinutes < openTime) {
        const minutesUntilOpen = openTime - currentMinutes;
        if (minutesUntilOpen <= openingSoonMinutes) {
            return {
                status: "opening-soon",
                message: "Opening Soon",
                timeUntilChange: minutesToTime(minutesUntilOpen),
                nextOpen: todayHours.openTime
            };
        } else {
            return {
                status: "closed",
                message: "Currently Closed",
                timeUntilChange: minutesToTime(minutesUntilOpen),
                nextOpen: todayHours.openTime
            };
        }
    } else if (currentMinutes >= openTime && currentMinutes < closeTime) {
        const minutesUntilClose = closeTime - currentMinutes;
        if (minutesUntilClose <= closingWarningMinutes) {
            return {
                status: "closing-soon",
                message: "Closing Soon",
                timeUntilChange: minutesToTime(minutesUntilClose),
                nextOpen: getNextOpenTime()
            };
        } else {
            return {
                status: "open",
                message: "We're Open",
                timeUntilChange: minutesToTime(minutesUntilClose),
                nextOpen: null
            };
        }
    } else {
        return {
            status: "closed",
            message: "Closed for Today",
            timeUntilChange: null,
            nextOpen: getNextOpenTime()
        };
    }
}