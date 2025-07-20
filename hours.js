// Luxe Styles by Jasmine - Business Hours Configuration
// Easy to edit for non-programmers - just change the times below!

const businessHours = {
    // Format: "HH:MM" using 24-hour time (13:00 = 1:00 PM)
    monday: { open: "09:00", close: "18:00", isOpen: true },
    tuesday: { open: "09:00", close: "18:00", isOpen: true },
    wednesday: { open: "09:00", close: "18:00", isOpen: true },
    thursday: { open: "09:00", close: "20:00", isOpen: true },
    friday: { open: "08:00", close: "20:00", isOpen: true },
    saturday: { open: "08:00", close: "19:00", isOpen: true },
    sunday: { open: "11:00", close: "17:00", isOpen: true }
};

// Special closure dates (format: "YYYY-MM-DD")
const closedDates = [
    "2025-12-25", // Christmas Day
    "2025-01-01", // New Year's Day
    "2025-07-04"  // Independence Day
];

// Warning time (minutes before closing to show "closing soon")
const closingWarningMinutes = 30;

// Time to show "opening soon" (minutes before opening)
const openingSoonMinutes = 15;

// Function to get current status
function getBusinessStatus() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Check if today is a special closure date
    if (closedDates.includes(currentDate)) {
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
    
    const openTime = timeToMinutes(todayHours.open);
    const closeTime = timeToMinutes(todayHours.close);
    const currentMinutes = timeToMinutes(currentTime);
    
    if (currentMinutes < openTime) {
        const minutesUntilOpen = openTime - currentMinutes;
        if (minutesUntilOpen <= openingSoonMinutes) {
            return {
                status: "opening-soon",
                message: "Opening Soon",
                timeUntilChange: minutesToTime(minutesUntilOpen),
                nextOpen: todayHours.open
            };
        } else {
            return {
                status: "closed",
                message: "Currently Closed",
                timeUntilChange: minutesToTime(minutesUntilOpen),
                nextOpen: todayHours.open
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
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    for (let i = 1; i <= 7; i++) {
        const checkDate = new Date(now);
        checkDate.setDate(now.getDate() + i);
        const dayName = days[checkDate.getDay()];
        
        if (businessHours[dayName].isOpen) {
            const dayDisplay = checkDate.toLocaleDateString('en-US', { weekday: 'long' });
            const time12 = convertTo12Hour(businessHours[dayName].open);
            return `${dayDisplay} at ${time12}`;
        }
    }
    return "Check back soon";
}

function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function getTodayHours() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = businessHours[currentDay];
    
    if (!todayHours.isOpen) return "Closed";
    
    const openTime = convertTo12Hour(todayHours.open);
    const closeTime = convertTo12Hour(todayHours.close);
    return `${openTime} - ${closeTime}`;
}